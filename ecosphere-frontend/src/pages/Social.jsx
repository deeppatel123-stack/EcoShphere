import React from 'react';
import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Plus, CheckCircle2, Clock, Heart } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { PageHeader, GlassCard, StatCard, DataTable, StatusBadge, EmptyState } from '../components/ui/index.jsx';
import { dummyCsrActivities, dummyParticipation } from '../data/dummy/index.js';

const SUB_TABS = [
    { path: 'dashboard', label: 'Dashboard' },
    { path: 'csr-activities', label: 'CSR Activities' },
    { path: 'employee-participation', label: 'Participation' },
    { path: 'diversity-metrics', label: 'Diversity' },
    { path: 'approval-queue', label: 'Approval Queue' },
];

const SubTabs = () => (
    <div className="flex gap-2 mb-6 flex-wrap">
        {SUB_TABS.map(t => (
            <NavLink key={t.path} to={t.path}
                className={({ isActive }) => `px-4 py-2 rounded-lg text-sm font-medium transition ${isActive
                    ? 'bg-[var(--social)]/20 text-[var(--social)] border border-[var(--social)]/30'
                    : 'text-[var(--text-muted)] bg-white/5 hover:bg-white/10 hover:text-white border border-transparent'}`}
            >{t.label}</NavLink>
        ))}
    </div>
);

const diversityData = [
    { name: 'Male', value: 58, color: 'var(--gov)' },
    { name: 'Female', value: 38, color: 'var(--social)' },
    { name: 'Non-Binary', value: 4, color: 'var(--accent-amber)' },
];

function SocialDashboard() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                <StatCard title="CSR Activities" value={dummyCsrActivities.length} sub="This Quarter" icon={Heart} color="var(--social)" gradient="from-purple-400 to-purple-700" />
                <StatCard title="Participation" value={dummyParticipation.length} sub="Total Enrollments" icon={Users} color="var(--gov)" gradient="from-sky-400 to-sky-700" />
                <StatCard title="Approved" value="1" sub="CSR Completed" icon={CheckCircle2} color="var(--env)" gradient="from-emerald-400 to-emerald-700" />
                <StatCard title="Pending Approvals" value="1" sub="Awaiting Review" icon={Clock} color="var(--accent-amber)" gradient="from-amber-400 to-amber-700" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <GlassCard>
                    <h3 className="font-semibold text-white mb-5">Gender Diversity</h3>
                    <div className="flex items-center gap-6">
                        <ResponsiveContainer width="50%" height={200}>
                            <PieChart>
                                <Pie data={diversityData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" paddingAngle={3}>
                                    {diversityData.map((entry, i) => <Cell key={i} fill={entry.color} stroke="transparent" />)}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-glass)', borderRadius: '12px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="space-y-3 flex-1">
                            {diversityData.map((d, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                                    <span className="text-sm text-[var(--text-muted)]">{d.name}</span>
                                    <span className="ml-auto text-sm font-bold text-white">{d.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </GlassCard>
                <GlassCard>
                    <h3 className="font-semibold text-white mb-5">Training Completion by Dept</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={[
                            { dept: 'Corp', comp: 92 }, { dept: 'MFG', comp: 68 }, { dept: 'HR', comp: 97 }, { dept: 'IT', comp: 85 }, { dept: 'LOG', comp: 72 }
                        ]}>
                            <XAxis dataKey="dept" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                            <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} domain={[0, 100]} />
                            <Tooltip contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-glass)', borderRadius: '12px' }} />
                            <Bar dataKey="comp" fill="var(--social)" radius={[4, 4, 0, 0]} fillOpacity={0.8} />
                        </BarChart>
                    </ResponsiveContainer>
                </GlassCard>
            </div>
        </motion.div>
    );
}

function CsrActivities() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex justify-between items-center mb-5">
                <h3 className="font-semibold text-white">CSR Activities</h3>
                <button className="flex items-center gap-2 px-4 py-2 text-sm bg-[var(--social)] hover:bg-purple-600 text-white rounded-lg font-medium transition">
                    <Plus className="w-4 h-4" /> New Activity
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {dummyCsrActivities.map((act, i) => (
                    <GlassCard key={i}>
                        <div className="flex justify-between items-start mb-3">
                            <h4 className="font-semibold text-white">{act.title}</h4>
                            <StatusBadge status={act.status} />
                        </div>
                        <p className="text-xs text-[var(--text-muted)] mb-3">{act.department} · {act.startDate} → {act.endDate}</p>
                        <div className="flex justify-between text-sm">
                            <span className="text-[var(--text-muted)]">👥 Max: <span className="text-white font-medium">{act.maxParticipants}</span></span>
                            <span className="text-[var(--social)] font-bold">+{act.pointsOffered} pts</span>
                        </div>
                    </GlassCard>
                ))}
            </div>
        </motion.div>
    );
}

function EmployeeParticipation() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <GlassCard className="!p-0 overflow-hidden">
                <div className="p-5 border-b border-[var(--border-glass)]">
                    <h3 className="font-semibold text-white">Employee Participation Records</h3>
                </div>
                <DataTable
                    columns={[
                        { header: 'Employee', accessor: 'employee' },
                        { header: 'Activity', accessor: 'activity' },
                        {
                            header: 'Proof', cell: r => r.proofFile
                                ? <span className="text-[var(--env)] text-xs">✅ Uploaded</span>
                                : <span className="text-[var(--accent-rose)] text-xs">❌ Missing</span>
                        },
                        { header: 'Status', cell: r => <StatusBadge status={r.approvalStatus} /> },
                        { header: 'Points', cell: r => <span className="text-[var(--social)] font-bold">{r.pointsEarned}</span> },
                    ]}
                    data={dummyParticipation}
                />
            </GlassCard>
        </motion.div>
    );
}

function ApprovalQueue() {
    const pending = dummyParticipation.filter(p => p.approvalStatus === 'pending');
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3 className="font-semibold text-white mb-5">Pending Approvals</h3>
            {pending.length === 0 ? (
                <GlassCard><EmptyState icon={CheckCircle2} title="All caught up!" description="No pending approvals at this time." /></GlassCard>
            ) : (
                <div className="space-y-3">
                    {pending.map((p, i) => (
                        <GlassCard key={i}>
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex-1">
                                    <p className="font-semibold text-white">{p.employee}</p>
                                    <p className="text-xs text-[var(--text-muted)]">{p.activity}</p>
                                    {!p.proofFile && (
                                        <span className="text-xs text-amber-400 mt-1 inline-block">⚠️ No proof uploaded — Evidence Required</span>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <button disabled={!p.proofFile} className="px-3 py-1.5 text-xs bg-[var(--env)]/20 text-[var(--env)] border border-[var(--env)]/30 rounded-lg font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--env)]/30 transition">
                                        Approve
                                    </button>
                                    <button className="px-3 py-1.5 text-xs bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg font-medium hover:bg-red-500/30 transition">
                                        Reject
                                    </button>
                                </div>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            )}
        </motion.div>
    );
}

export default function Social() {
    return (
        <div className="pb-20 mt-4">
            <PageHeader title="Social Module" subtitle="CSR activities, employee participation, diversity metrics and engagement"
                action={<span className="px-3 py-1 text-xs bg-[var(--social)]/20 text-[var(--social)] border border-[var(--social)]/30 rounded-full font-medium">🤝 Social Module</span>} />
            <SubTabs />
            <Routes>
                <Route path="dashboard" element={<SocialDashboard />} />
                <Route path="csr-activities" element={<CsrActivities />} />
                <Route path="employee-participation" element={<EmployeeParticipation />} />
                <Route path="diversity-metrics" element={<SocialDashboard />} />
                <Route path="approval-queue" element={<ApprovalQueue />} />
                <Route path="*" element={<Navigate to="dashboard" replace />} />
            </Routes>
        </div>
    );
}
