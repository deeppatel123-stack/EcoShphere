import React, { useState } from 'react';
import { ShieldCheck, FilePlus, RefreshCw, AlertTriangle, ShieldAlert } from 'lucide-react';
import { StatCard, GlassCard, DataTable, StatusBadge } from '../ui/index.jsx';
import { useToast } from '../../contexts/ToastContext.jsx';

export default function AuditorView({ tab }) {
    const toast = useToast();
    const [audits, setAudits] = useState([
        { id: 1, title: 'Q2 Environmental Waste Audit', auditor: 'EY external agency', dept: 'Manufacturing Division', status: 'scheduled', date: '2026-07-20' },
        { id: 2, title: 'H1 CSR Funds Inspection', auditor: 'Corporate Internal ESG team', dept: 'HR & People', status: 'completed', date: '2026-06-01' }
    ]);
    const [findings, setFindings] = useState([
        { code: 'F-12', source: 'Q1 fleet operations fuel log', issue: 'Missing log sheets for logistics vans in April', category: 'Energy Tracker', status: 'open' },
        { code: 'F-13', source: 'Recycling vendor audit', issue: 'Incomplete paperwork for plastic shredder waste path', category: 'Waste Management', status: 'resolved' },
        { code: 'F-14', source: 'Carbon emission reports', issue: 'Under-reported emission factor on IT cooling fans', category: 'Carbon Accounting', status: 'in_progress' }
    ]);

    const [newFinding, setNewFinding] = useState({ code: '', source: '', issue: '', category: 'Energy Tracker' });

    const addFinding = (e) => {
        e.preventDefault();
        if (!newFinding.code || !newFinding.issue) return;
        setFindings([...findings, { ...newFinding, status: 'open' }]);
        setNewFinding({ code: '', source: '', issue: '', category: 'Energy Tracker' });
        toast.success("New compliance finding registered successfully!");
    };

    if (tab === 'create_audit') {
        return (
            <GlassCard>
                <h3 className="text-xl font-bold text-white mb-4">Create New ESG Compliance Audit</h3>
                <form onSubmit={(e) => { e.preventDefault(); toast.success("New audit scheduled in system successfully!"); }} className="space-y-4 max-w-md">
                    <div>
                        <label className="text-xs font-semibold text-slate-300 block mb-1">Audit Reference Header</label>
                        <input type="text" placeholder="e.g. ISO 14001 Annual Review" required className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white" />
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-slate-300 block mb-1">Assigned Auditor Agency</label>
                        <input type="text" placeholder="Internal audit team or external agency" required className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white" />
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-slate-300 block mb-1">Target Department Scope</label>
                        <select className="w-full bg-[var(--bg-secondary)] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none">
                            <option>Manufacturing Division</option>
                            <option>Corporate Head Office</option>
                            <option>Logistics & Delivery Operations</option>
                        </select>
                    </div>
                    <button type="submit" className="px-4 py-2 bg-[var(--accent-emerald)] text-white text-xs font-bold rounded-lg transition hover:bg-emerald-600">
                        Register & Schedule Audit
                    </button>
                </form>
            </GlassCard>
        );
    }

    if (tab === 'audit_findings') {
        return (
            <GlassCard>
                <h3 className="text-xl font-bold text-white mb-4">Track Critical Audit Findings</h3>
                <form onSubmit={addFinding} className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-white/5 p-4 rounded-xl border border-white/10 mb-5">
                    <input type="text" placeholder="Finding Code (e.g. F-15)" value={newFinding.code} onChange={e => setNewFinding({ ...newFinding, code: e.target.value })} required className="bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-xs text-white" />
                    <input type="text" placeholder="Source System" value={newFinding.source} onChange={e => setNewFinding({ ...newFinding, source: e.target.value })} required className="bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-xs text-white" />
                    <input type="text" placeholder="Issue Description" value={newFinding.issue} onChange={e => setNewFinding({ ...newFinding, issue: e.target.value })} required className="bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-xs text-white" />
                    <button type="submit" className="bg-[var(--accent-emerald)] text-white text-xs font-bold rounded-lg hover:bg-emerald-600 transition">
                        Register Finding
                    </button>
                </form>
                <DataTable
                    columns={[
                        { header: 'Finding Ref', accessor: 'code' },
                        { header: 'Source Area', accessor: 'source' },
                        { header: 'Issue Detail', accessor: 'issue' },
                        { header: 'Compliance Category', accessor: 'category' },
                        { header: 'Finding Status', cell: f => <StatusBadge status={f.status} /> }
                    ]}
                    data={findings}
                />
            </GlassCard>
        );
    }

    // Default Overview
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-2">🔍 Compliance Verification</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Active Audits" value="2 Audits" sub="Q2 Scope active" icon={ShieldCheck} color="var(--gov)" gradient="from-sky-400 to-sky-700" />
                <StatCard title="Total Compliance Findings" value="14 Issues" sub="Environmental targets" icon={AlertTriangle} color="var(--accent-amber)" gradient="from-amber-400 to-amber-700" />
                <StatCard title="Audit Completion Rate" value="98%" sub="Highly responsive" icon={RefreshCw} color="var(--env)" gradient="from-emerald-400 to-emerald-700" />
                <StatCard title="Risk Index Score" value="Medium" sub="Wastewater issue" icon={ShieldAlert} color="var(--accent-rose)" gradient="from-rose-400 to-rose-700" />
            </div>

            <GlassCard>
                <h4 className="font-semibold text-white mb-4">Current Audit Schedules</h4>
                <DataTable
                    columns={[
                        { header: 'Audit Scope Name', accessor: 'title' },
                        { header: 'Auditor Entity', accessor: 'auditor' },
                        { header: 'Department target', accessor: 'dept' },
                        { header: 'Due Date', accessor: 'date' },
                        { header: 'Audit Status', cell: a => <StatusBadge status={a.status} /> }
                    ]}
                    data={audits}
                />
            </GlassCard>
        </div>
    );
}
