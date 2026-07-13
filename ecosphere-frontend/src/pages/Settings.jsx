import React, { useState } from 'react';
import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Settings, Building2, Tag, Sliders, Bell, User, Save } from 'lucide-react';
import { PageHeader, GlassCard, StatCard } from '../components/ui/index.jsx';
import { dummyDepartments } from '../data/dummy/index.js';
import { useEsgConfig } from '../contexts/EsgConfigContext';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

const SUB_TABS = [
    { path: 'esg-configuration', label: 'ESG Config' },
    { path: 'departments', label: 'Departments' },
    { path: 'notifications', label: 'Notifications' },
    { path: 'profile', label: 'Profile' },
];

const SubTabs = () => (
    <div className="flex gap-2 mb-6 flex-wrap">
        {SUB_TABS.map(t => (
            <NavLink key={t.path} to={t.path}
                className={({ isActive }) => `px-4 py-2 rounded-lg text-sm font-medium transition ${isActive
                    ? 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
                    : 'text-[var(--text-muted)] bg-white/5 hover:bg-white/10 hover:text-white border border-transparent'}`}
            >{t.label}</NavLink>
        ))}
    </div>
);

const Toggle = ({ label, description, value, onChange }) => (
    <div
        onClick={() => onChange(!value)}
        className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition border border-[var(--border-glass)] cursor-pointer select-none"
    >
        <div className="flex-1 min-w-0 mr-4">
            <p className="text-sm font-semibold text-white">{label}</p>
            {description && <p className="text-xs text-[var(--text-muted)] mt-0.5">{description}</p>}
        </div>
        <div
            className={`relative w-12 h-6 rounded-full border-2 transition-all duration-200 flex-shrink-0 ${value ? 'bg-[var(--accent-emerald)] border-[var(--accent-emerald)]' : 'bg-white/10 border-white/20'
                }`}
        >
            <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${value ? 'left-6' : 'left-0.5'}`} />
        </div>
    </div>
);

function EsgConfiguration() {
    const { config, setConfig } = useEsgConfig();
    const toast = useToast();
    const [draft, setDraft] = useState(config);

    const setToggle = (key) => (val) => setDraft(c => ({ ...c, [key]: val }));
    const setWeight = (key, val) => setDraft(c => ({ ...c, weights: { ...c.weights, [key]: Number(val) } }));

    const handleSave = () => {
        const total = Object.values(draft.weights).reduce((a, b) => a + b, 0);
        if (total !== 100) {
            toast.error(`Total ESG weights must equal exactly 100%. Current total is ${total}%`);
            return;
        }
        setConfig(draft);
        toast.success("ESG weights and business rules successfully saved!");
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-3xl">
            <GlassCard>
                <h3 className="font-semibold text-white mb-1 flex items-center gap-2"><Sliders className="w-5 h-5 text-[var(--accent-emerald)]" /> ESG Score Weights</h3>
                <p className="text-xs text-[var(--text-muted)] mb-5">Default: 40% Environmental / 30% Social / 30% Governance</p>
                <div className="grid grid-cols-3 gap-4">
                    {[
                        { key: 'environmental', label: 'Environmental %', color: 'var(--env)' },
                        { key: 'social', label: 'Social %', color: 'var(--social)' },
                        { key: 'governance', label: 'Governance %', color: 'var(--gov)' },
                    ].map(({ key, label, color }) => (
                        <div key={key}>
                            <label className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold block mb-1.5">{label}</label>
                            <input
                                type="number" min="0" max="100" value={draft.weights[key]}
                                onChange={e => setWeight(key, e.target.value)}
                                className="w-full bg-white/5 border-2 rounded-xl px-4 py-3 text-2xl font-bold text-white focus:outline-none transition"
                                style={{ borderColor: color + '60' }}
                            />
                        </div>
                    ))}
                </div>
                <p className="text-xs text-[var(--text-muted)] mt-3">
                    Total: <span className={`font-bold ${Object.values(draft.weights).reduce((a, b) => a + b, 0) === 100 ? 'text-[var(--env)]' : 'text-red-400'}`}>
                        {Object.values(draft.weights).reduce((a, b) => a + b, 0)}%
                    </span> (must equal 100%)
                </p>
            </GlassCard>

            <GlassCard>
                <h3 className="font-semibold text-white mb-5 flex items-center gap-2"><Settings className="w-5 h-5 text-[var(--accent-amber)]" /> Business Rule Toggles</h3>
                <div className="space-y-3">
                    <Toggle
                        label="Auto Emission Calculation"
                        description="Automatically calculate carbon emissions from Purchase, Manufacturing, Expense and Fleet records"
                        value={draft.autoEmissionCalculation}
                        onChange={setToggle('autoEmissionCalculation')}
                    />
                    <Toggle
                        label="Evidence Requirement (CSR)"
                        description="Block approval of CSR participation unless a proof file is attached"
                        value={draft.evidenceRequirement}
                        onChange={setToggle('evidenceRequirement')}
                    />
                    <Toggle
                        label="Badge Auto-Award"
                        description="Automatically award badges when an employee's XP or challenge count satisfies unlock rules"
                        value={draft.badgeAutoAward}
                        onChange={setToggle('badgeAutoAward')}
                    />
                </div>
            </GlassCard>

            <button onClick={handleSave} className="flex items-center gap-2 px-6 py-3 text-sm bg-gradient-to-r from-[var(--accent-emerald)] to-emerald-700 text-white rounded-xl font-medium shadow-lg shadow-emerald-500/20 hover:opacity-90 transition cursor-pointer">
                <Save className="w-4 h-4" /> Save Configuration
            </button>
        </motion.div>
    );
}

function DepartmentsPage() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <GlassCard className="!p-0 overflow-hidden">
                <div className="p-5 border-b border-[var(--border-glass)] flex justify-between items-center">
                    <h3 className="font-semibold text-white flex items-center gap-2"><Building2 className="w-4 h-4" /> Departments</h3>
                    <button className="px-4 py-2 text-sm bg-white/10 hover:bg-white/20 text-white rounded-lg transition">+ Add Dept</button>
                </div>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-[var(--border-glass)]">
                            {['Name', 'Code', 'Employees', 'Status', 'Actions'].map(h => (
                                <th key={h} className="text-left text-[var(--text-muted)] text-xs uppercase tracking-wider px-5 py-3">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {dummyDepartments.map((d, i) => (
                            <tr key={i} className="border-b border-[var(--border-glass)]/50 hover:bg-white/5 transition">
                                <td className="px-5 py-3 font-medium text-white">{d.name}</td>
                                <td className="px-5 py-3 text-[var(--text-muted)]"><code className="bg-white/10 px-2 py-0.5 rounded text-xs">{d.code}</code></td>
                                <td className="px-5 py-3 text-[var(--text-muted)]">{d.employeeCount}</td>
                                <td className="px-5 py-3"><span className="text-xs bg-[var(--env)]/20 text-[var(--env)] px-2 py-0.5 rounded-full border border-[var(--env)]/30">Active</span></td>
                                <td className="px-5 py-3">
                                    <button className="text-xs text-[var(--text-muted)] hover:text-white transition mr-3">Edit</button>
                                    <button className="text-xs text-red-400 hover:text-red-300 transition">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </GlassCard>
        </motion.div>
    );
}

function ProfilePage() {
    const { user } = useAuth();
    const toast = useToast();
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl space-y-5">
            <GlassCard>
                <div className="flex items-center gap-5 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--accent-emerald)] to-emerald-900 flex items-center justify-center font-bold text-white text-xl">
                        {user?.name?.split(' ').map(n => n[0]).join('') || '?'}
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">{user?.name}</h3>
                        <p className="text-sm text-[var(--text-muted)]">{user?.email}</p>
                        <p className="text-xs mt-1 bg-[var(--accent-emerald)]/20 text-[var(--accent-emerald)] px-2 py-0.5 rounded-full border border-[var(--accent-emerald)]/30 inline-block capitalize">{user?.role?.replace('_', ' ')}</p>
                    </div>
                </div>
                {[{ label: 'Full Name', value: user?.name }, { label: 'Email', value: user?.email }].map(({ label, value }) => (
                    <div key={label} className="mb-4">
                        <label className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold mb-1.5 block">{label}</label>
                        <input defaultValue={value} className="w-full bg-white/5 border border-[var(--border-glass)] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent-emerald)]/50" />
                    </div>
                ))}
                <button onClick={() => toast.success("Profile updates saved successfully!")} className="flex items-center gap-2 px-5 py-2.5 text-sm bg-gradient-to-r from-[var(--accent-emerald)] to-emerald-700 text-white rounded-xl font-medium hover:opacity-90 transition cursor-pointer">
                    <Save className="w-4 h-4" /> Save Changes
                </button>
            </GlassCard>
        </motion.div>
    );
}

function NotificationsPage() {
    const [email, setEmail] = useState(true);
    const [inApp, setInApp] = useState(true);
    const toast = useToast();
    const [triggers, setTriggers] = useState({
        'New Compliance Issue Raised': true,
        'CSR Approval Decision': true,
        'Challenge Approval Decision': false,
        'Policy Acknowledgement Reminder': true,
        'Badge Unlocked': true,
    });

    const toggleTrigger = (key) => {
        setTriggers(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl space-y-4">
            <GlassCard>
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><Bell className="w-4 h-4 text-[var(--accent-amber)]" /> Notification Channels</h3>
                <div className="space-y-3">
                    <Toggle label="In-App Notifications" description="Show notifications within the platform" value={inApp} onChange={setInApp} />
                    <Toggle label="Email Notifications" description="Receive email alerts for important events" value={email} onChange={setEmail} />
                </div>
            </GlassCard>
            <GlassCard>
                <h3 className="font-semibold text-white mb-4">Event Triggers</h3>
                <div className="space-y-3">
                    {Object.entries(triggers).map(([key, val]) => (
                        <Toggle key={key} label={key} description="" value={val} onChange={() => toggleTrigger(key)} />
                    ))}
                </div>
            </GlassCard>
            <button onClick={() => toast.success("Notification preferences saved successfully!")} className="flex items-center gap-2 px-5 py-2.5 text-sm bg-gradient-to-r from-[var(--accent-emerald)] to-emerald-700 text-white rounded-xl font-medium hover:opacity-90 transition cursor-pointer">
                <Save className="w-4 h-4" /> Save Preferences
            </button>
        </motion.div>
    );
}

export default function SettingsPage() {
    return (
        <div className="pb-20 mt-4">
            <PageHeader title="Settings & Administration" subtitle="ESG configuration, departments, notifications and profile"
                action={<span className="px-3 py-1 text-xs bg-gray-500/20 text-gray-300 border border-gray-500/30 rounded-full font-medium">⚙️ Settings</span>} />
            <SubTabs />
            <Routes>
                <Route path="esg-configuration" element={<EsgConfiguration />} />
                <Route path="departments" element={<DepartmentsPage />} />
                <Route path="notifications" element={<NotificationsPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="*" element={<Navigate to="esg-configuration" replace />} />
            </Routes>
        </div>
    );
}
