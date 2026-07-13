import React from 'react';
import { motion } from 'framer-motion';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, Leaf, Users, ShieldCheck, Trophy, FileText, Settings, LogOut,
    Heart, Activity, Target, Flame, Bell, History, Sparkles, Play, Upload, Gift,
    Award, FilePlus, RefreshCw, AlertTriangle, ShieldAlert, CheckSquare, ClipboardList,
    LineChart, Calendar, GraduationCap, CalendarClock, UserCheck, Coins, Medal,
    BarChart3, Building2, Tags, ClipboardCheck, ArrowRight, BrainCircuit,
    Shield, UserRoundCheck
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const ROLE_LABELS = {
    super_admin: 'Super Admin',
    esg_manager: 'ESG Manager',
    department_head: 'Dept. Head',
    employee: 'Employee',
    auditor: 'Auditor',
    executive: 'Executive',
    csr_manager: 'CSR Manager',
    compliance_officer: 'Compliance Officer',
    gamification_manager: 'Gamify Manager',
    viewer: 'Viewer',
};

const ROLE_COLORS = {
    super_admin: 'text-emerald-400',
    esg_manager: 'text-green-400',
    department_head: 'text-blue-400',
    employee: 'text-violet-400',
    auditor: 'text-amber-400',
    executive: 'text-rose-400',
    csr_manager: 'text-teal-400',
    compliance_officer: 'text-indigo-400',
    gamification_manager: 'text-fuchsia-400',
    viewer: 'text-slate-400',
};

// Custom items for all 10 roles
const getNavItems = (role) => {
    switch (role) {
        case 'super_admin':
            return [
                { path: '/dashboard', label: '👑 Admin Dashboard', icon: LayoutDashboard },
                { path: '/dashboard?tab=manage_users', label: 'Users', icon: Users },
                { path: '/dashboard?tab=manage_roles', label: 'Roles', icon: ShieldCheck },
                { path: '/dashboard?tab=manage_departments', label: 'Departments', icon: Building2 },
                { path: '/dashboard?tab=manage_categories', label: 'Categories', icon: Tags },
                { path: '/settings/esg-configuration', label: 'ESG Config', icon: Settings },
                { path: '/dashboard?tab=notification_settings', label: 'Notifications', icon: Bell },
                { path: '/reports/esg-summary', label: 'All Reports', icon: FileText },
                { path: '/dashboard?tab=audit_logs', label: 'Audit Logs', icon: History },
                { path: '/dashboard?tab=ai_insights', label: 'AI Insights', icon: BrainCircuit }
            ];
        case 'esg_manager':
            return [
                { path: '/dashboard', label: '🌿 ESG Dashboard', icon: LayoutDashboard },
                { path: '/environmental/emission-factors', label: 'Emission Factors', icon: Leaf },
                { path: '/environmental/carbon-transactions', label: 'Transactions', icon: Activity },
                { path: '/environmental/goals', label: 'Goals', icon: Target },
                { path: '/dashboard?tab=product_esg_profile', label: 'Product ESG Profile', icon: BarChart3 },
                { path: '/reports/esg-summary', label: 'Environmental Reports', icon: FileText }
            ];
        case 'employee':
            return [
                { path: '/dashboard', label: '👤 My Dashboard', icon: LayoutDashboard },
                { path: '/gamification/dashboard', label: 'Leaderboard', icon: Trophy },
                { path: '/dashboard?tab=join_challenge', label: 'Join Challenge', icon: Play },
                { path: '/dashboard?tab=join_csr', label: 'Join CSR', icon: Heart },
                { path: '/dashboard?tab=upload_proof', label: 'Upload Proof', icon: Upload },
                { path: '/dashboard?tab=accept_policies', label: 'Accept Policies', icon: ClipboardCheck },
                { path: '/dashboard?tab=redeem_rewards', label: 'Redeem Rewards', icon: Gift }
            ];
        case 'auditor':
            return [
                { path: '/dashboard', label: '🔍 Auditor Dashboard', icon: LayoutDashboard },
                { path: '/dashboard?tab=create_audit', label: 'Create Audit', icon: FilePlus },
                { path: '/dashboard?tab=update_audit', label: 'Update Audit', icon: RefreshCw },
                { path: '/dashboard?tab=audit_findings', label: 'Audit Findings', icon: AlertTriangle },
                { path: '/dashboard?tab=compliance_issue', label: 'Compliance Issue', icon: ShieldAlert },
                { path: '/reports/esg-summary', label: 'Audit Reports', icon: FileText }
            ];
        case 'executive':
            return [
                { path: '/dashboard', label: '📊 Executive Board', icon: LayoutDashboard },
                { path: '/dashboard?tab=ai_executive_summary', label: 'AI Summary', icon: Sparkles },
                { path: '/reports/esg-summary', label: 'Executive Reports', icon: FileText }
            ];
        case 'department_head':
            return [
                { path: '/dashboard', label: '🏢 Dept. Head Home', icon: LayoutDashboard },
                { path: '/dashboard?tab=approve_csr', label: 'Approve CSR', icon: CheckSquare },
                { path: '/dashboard?tab=approve_challenge', label: 'Approve Challenge', icon: ClipboardList },
                { path: '/dashboard?tab=dept_analytics', label: 'Dept Analytics', icon: LineChart },
                { path: '/reports/esg-summary', label: 'View Reports', icon: FileText }
            ];
        case 'csr_manager':
            return [
                { path: '/dashboard', label: '🌱 CSR Dashboard', icon: LayoutDashboard },
                { path: '/social/csr-activities', label: 'CSR Activities', icon: Heart },
                { path: '/dashboard?tab=csr_approvals', label: 'Approvals', icon: CheckSquare },
                { path: '/dashboard?tab=csr_participation', label: 'Participation', icon: Users },
                { path: '/dashboard?tab=csr_events', label: 'Events', icon: Calendar },
                { path: '/dashboard?tab=csr_training', label: 'Training', icon: Award },
                { path: '/dashboard?tab=csr_certificates', label: 'Certificates', icon: GraduationCap },
                { path: '/reports/esg-summary', label: 'CSR Reports', icon: FileText }
            ];
        case 'compliance_officer':
            return [
                { path: '/dashboard', label: '⚖️ Compliance Home', icon: LayoutDashboard },
                { path: '/governance/dashboard', label: 'Policies', icon: ShieldCheck },
                { path: '/dashboard?tab=compliance_issues', label: 'Compliance Issues', icon: ShieldAlert },
                { path: '/dashboard?tab=violations', label: 'Violations', icon: AlertTriangle },
                { path: '/dashboard?tab=deadlines', label: 'Deadlines', icon: CalendarClock },
                { path: '/dashboard?tab=risk_level', label: 'Risk Level', icon: Flame },
                { path: '/dashboard?tab=compliance_approvals', label: 'Approvals', icon: UserCheck },
                { path: '/reports/esg-summary', label: 'Compliance Reports', icon: FileText }
            ];
        case 'gamification_manager':
            return [
                { path: '/dashboard', label: '🎮 Gamification Home', icon: LayoutDashboard },
                { path: '/gamification/dashboard', label: 'Leaderboard', icon: Trophy },
                { path: '/dashboard?tab=manage_challenges', label: 'Challenges', icon: Play },
                { path: '/dashboard?tab=manage_rewards', label: 'Rewards', icon: Gift },
                { path: '/dashboard?tab=manage_badges', label: 'Badges', icon: Award },
                { path: '/dashboard?tab=xp_rules', label: 'XP Rules', icon: Coins },
                { path: '/dashboard?tab=achievements', label: 'Achievements', icon: Medal }
            ];
        case 'viewer':
            return [
                { path: '/dashboard', label: '👀 Read-Only View', icon: LayoutDashboard },
                { path: '/reports/esg-summary', label: 'Reports', icon: FileText },
                { path: '/dashboard?tab=viewer_analytics', label: 'Analytics', icon: LineChart }
            ];
        default:
            return [{ path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard }];
    }
};

export function Sidebar({ isOpen }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/auth/login');
    };

    const initials = user?.name
        ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase()
        : '??';

    const currentRole = user?.role || 'employee';
    const navItems = getNavItems(currentRole);

    return (
        <motion.aside
            initial={false}
            animate={{ width: isOpen ? 280 : 0, opacity: isOpen ? 1 : 0 }}
            className="flex-shrink-0 z-20 h-full border-r border-[var(--border-glass)] bg-[var(--bg-glass)] backdrop-blur-xl relative overflow-hidden flex flex-col"
        >
            {/* Logo */}
            <div className="p-6 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent-emerald)] to-emerald-800 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <Leaf className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-white tracking-tight">EcoSphere</h1>
                    <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest">ESG Platform</p>
                </div>
            </div>

            {/* Nav */}
            <div className="px-4 flex-grow space-y-1 overflow-y-auto custom-scrollbar">
                <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-4 px-2">Navigation</p>
                {navItems.map((item) => {
                    // Custom active check matching path & search parameters
                    const isTabActive = location.pathname === item.path.split('?')[0] &&
                        (item.path.includes('?tab=')
                            ? location.search === item.path.substring(item.path.indexOf('?'))
                            : !location.search);

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={`flex items-center space-x-3 px-4 py-3 cursor-pointer rounded-xl transition-all duration-200 group ${isTabActive
                                ? 'bg-[var(--accent-emerald)]/20 text-[var(--accent-emerald)] border border-[var(--accent-emerald)]/30'
                                : 'text-[var(--text-muted)] hover:bg-white/5 hover:text-white border border-transparent'
                                }`}
                        >
                            <item.icon className={`w-5 h-5 flex-shrink-0 ${isTabActive ? 'text-[var(--accent-emerald)]' : 'text-[var(--text-muted)] group-hover:text-white'}`} />
                            <span className="font-medium text-sm whitespace-nowrap">{item.label}</span>
                            {isTabActive && (
                                <motion.div layoutId="active-indicator" className="w-1.5 h-6 bg-[var(--accent-emerald)] rounded-full ml-auto" />
                            )}
                        </NavLink>
                    );
                })}

                {/* Separator / Divider */}
                <div className="h-px bg-white/10 my-3 block no-print" />

                {/* Settings & Admin Menu Item */}
                <NavLink
                    key="/settings"
                    to="/settings"
                    className={`flex items-center space-x-3 px-4 py-3 cursor-pointer rounded-xl transition-all duration-200 group ${location.pathname.startsWith('/settings')
                        ? 'bg-[var(--accent-emerald)]/20 text-[var(--accent-emerald)] border border-[var(--accent-emerald)]/30'
                        : 'text-[var(--text-muted)] hover:bg-white/5 hover:text-white border border-transparent'
                        }`}
                >
                    <Settings className={`w-5 h-5 flex-shrink-0 ${location.pathname.startsWith('/settings') ? 'text-[var(--accent-emerald)]' : 'text-[var(--text-muted)] group-hover:text-white'}`} />
                    <span className="font-medium text-sm whitespace-nowrap">Settings & {ROLE_LABELS[currentRole] || 'Admin'}</span>
                    {location.pathname.startsWith('/settings') && (
                        <motion.div layoutId="active-indicator" className="w-1.5 h-6 bg-[var(--accent-emerald)] rounded-full ml-auto" />
                    )}
                </NavLink>
            </div>

            {/* User Profile Footer */}
            <div className="p-4 border-t border-[var(--border-glass)] mt-auto">
                <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent-emerald)] to-emerald-900 flex items-center justify-center font-bold text-white text-sm flex-shrink-0">
                        {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
                        <p className={`text-xs font-medium truncate ${ROLE_COLORS[currentRole] || 'text-[var(--text-muted)]'}`}>
                            {ROLE_LABELS[currentRole] || currentRole}
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
                        title="Logout"
                        className="text-[var(--text-muted)] hover:text-[var(--accent-rose)] transition flex-shrink-0"
                    >
                        <LogOut className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </motion.aside>
    );
}
