import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, Building, Tags, Bell, History, BrainCircuit, Trash2, Edit2, Plus, Check } from 'lucide-react';
import { StatCard, GlassCard, DataTable, StatusBadge } from '../ui/index.jsx';

export default function SuperAdminView({ tab }) {
    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe', email: 'john@ecosphere.com', role: 'employee', dept: 'Corporate', status: 'active' },
        { id: 2, name: 'Sarah Jenkins', email: 'sarah@ecosphere.com', role: 'esg_manager', dept: 'IT & Digital', status: 'active' },
        { id: 3, name: 'Oliver Taylor', email: 'oliver@ecosphere.com', role: 'department_head', dept: 'Manufacturing', status: 'active' },
        { id: 4, name: 'External Auditor', email: 'auditor@ey.com', role: 'auditor', dept: 'Finances', status: 'active' }
    ]);
    const [newUser, setNewUser] = useState({ name: '', email: '', role: 'employee', dept: 'Corporate' });

    const addUser = (e) => {
        e.preventDefault();
        if (!newUser.name || !newUser.email) return;
        setUsers([...users, { ...newUser, id: Date.now(), status: 'active' }]);
        setNewUser({ name: '', email: '', role: 'employee', dept: 'Corporate' });
    };

    const deleteUser = (id) => setUsers(users.filter(u => u.id !== id));

    if (tab === 'manage_users') {
        return (
            <GlassCard>
                <h3 className="text-xl font-bold text-white mb-4">Manage System Users</h3>
                <form onSubmit={addUser} className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6 bg-white/5 p-4 rounded-xl border border-white/10">
                    <input
                        type="text"
                        placeholder="Name"
                        value={newUser.name}
                        onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                        className="bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={newUser.email}
                        onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                        className="bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                        required
                    />
                    <select
                        value={newUser.role}
                        onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                        className="bg-[var(--bg-secondary)] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
                    >
                        <option value="super_admin">Super Admin</option>
                        <option value="esg_manager">ESG Manager</option>
                        <option value="department_head">Dept Head</option>
                        <option value="employee">Employee</option>
                        <option value="auditor">Auditor</option>
                        <option value="executive">Executive</option>
                        <option value="csr_manager">CSR Manager</option>
                        <option value="compliance_officer">Compliance Ofc</option>
                        <option value="gamification_manager">Gamification Mgr</option>
                        <option value="viewer">Viewer</option>
                    </select>
                    <select
                        value={newUser.dept}
                        onChange={e => setNewUser({ ...newUser, dept: e.target.value })}
                        className="bg-[var(--bg-secondary)] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
                    >
                        <option value="Corporate">Corporate</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Logistics">Logistics</option>
                        <option value="IT & Digital">IT & Digital</option>
                    </select>
                    <button type="submit" className="bg-[var(--accent-emerald)] text-white text-sm font-semibold rounded-lg px-4 py-2 hover:bg-emerald-600 transition flex items-center justify-center gap-1">
                        <Plus className="w-4 h-4" /> Add User
                    </button>
                </form>
                <DataTable
                    columns={[
                        { header: 'Name', accessor: 'name' },
                        { header: 'Email', accessor: 'email' },
                        { header: 'Role', cell: u => <span className="text-[var(--accent-teal)] font-medium capitalize">{u.role.replace('_', ' ')}</span> },
                        { header: 'Department', accessor: 'dept' },
                        { header: 'Status', cell: u => <StatusBadge status={u.status} /> },
                        {
                            header: 'Actions',
                            cell: u => (
                                <button onClick={() => deleteUser(u.id)} className="text-red-400 hover:text-red-300 p-1">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            )
                        }
                    ]}
                    data={users}
                />
            </GlassCard>
        );
    }

    if (tab === 'manage_roles') {
        const roles = [
            { name: 'Super Admin', permissions: 'System-wide configuration, access logs audit trails, manage system weights, full overrides.' },
            { name: 'ESG Manager', permissions: 'Record greenhouse direct emissions, set environmental target metrics, update product profiles.' },
            { name: 'Department Head', permissions: 'Confirm team volunteering achievements, inspect department ESG stats, submit milestones.' },
            { name: 'Employee', permissions: 'Opt-in carbon action challenges, log green daily commuting, check leaderboard status, claim rewards.' },
            { name: 'Auditor', permissions: 'Review verified ESG records audit trail, flag metrics discrepancies, generate certified outputs.' },
            { name: 'Executive', permissions: 'Read overall ESG statistics score dashboards, verify global strategic trends, read AI executive brief summaries.' },
            { name: 'CSR Manager', permissions: 'Configure active community challenges, monitor volunteer event completion trends, update certificate inventories.' },
            { name: 'Compliance Officer', permissions: 'Manage outstanding policy documents, track compliance schedules status, verify high-priority warnings.' },
            { name: 'Gamification Manager', permissions: 'Configure reward points cost rules, manage leaderboards updates, publish new active challenges.' },
            { name: 'Viewer', permissions: 'Read-only dashboard inspection and corporate baseline summary.' }
        ];
        return (
            <GlassCard>
                <h3 className="text-xl font-bold text-white mb-4">RBAC Roles & Permissions Mapping</h3>
                <DataTable
                    columns={[
                        { header: 'Role Label', cell: r => <span className="font-semibold text-white">{r.name}</span> },
                        { header: 'Permissions Scope', accessor: 'permissions' }
                    ]}
                    data={roles}
                />
            </GlassCard>
        );
    }

    if (tab === 'manage_departments') {
        const depts = [
            { code: 'CORP', name: 'Corporate Head Office', employees: 15, esgScore: '84.8' },
            { code: 'MFG', name: 'Manufacturing Division', employees: 150, esgScore: '73.2' },
            { code: 'LOG', name: 'Fleet & Logistics Operations', employees: 45, esgScore: '73.4' },
            { code: 'HR', name: 'Human Resources & CSR', employees: 30, esgScore: '90.2' },
            { code: 'IT', name: 'IT Infrastructure & Digital Rooms', employees: 60, esgScore: '87.4' }
        ];
        return (
            <GlassCard>
                <h3 className="text-xl font-bold text-white mb-4">System Departments</h3>
                <DataTable
                    columns={[
                        { header: 'Code', accessor: 'code' },
                        { header: 'Department Name', accessor: 'name' },
                        { header: 'Head Count', accessor: 'employees' },
                        { header: 'ESG Score', cell: d => <span className="text-[var(--accent-emerald)] font-bold">{d.esgScore}</span> }
                    ]}
                    data={depts}
                />
            </GlassCard>
        );
    }

    if (tab === 'manage_categories') {
        return (
            <GlassCard>
                <h3 className="text-xl font-bold text-white mb-4">Manage Activity Categories</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['Carbon Offset', 'CSR Community Service', 'Compliance Audit', 'Waste Reduction', 'Green Commute', 'Clean Energy'].map(c => (
                        <div key={c} className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-white font-medium">
                            <span>{c}</span>
                            <span className="text-xs text-[var(--accent-emerald)] bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">System Category</span>
                        </div>
                    ))}
                </div>
            </GlassCard>
        );
    }

    if (tab === 'notification_settings') {
        return (
            <GlassCard>
                <h3 className="text-xl font-bold text-white mb-4">System Alerts & Email Settings</h3>
                <div className="space-y-4">
                    {[
                        { label: 'Weekly ESG Digest Reports', desc: 'Sends summary of previous week reports to the Executive suite' },
                        { label: 'New Compliance Issue Notification', desc: 'Alert Compliance Officers and Auditors when a high risk compliance issue is opened' },
                        { label: 'CSR Completion Certifications', desc: 'Auto-email certificates to employees upon approval of CSR proofs' },
                        { label: 'Monthly System Audit Log Backup', desc: 'Send admin a zipped backup of database audit logs' }
                    ].map((n, i) => (
                        <div key={i} className="flex justify-between items-center bg-white/5 border border-white/10 p-4 rounded-xl">
                            <div>
                                <h4 className="text-white font-semibold">{n.label}</h4>
                                <p className="text-xs text-[var(--text-muted)] mt-1">{n.desc}</p>
                            </div>
                            <div className="cursor-pointer bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-lg text-xs font-bold font-semibold uppercase">Enabled</div>
                        </div>
                    ))}
                </div>
            </GlassCard>
        );
    }

    if (tab === 'audit_logs') {
        return (
            <GlassCard>
                <h3 className="text-xl font-bold text-white mb-4">Platform System Audit Trail</h3>
                <DataTable
                    columns={[
                        { header: 'Timestamp', accessor: 'time' },
                        { header: 'Action Executive', accessor: 'executor' },
                        { header: 'Action', accessor: 'action' },
                        { header: 'Description', accessor: 'desc' }
                    ]}
                    data={[
                        { time: '2026-07-12 10:42', executor: 'Super Admin', action: 'ROLE_UPDATE', desc: 'Updated auditor permissions scope' },
                        { time: '2026-07-12 09:15', executor: 'manager@ecosphere.com', action: 'EMISSION_ADD', desc: 'Logged factor value 0.82 for Electricity' },
                        { time: '2026-07-11 16:30', executor: 'System Scheduler', action: 'CRON_REPORTS', desc: 'Dispatched automated ESG weights calculation' },
                        { time: '2026-07-10 18:22', executor: 'head@ecosphere.com', action: 'PROOF_REVIEW', desc: 'Approved CSR activity proof for cycles' }
                    ]}
                />
            </GlassCard>
        );
    }

    if (tab === 'ai_insights') {
        return (
            <GlassCard className="border border-[var(--accent-emerald)]/30">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 text-[var(--accent-emerald)] flex items-center justify-center rounded-xl">
                        <BrainCircuit className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">EcoSphere AI Insights Hub</h3>
                        <p className="text-xs text-[var(--text-muted)]">Automatic machine learning anomaly detection and optimizations</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <h4 className="text-[var(--accent-emerald)] font-bold text-sm">🚚 Logistics Anomaly Detected</h4>
                        <p className="text-xs text-gray-300 mt-2">Logistics sector CO₂ emissions grew 12% above projection this quarter. Recommending switching route optimizer to energy conservation mode.</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <h4 className="text-[var(--accent-emerald)] font-bold text-sm">💡 Power Consumption Optimizations</h4>
                        <p className="text-xs text-gray-300 mt-2">Manufacturing Sector B is experiencing peak loads between 2 PM and 4 PM. High factors during peak hours suggests rescheduling operations to morning hours.</p>
                    </div>
                </div>
            </GlassCard>
        );
    }

    // Default Overview
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-2">Overall ESG Metrics</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Overall ESG Score" value="82%" sub="System weights avg" icon={Shield} color="var(--accent-amber)" gradient="from-amber-400 to-amber-700 font-semibold" />
                <StatCard title="Environmental" value="86%" sub="CO2 Trackers Active" icon={Users} color="var(--env)" gradient="from-emerald-400 to-emerald-700" />
                <StatCard title="Social Score" value="74%" sub="Engagement active" icon={Users} color="var(--social)" gradient="from-purple-400 to-purple-700" />
                <StatCard title="Governance" value="85%" sub="Compliance goals" icon={Shield} color="var(--gov)" gradient="from-sky-400 to-sky-700" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <p className="text-xs text-[var(--text-muted)] font-medium">TOTAL SYSTEM EMPLOYEES</p>
                    <h4 className="text-2xl font-bold text-white mt-1">300</h4>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <p className="text-xs text-[var(--text-muted)] font-medium">TOTAL DEPARTMENTS</p>
                    <h4 className="text-2xl font-bold text-white mt-1">5</h4>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <p className="text-xs text-[var(--text-muted)] font-medium">ACTIVE CSR INITIATIVES</p>
                    <h4 className="text-2xl font-bold text-white mt-1">12</h4>
                </div>
            </div>

            <GlassCard>
                <h4 className="font-semibold text-white mb-3">Pending Action Items</h4>
                <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300">
                        <span>High Priority: Wastewater discharge limits exceeded in Sector B</span>
                        <span className="font-semibold bg-red-500/20 px-2 py-0.5 rounded border border-red-500/40">Review Required</span>
                    </div>
                    <div className="flex justify-between items-center text-xs p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300">
                        <span>Sarah Jenkins' Beach Cleanup activity proof package needs confirmation</span>
                        <span className="font-semibold bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/40">Awaiting CEO Approval</span>
                    </div>
                </div>
            </GlassCard>
        </div>
    );
}
