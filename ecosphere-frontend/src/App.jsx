import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard, Leaf, Users, ShieldCheck,
    Trophy, FileText, Settings, Bell, Search,
    Menu, X, Sparkles, ChevronRight, LogOut
} from 'lucide-react';

// Components
import Dashboard from './pages/Dashboard';
import Environmental from './pages/Environmental';
import Social from './pages/Social';
import Governance from './pages/Governance';
import Gamification from './pages/Gamification';
import Reports from './pages/Reports';
import SettingsPage from './pages/Settings';

const SidebarItem = ({ icon: Icon, label, path, active, onClick }) => (
    <div
        onClick={onClick}
        className={`flex items-center space-x-3 px-4 py-3 cursor-pointer rounded-xl transition-all duration-200 group ${active
                ? 'bg-primary/20 text-primary border border-primary/30'
                : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
            }`}
    >
        <Icon className={`w-5 h-5 ${active ? 'text-primary' : 'text-gray-400 group-hover:text-gray-200'}`} />
        <span className="font-medium text-sm">{label}</span>
        {active && (
            <motion.div
                layoutId="active-indicator"
                className="w-1.5 h-6 bg-primary rounded-full ml-auto"
            />
        )}
    </div>
);

function App() {
    const [currentPath, setCurrentPath] = useState('/dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const navigateTo = (path) => {
        setCurrentPath(path);
    };

    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/environmental', label: 'Environmental', icon: Leaf },
        { path: '/social', label: 'Social', icon: Users },
        { path: '/governance', label: 'Governance', icon: ShieldCheck },
        { path: '/gamification', label: 'Gamification', icon: Trophy },
        { path: '/reports', label: 'Reports', icon: FileText },
        { path: '/settings', label: 'Settings', icon: Settings },
    ];

    return (
        <Router>
            <div className="flex h-screen overflow-hidden bg-background">

                {/* Sidebar */}
                <motion.aside
                    initial={false}
                    animate={{
                        width: sidebarOpen ? 280 : 0,
                        opacity: sidebarOpen ? 1 : 0
                    }}
                    className="flex-shrink-0 z-20 h-full border-r border-white/10 glass bg-[#0B0F19]/90 relative overflow-hidden flex flex-col"
                >
                    <div className="p-6 flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primaryDark flex items-center justify-center shadow-lg shadow-primary/20">
                            <Leaf className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-xl font-bold text-white tracking-tight">EcoSphere</h1>
                    </div>

                    <div className="px-4 py-2 flex-grow space-y-1">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">Navigation</div>
                        {navItems.map(item => (
                            <SidebarItem
                                key={item.path}
                                icon={item.icon}
                                label={item.label}
                                path={item.path}
                                active={currentPath === item.path}
                                onClick={() => navigateTo(item.path)}
                            />
                        ))}
                    </div>

                    <div className="p-4 border-t border-white/10 mt-auto">
                        <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/5 cursor-pointer hover:bg-white/10 transition">
                            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center font-bold text-white">
                                JD
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">John Doe</p>
                                <p className="text-xs text-gray-400 truncate">ESG Executive</p>
                            </div>
                            <LogOut className="w-4 h-4 text-gray-400" />
                        </div>
                    </div>
                </motion.aside>

                {/* Main Content */}
                <div className="flex-1 flex flex-col min-w-0 relative">

                    {/* Top Navbar */}
                    <header className="h-20 glass-card mx-6 mt-4 mb-2 flex items-center justify-between px-6 z-10 sticky top-4">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="text-gray-400 hover:text-white transition"
                            >
                                <Menu className="w-6 h-6" />
                            </button>

                            {/* Global Search */}
                            <div className="relative group hidden md:block">
                                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    type="text"
                                    placeholder="Ask AI or search..."
                                    className="bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white placeholder-gray-400 transition-all group-hover:bg-white/10"
                                />
                                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                                    <kbd className="px-1.5 py-0.5 text-[10px] rounded border border-white/20 text-gray-400 bg-white/5">⌘</kbd>
                                    <kbd className="px-1.5 py-0.5 text-[10px] rounded border border-white/20 text-gray-400 bg-white/5">K</kbd>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button className="relative p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full ring-2 ring-[#111827]"></span>
                            </button>
                            <button className="flex items-center space-x-2 text-sm px-4 py-2 bg-gradient-to-r from-primary to-primaryDark text-white rounded-full font-medium shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                                <Sparkles className="w-4 h-4" />
                                <span>AI Assistant</span>
                            </button>
                        </div>
                    </header>

                    {/* Page Content Viewport */}
                    <main className="flex-1 overflow-y-auto px-6 pb-6 pt-2 custom-scrollbar">
                        <AnimatePresence mode="wait">
                            <Routes location={currentPath}>
                                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                                <Route path="/dashboard" element={<Dashboard key="dashboard" />} />
                                <Route path="/environmental" element={<Environmental key="environmental" />} />
                                <Route path="/social" element={<Social key="social" />} />
                                <Route path="/governance" element={<Governance key="governance" />} />
                                <Route path="/gamification" element={<Gamification key="gamification" />} />
                                <Route path="/reports" element={<Reports key="reports" />} />
                                <Route path="/settings" element={<SettingsPage key="settings" />} />
                                <Route path="*" element={<Dashboard key="dashboard" />} />
                            </Routes>
                        </AnimatePresence>
                    </main>

                </div>
            </div>
        </Router>
    )
}

export default App;
