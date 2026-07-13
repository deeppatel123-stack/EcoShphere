import React from 'react';
import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Plus, AlertTriangle, FileText, BookOpen } from 'lucide-react';
import { PageHeader, GlassCard, StatCard, DataTable, StatusBadge, SeverityBadge } from '../components/ui/index.jsx';
import { dummyPolicies, dummyAudits, dummyComplianceIssues } from '../data/dummy/index.js';

const SUB_TABS = [
    { path: 'dashboard', label: 'Dashboard' },
    { path: 'policies', label: 'Policies' },
    { path: 'audits', label: 'Audits' },
    { path: 'compliance-issues', label: 'Compliance Issues' },
    { path: 'policy-acknowledgements', label: 'Acknowledgements' },
];

const SubTabs = () => (
    <div className="flex gap-2 mb-6 flex-wrap">
        {SUB_TABS.map(t => (
            <NavLink key={t.path} to={t.path}
                className={({ isActive }) => `px-4 py-2 rounded-lg text-sm font-medium transition ${isActive
                    ? 'bg-[var(--gov)]/20 text-[var(--gov)] border border-[var(--gov)]/30'
                    : 'text-[var(--text-muted)] bg-white/5 hover:bg-white/10 hover:text-white border border-transparent'}`}
            >{t.label}</NavLink>
        ))}
    </div>
);

function GovDashboard() {
    const overdue = dummyComplianceIssues.filter(ci => ci.isOverdue).length;
    const open = dummyComplianceIssues.filter(ci => ci.status === 'open').length;
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                <StatCard title="Active Policies" value={dummyPolicies.filter(p => p.status === 'active').length} sub="Requires Acknowledgement" icon={BookOpen} color="var(--gov)" gradient="from-sky-400 to-sky-700" />
                <StatCard title="Audits Scheduled" value={dummyAudits.length} sub="This Quarter" icon={FileText} color="var(--social)" gradient="from-purple-400 to-purple-700" />
                <StatCard title="Open Issues" value={open} sub="Compliance Violations" icon={AlertTriangle} color="var(--accent-amber)" gradient="from-amber-400 to-amber-700" />
                <StatCard title="Overdue Issues" value={overdue} sub="Past Due Date 🔴" icon={ShieldCheck} color="var(--accent-rose)" gradient="from-rose-400 to-rose-700" />
            </div>

            <GlassCard>
                <h3 className="font-semibold text-white mb-5">⚠️ Compliance Issues Overview</h3>
                <div className="space-y-3">
                    {dummyComplianceIssues.map((ci, i) => (
                        <div key={i} className={`p-4 rounded-xl border ${ci.isOverdue ? 'border-red-500/30 bg-red-500/5' : 'border-[var(--border-glass)] bg-white/5'}`}>
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-white">{ci.description}</p>
                                    <p className="text-xs text-[var(--text-muted)] mt-0.5">
                                        Owner: <span className="text-white">{ci.owner}</span> · Due: <span className={ci.isOverdue ? 'text-red-400 font-bold' : 'text-white'}>{ci.dueDate}</span> · Audit: {ci.audit}
                                    </p>
                                </div>
                                <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                                    <SeverityBadge severity={ci.severity} />
                                    <StatusBadge status={ci.status} />
                                    {ci.isOverdue && <span className="text-[9px] bg-red-500/30 text-red-300 px-2 py-0.5 rounded-full font-bold animate-pulse">OVERDUE</span>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </GlassCard>
        </motion.div>
    );
}

function Policies() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex justify-between items-center mb-5">
                <h3 className="font-semibold text-white">ESG Policies</h3>
                <button className="flex items-center gap-2 px-4 py-2 text-sm bg-[var(--gov)] hover:bg-sky-600 text-white rounded-lg font-medium transition">
                    <Plus className="w-4 h-4" /> New Policy
                </button>
            </div>
            <div className="space-y-3">
                {dummyPolicies.map((p, i) => (
                    <GlassCard key={i}>
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <BookOpen className="w-4 h-4 text-[var(--gov)]" />
                                    <h4 className="font-semibold text-white">{p.title}</h4>
                                </div>
                                <p className="text-xs text-[var(--text-muted)]">Version {p.version} · {p.category} · Effective: {p.effectiveDate}</p>
                            </div>
                            <div className="flex items-center gap-3 flex-shrink-0">
                                {p.requiresAcknowledgement && <span className="text-xs bg-[var(--gov)]/20 text-[var(--gov)] px-2 py-1 rounded-lg border border-[var(--gov)]/30">Ack. Required</span>}
                                <StatusBadge status={p.status} />
                            </div>
                        </div>
                    </GlassCard>
                ))}
            </div>
        </motion.div>
    );
}

function Audits() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex justify-between items-center mb-5">
                <h3 className="font-semibold text-white">Audits</h3>
                <button className="flex items-center gap-2 px-4 py-2 text-sm bg-[var(--gov)] hover:bg-sky-600 text-white rounded-lg font-medium transition">
                    <Plus className="w-4 h-4" /> Schedule Audit
                </button>
            </div>
            <GlassCard className="!p-0 overflow-hidden">
                <DataTable
                    columns={[
                        { header: 'Title', accessor: 'title' },
                        { header: 'Auditor', accessor: 'auditor' },
                        { header: 'Department', accessor: 'department' },
                        { header: 'Scheduled', accessor: 'scheduledDate' },
                        { header: 'Status', cell: r => <StatusBadge status={r.status} /> },
                        { header: 'Findings', cell: r => r.findings ? <span className="text-xs text-amber-400 truncate max-w-[200px] block">{r.findings}</span> : <span className="text-[var(--text-muted)] text-xs">—</span> },
                    ]}
                    data={dummyAudits}
                />
            </GlassCard>
        </motion.div>
    );
}

function ComplianceIssues() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex justify-between items-center mb-5">
                <h3 className="font-semibold text-white">Compliance Issues</h3>
                <button className="flex items-center gap-2 px-4 py-2 text-sm bg-[var(--gov)] hover:bg-sky-600 text-white rounded-lg font-medium transition">
                    <Plus className="w-4 h-4" /> Raise Issue
                </button>
            </div>
            <GlassCard className="!p-0 overflow-hidden">
                <DataTable
                    columns={[
                        { header: 'Description', cell: r => <span className="text-sm max-w-xs truncate block">{r.description}</span> },
                        { header: 'Severity', cell: r => <SeverityBadge severity={r.severity} /> },
                        { header: 'Owner', accessor: 'owner' },
                        { header: 'Due Date', cell: r => <span className={r.isOverdue ? 'text-red-400 font-bold' : ''}>{r.dueDate}</span> },
                        { header: 'Status', cell: r => <StatusBadge status={r.status} /> },
                        { header: 'Overdue', cell: r => r.isOverdue ? <span className="text-red-400 text-xs font-bold animate-pulse">⚠ YES</span> : <span className="text-[var(--text-muted)] text-xs">No</span> },
                    ]}
                    data={dummyComplianceIssues}
                />
            </GlassCard>
        </motion.div>
    );
}

export default function Governance() {
    return (
        <div className="pb-20 mt-4">
            <PageHeader title="Governance Module" subtitle="Policies, audits, compliance tracking and governance reports"
                action={<span className="px-3 py-1 text-xs bg-[var(--gov)]/20 text-[var(--gov)] border border-[var(--gov)]/30 rounded-full font-medium">🛡️ Governance Module</span>} />
            <SubTabs />
            <Routes>
                <Route path="dashboard" element={<GovDashboard />} />
                <Route path="policies" element={<Policies />} />
                <Route path="audits" element={<Audits />} />
                <Route path="compliance-issues" element={<ComplianceIssues />} />
                <Route path="policy-acknowledgements" element={<Policies />} />
                <Route path="*" element={<Navigate to="dashboard" replace />} />
            </Routes>
        </div>
    );
}
