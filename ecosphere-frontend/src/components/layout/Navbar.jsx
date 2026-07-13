import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Search, Bell, Sparkles, Check, ShieldAlert, Award, FileText, CalendarClock, Send, Bot, X } from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export function Navbar({ toggleSidebar }) {
    const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
    const { user } = useAuth();
    const navigate = useNavigate();

    // Notifications Dropdown States
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // AI Assistant Chat Panel States
    const [isAiOpen, setIsAiOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const aiRef = useRef(null);
    const messagesEndRef = useRef(null);

    // Initial greeting based on role
    useEffect(() => {
        if (!user) return;
        const role = user.role || 'employee';
        let greeting = "Hello! I am your EcoSphere Copilot. How can I assist you with ESG data today?";
        if (role === 'employee') {
            greeting = "Hello! I am your CSR and Gamification guide. You can ask me how to claim your next badge or verify your carbon emission reductions proof.";
        } else if (role === 'super_admin') {
            greeting = "Welcome, Administrator. I can help inspect system audit logs, check role permissions configuration safety, or summarize user metrics.";
        } else if (role === 'esg_manager') {
            greeting = "Greetings. Ready to evaluate ESG data, review greenhouse gas emissions transactions, or update target progress tracking?";
        } else if (role === 'auditor') {
            greeting = "Audit system active. I can help analyze compliance trends, find discrepancy anomalies, or compile final reports.";
        } else if (role === 'compliance_officer') {
            greeting = "Hello Officer. I am monitoring internal policies, outstanding governance schedules, and high-severity violations.";
        } else if (role === 'csr_manager') {
            greeting = "CSR dashboard assistant ready. Need assistance parsing initiative feedback or compiling volunteer participation data?";
        } else if (role === 'executive') {
            greeting = "Hello, Director. Ready to review AI Executive Summaries, high-level pillar scores, and departmental trends.";
        } else if (role === 'department_head') {
            greeting = "Welcome. I can help catalog department challenges milestones, approve CSR proof submissions, and analyze team stats.";
        } else if (role === 'gamification_manager') {
            greeting = "Copilot online. Let's check leaderboard rankings, reward item redemptions, and active challenge rules.";
        } else if (role === 'viewer') {
            greeting = "Read-only workspace assistant. Request highlights of key metrics profiles.";
        }

        setMessages([
            { id: '1', sender: 'ai', text: greeting }
        ]);
    }, [user]);

    // Handle outside clicks for notification and AI dropdowns
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
            if (aiRef.current && !aiRef.current.contains(event.target)) {
                setIsAiOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Auto scroll chat to bottom
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isThinking]);

    const getIcon = (type) => {
        switch (type) {
            case 'issue':
                return <ShieldAlert className="w-4 h-4 text-[var(--accent-rose)]" />;
            case 'badge':
                return <Award className="w-4 h-4 text-[var(--accent-amber)]" />;
            case 'audit':
                return <FileText className="w-4 h-4 text-sky-400" />;
            case 'policy':
                return <CalendarClock className="w-4 h-4 text-purple-400" />;
            default:
                return <Bell className="w-4 h-4 text-[var(--accent-emerald)]" />;
        }
    };

    // Quick Prompts list dynamically defined by role
    const getQuickPrompts = (role) => {
        switch (role) {
            case 'employee':
                return ["How to unlock 'Carbon Hero'?", "Show my volunteer hours", "Tips to reduce carbon footprint"];
            case 'esg_manager':
                return ["Calculate Scope 1 emissions", "Forecast environmental target status", "Show high-emission departments"];
            case 'super_admin':
                return ["Scan audit logs for anomalies", "List active system users", "Check weights override logic"];
            case 'auditor':
                return ["Draft audit report template", "Highlight unresolved compliance items", "Verify compliance status"];
            case 'compliance_officer':
                return ["Policy acknowledgment rate", "Show critical risk items", "Next compliance deadline"];
            case 'csr_manager':
                return ["Certificates leaderboard", "List upcoming CSR events", "Training completion report"];
            case 'executive':
                return ["Generate Executive Briefing", "Pillar performance score gaps", "IT vs Logistics trends"];
            case 'department_head':
                return ["Pending CSR proofs", "Active challenge participation rate", "Team ESG progress summary"];
            case 'gamification_manager':
                return ["List active rewards", "Leaderboard rank distributions", "Add XP rule suggestion"];
            case 'viewer':
                return ["Summarize overall score", "View ESG summary trend", "Help contact Admin"];
            default:
                return ["What is EcoSphere ESG?", "How is ESG calculated?"];
        }
    };

    const handleSendMessage = (textToSend) => {
        const query = textToSend || input;
        if (!query.trim()) return;

        // User message
        const userMsg = { id: Date.now().toString(), sender: 'user', text: query };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsThinking(true);

        // Simulate AI Thinking delay
        setTimeout(() => {
            let aiText = "I have scanned the EcoSphere database but could not retrieve specific insights matching that phrase. Try using the quick action prompts below or rephrasing your search to include ESG parameters.";

            const q = query.toLowerCase();

            // Custom responses logic based on prompts & keywords
            if (q.includes('carbon hero')) {
                aiText = "To unlock the Carbon Hero badge, you need to contribute to eco-initiatives and complete at least 3 carbon reduction challenges. You have currently completed 2/3. Head to the 'Challenges' tab to find your final task!";
            } else if (q.includes('volunteer hours')) {
                aiText = "You currently have 12 volunteering hours logged for this quarter across active CSR campaigns. Complete 3 more hours to unlock the next rewards tier.";
            } else if (q.includes('tips to reduce')) {
                aiText = "Here are a few quick tips:\n1. Shutdown computing workstations completely checkouts.\n2. Participate in carpooling or utilize electric transit fleets.\n3. Minimize paper printing runs.";
            } else if (q.includes('scope 1')) {
                aiText = "For the current period, calculated direct Scope 1 Emissions are 3,450 tCO2e (primarily fleet energy and diesel backup feeds), reflecting a 4.2% reduction year-over-year.";
            } else if (q.includes('environmental target')) {
                aiText = "Environmental targets are currently 84.8% on-track. IT & Digital department is performing above baseline, compensating for minor logistics fleet schedule delays.";
            } else if (q.includes('high-emission')) {
                aiText = "Logistics remains the division with the highest carbon footprint at 48% of total organization load, followed directly by Manufacturing at 32%.";
            } else if (q.includes('audit logs')) {
                aiText = "Scanning audit logs for the last 24 hours... 0 critical access exceptions. Found normal department head approvals for CSR campaigns and policy acknowledgments completed by 12 personnel.";
            } else if (q.includes('active system users')) {
                aiText = "Currently, there are 124 active registered accounts. Active workspace usage breakdown: IT Division (94%), Corporate Strategy (87%), Logistics Warehouse (78%).";
            } else if (q.includes('weights override')) {
                aiText = "Core ESG Score system weights are currently set to: 40% Environmental, 30% Social, and 30% Governance. Adjustments can be managed dynamically through the ESG configuration menu.";
            } else if (q.includes('audit report template')) {
                aiText = "Draft Report Template:\n\n**Audit Reference:** AUD-2026-Q2\n**Assessed Standards:** ISO 14001 certification\n**Summary:** Minor waste compliance anomalies identified at plant-C logistics. Correction plan verified.";
            } else if (q.includes('unresolved compliance')) {
                aiText = "There are currently 2 active compliance notifications:\n1. High wastewater discharge event in sector B (Assigned to Logistics Ops).\n2. Minor certification filing overdue for Board review.";
            } else if (q.includes('policy acknowledgment')) {
                aiText = "Board Policies acknowledge percentage is currently at 86.4%. Reminder alerts have been queued for the remaining 17% employee groups.";
            } else if (q.includes('critical risk')) {
                aiText = "Risk scan completes: No critical security threats active. Minor risk flagged under Logistics fleet maintenance delays.";
            } else if (q.includes('deadline')) {
                aiText = "The next compliance review deadline is scheduled for next Friday (July 24, 2026).";
            } else if (q.includes('certificates leaderboard')) {
                aiText = "CSR training module leaderboard is topped by the IT Department (14 certifications unlocked), followed by HR (11) and Logistics (6).";
            } else if (q.includes('csr events')) {
                aiText = "Upcoming CSR activities: \n- Arbor Tree Planting: July 20\n- Solar Panel Workshop: July 28\n- E-Waste Collection Drive: August 05.";
            } else if (q.includes('briefing') || q.includes('executive')) {
                aiText = "Executive Briefing Summary:\n- Overall ESG Rating: 81.2 (Grade: A-)\n- Core Strengths: Digital carbon tracking accuracy.\n- Focus Areas: Supply chain fuel transition targets.";
            } else if (q.includes('trends') || q.includes('performance')) {
                aiText = "ESG Trend summary:\n- Environmental: +12% improvement inside IT division.\n- Social participation: volunteering rate rose 15% in Q2.\n- Governance rating: 100% compliant audits logged.";
            } else if (q.includes('pending csr')) {
                aiText = "You have 3 pending volunteer activity proofs awaiting review from your team. Select 'CSR Approvals' to review.";
            } else if (q.includes('participation rate')) {
                aiText = "Your division's active volunteer and event participation is 72%, which is 5% higher than the organization-wide average!";
            } else if (q.includes('rewards')) {
                aiText = "The employee rewards inventory has 5 items active: Eco Cup, Bamboo Keyboard, Plant Kit, Coffee Voucher, and Day Off Pass. Redemptions are on-track.";
            } else if (q.includes('xp rule')) {
                aiText = "XP Rules set: 50 XP per challenge milestone, 10 XP per volunteering hour logged. Recommended rule: Add a 20 XP bonus for completing weekly team eco-streaks.";
            } else if (q.includes('summarize overall')) {
                aiText = "EcoSphere Overall Score: 81/100. Environmental score stands at 82.3, Social at 78.4, and Governance at 84.1.";
            } else if (q.includes('help contact') || q.includes('admin')) {
                aiText = "Support admin contact: admin@ecosphere.com. Core configurations require system super_admin credentials.";
            } else if (q.includes('esg calculated')) {
                aiText = "EcoSphere calculates ESG via custom weighted scores: Environmental (40%), Social (30%), and Governance (30%). Individual components are evaluated based on audit compliance, carbon footprint reduction targets, and CSR participation logs.";
            }

            const aiMsg = { id: (Date.now() + 1).toString(), sender: 'ai', text: aiText };
            setMessages(prev => [...prev, aiMsg]);
            setIsThinking(false);
        }, 1000);
    };

    return (
        <header className="h-16 mx-4 md:mx-6 mt-3 mb-2 glass-card flex items-center justify-between px-5 z-10 flex-shrink-0">
            <div className="flex items-center space-x-3">
                <button onClick={toggleSidebar} className="text-[var(--text-muted)] hover:text-white transition p-1 cursor-pointer">
                    <Menu className="w-5 h-5" />
                </button>
                <div className="relative group hidden md:block">
                    <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search or ask AI (⌘K)..."
                        className="bg-white/5 border border-[var(--border-glass)] rounded-full pl-10 pr-20 py-2 text-sm w-56 lg:w-72 focus:outline-none focus:ring-2 focus:ring-[var(--accent-emerald)]/50 text-white placeholder-[var(--text-muted)] transition"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-0.5">
                        <kbd className="px-1.5 py-0.5 text-[10px] rounded border border-white/20 text-[var(--text-muted)] bg-white/5">⌘</kbd>
                        <kbd className="px-1.5 py-0.5 text-[10px] rounded border border-white/20 text-[var(--text-muted)] bg-white/5">K</kbd>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-1.5 text-xs">
                    <span className="text-[var(--text-muted)] capitalize">{user?.role?.replace(/_/g, ' ')}</span>
                    <span className="text-[var(--border-glass)]">|</span>
                    <span className="text-[var(--accent-emerald)] font-medium">{user?.name?.split(' ')[0]}</span>
                </div>

                {/* Notifications Panel */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`relative p-2 rounded-full transition cursor-pointer ${isOpen
                                ? 'text-white bg-white/10'
                                : 'text-[var(--text-muted)] hover:text-white hover:bg-white/10'
                            }`}
                    >
                        <Bell className="w-5 h-5" />
                        {unreadCount > 0 && (
                            <motion.span
                                layoutId="notification-badge"
                                className="absolute top-1 right-1 w-2.5 h-2.5 bg-[var(--accent-rose)] rounded-full ring-2 ring-[var(--bg-secondary)]"
                            />
                        )}
                    </button>

                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.15 }}
                                className="absolute right-0 mt-3 w-80 bg-[#111827] border border-white/10 rounded-2xl shadow-xl z-50 overflow-hidden"
                            >
                                <div className="p-4 border-b border-[var(--border-glass)] flex justify-between items-center bg-white/5">
                                    <span className="font-semibold text-white text-sm">Notifications ({unreadCount})</span>
                                    {unreadCount > 0 && (
                                        <button
                                            onClick={() => markAllAsRead()}
                                            className="text-xs text-[var(--accent-emerald)] hover:text-emerald-300 font-medium transition cursor-pointer"
                                        >
                                            Mark all read
                                        </button>
                                    )}
                                </div>
                                <div className="max-h-80 overflow-y-auto custom-scrollbar divide-y divide-[var(--border-glass)]/20">
                                    {notifications.length === 0 ? (
                                        <div className="p-8 text-center text-xs text-[var(--text-muted)]">
                                            No notifications yet.
                                        </div>
                                    ) : (
                                        notifications.map((n) => (
                                            <div
                                                key={n.id}
                                                onClick={() => markAsRead(n.id)}
                                                className={`p-3.5 flex gap-3 items-start transition cursor-pointer hover:bg-white/5 ${n.read ? 'opacity-50' : 'bg-white/[0.02] border-l-2 border-l-[var(--accent-emerald)]'
                                                    }`}
                                            >
                                                <div className="mt-0.5 flex-shrink-0">
                                                    {getIcon(n.type)}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs font-normal text-white leading-relaxed">{n.message}</p>
                                                    {!n.read && (
                                                        <span className="inline-flex items-center gap-1 text-[9px] text-[var(--accent-emerald)] mt-1 font-semibold">
                                                            <Check className="w-2.5 h-2.5" /> Mark read
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* AI Assistant Chat Panel */}
                <div className="relative" ref={aiRef}>
                    <button
                        onClick={() => setIsAiOpen(!isAiOpen)}
                        className={`flex items-center gap-2 text-sm px-4 py-2 bg-gradient-to-r ${isAiOpen
                                ? 'from-emerald-600 to-emerald-800 scale-[1.02]'
                                : 'from-[var(--accent-emerald)] to-emerald-700 hover:scale-105'
                            } text-white rounded-full font-medium shadow-lg shadow-emerald-500/20 transition-all cursor-pointer`}
                    >
                        <Sparkles className="w-4 h-4" />
                        <span className="hidden sm:inline">AI Assistant</span>
                    </button>

                    <AnimatePresence>
                        {isAiOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.15 }}
                                className="absolute right-0 mt-3 w-96 bg-[#111827] border border-white/10 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden h-[480px]"
                            >
                                {/* Header */}
                                <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                                    <div className="flex items-center gap-2">
                                        <div className="p-1.5 rounded-lg bg-emerald-500/20 text-[var(--accent-emerald)]">
                                            <Bot className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <span className="font-semibold text-white text-sm block">EcoSphere Copilot</span>
                                            <span className="text-[10px] text-[var(--text-muted)] italic block capitalize">{user?.role?.replace(/_/g, ' ')} Assistant</span>
                                        </div>
                                    </div>
                                    <button onClick={() => setIsAiOpen(false)} className="text-[var(--text-muted)] hover:text-white transition cursor-pointer">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Messages list */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-3.5 custom-scrollbar">
                                    {messages.map((m) => (
                                        <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`p-3 rounded-2xl text-xs max-w-[85%] leading-relaxed ${m.sender === 'user'
                                                    ? 'bg-[var(--accent-emerald)] text-white rounded-tr-none font-medium'
                                                    : 'bg-white/5 text-gray-200 border border-white/5 rounded-tl-none whitespace-pre-line'
                                                }`}>
                                                {m.text}
                                            </div>
                                        </div>
                                    ))}
                                    {isThinking && (
                                        <div className="flex justify-start">
                                            <div className="p-2.5 rounded-2xl text-[10px] text-[var(--text-muted)] bg-white/5 rounded-tl-none flex items-center gap-1.5 border border-white/5">
                                                <div className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                                <div className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                                <div className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                                <span>Assistant is processing...</span>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Quick Prompts */}
                                <div className="px-4 py-2 bg-white/[0.02] border-t border-white/5 space-y-1">
                                    <span className="text-[9px] text-[var(--text-muted)] uppercase tracking-wider font-semibold block mb-1">Quick Prompts</span>
                                    <div className="flex gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
                                        {getQuickPrompts(user?.role).map((p, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleSendMessage(p)}
                                                className="px-2.5 py-1 text-[10px] bg-white/5 hover:bg-emerald-500/10 hover:text-[var(--accent-emerald)] text-[var(--text-muted)] border border-white/10 hover:border-emerald-500/20 rounded-full transition whitespace-nowrap cursor-pointer flex-shrink-0"
                                            >
                                                {p}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Message Input Box */}
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleSendMessage();
                                    }}
                                    className="p-3 border-t border-white/10 bg-white/5 flex gap-2"
                                >
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder={`Ask anything as ${user?.role?.replace(/_/g, ' ') || 'employee'}...`}
                                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition placeholder-gray-500"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!input.trim()}
                                        className="p-2 bg-[var(--accent-emerald)] hover:bg-emerald-600 disabled:opacity-50 text-white rounded-xl transition cursor-pointer"
                                    >
                                        <Send className="w-3.5 h-3.5" />
                                    </button>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
}
