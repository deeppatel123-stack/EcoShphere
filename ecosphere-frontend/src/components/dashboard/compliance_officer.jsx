import React, { useState } from 'react';
import { ShieldAlert, Flame, CalendarClock, UserCheck, AlertTriangle } from 'lucide-react';
import { StatCard, GlassCard, DataTable, StatusBadge } from '../ui/index.jsx';

export default function ComplianceOfficerView({ tab }) {
    const [violations, setViolations] = useState([
        { id: 1, loc: 'Sector B Waste Outlet', type: 'Wastewater Limit Exceeded', severity: 'critical', logged: '2026-06-30', status: 'open' },
        { id: 2, loc: 'HR Shift Recyclers', type: 'Missing paper trail for disposal', severity: 'low', logged: '2026-07-02', status: 'resolved' },
        { id: 3, loc: 'Logistics Depot', type: 'Fuel log book missing sheets', severity: 'high', logged: '2026-07-12', status: 'in_progress' }
    ]);
    const [newVio, setNewVio] = useState({ loc: '', type: '', severity: 'high' });

    const reportViolation = (e) => {
        e.preventDefault();
        setViolations([...violations, { ...newVio, id: Date.now(), logged: new Date().toISOString().split('T')[0], status: 'open' }]);
        setNewVio({ loc: '', type: '', severity: 'high' });
    };

    if (tab === 'violations') {
        return (
            <GlassCard>
                <h3 className="text-xl font-bold text-white mb-4">Report & Track Violations</h3>
                <form onSubmit={reportViolation} className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-white/5 p-4 rounded-xl border border-white/10 mb-5">
                    <input type="text" placeholder="Location Office" value={newVio.loc} onChange={e => setNewVio({ ...newVio, loc: e.target.value })} required className="bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-xs text-white" />
                    <input type="text" placeholder="Breach Event Description" value={newVio.type} onChange={e => setNewVio({ ...newVio, type: e.target.value })} required className="bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-xs text-white" />
                    <select value={newVio.severity} onChange={e => setNewVio({ ...newVio, severity: e.target.value })} className="bg-[var(--bg-secondary)] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none">
                        <option value="critical">Critical Risk</option>
                        <option value="high">High Risk</option>
                        <option value="medium">Medium Risk</option>
                        <option value="low">Low Risk</option>
                    </select>
                    <button type="submit" className="bg-[var(--accent-rose)] text-white text-xs font-bold rounded-lg hover:bg-red-700 transition">
                        File Violation Report
                    </button>
                </form>
                <DataTable
                    columns={[
                        { header: 'Breach Incident', accessor: 'type' },
                        { header: 'Location / Dept', accessor: 'loc' },
                        { header: 'Logged', accessor: 'logged' },
                        {
                            header: 'Urgency', cell: v => (
                                <span className={`text-[10px] uppercase font-bold border rounded px-2 py-0.5 ${v.severity === 'critical' ? 'bg-red-500/30 text-red-300 border-red-500/50' : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                                    }`}>{v.severity}</span>
                            )
                        },
                        { header: 'State', cell: v => <StatusBadge status={v.status} /> }
                    ]}
                    data={violations}
                />
            </GlassCard>
        );
    }

    if (tab === 'deadlines') {
        return (
            <GlassCard>
                <h3 className="text-xl font-bold text-white mb-4">Upcoming Compliance Deadlines</h3>
                <DataTable
                    columns={[
                        { header: 'Filing Item', accessor: 'item' },
                        { header: 'Due Date', accessor: 'due' },
                        { header: 'Days Remaining', accessor: 'remain' }
                    ]}
                    data={[
                        { item: 'Q2 Carbon Tax reports package submission', due: '2026-07-28', remain: '16 Days' },
                        { item: 'Corporate ESG weights parameters review signoff', due: '2026-08-15', remain: '34 Days' },
                        { item: 'Wastewater limits remediation schedule validation', due: '2026-07-20', remain: '8 Days' }
                    ]}
                />
            </GlassCard>
        );
    }

    if (tab === 'risk_level') {
        return (
            <GlassCard>
                <h3 className="text-xl font-bold text-white mb-4">Divisional Risk Analysis Matrix</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { name: 'Manufacturing Sector B', risk: 'Critical', color: 'bg-red-500/20 border-red-500/30 text-red-300' },
                        { name: 'Logistics Fleet Operations', risk: 'High', color: 'bg-orange-500/20 border-orange-500/30 text-orange-300' },
                        { name: 'Corporate Head Offices', risk: 'Low', color: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300' }
                    ].map((m, i) => (
                        <div key={i} className={`p-4 rounded-xl border ${m.color}`}>
                            <h4 className="font-semibold text-sm">{m.name}</h4>
                            <p className="text-2xl font-bold mt-2">{m.risk} Risk</p>
                        </div>
                    ))}
                </div>
            </GlassCard>
        );
    }

    // Default Overview
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-2">⚖️ Compliance & Governance Center</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Compliance Issues" value={`${violations.filter(v => v.status === 'open').length} Open`} sub="Awaiting review" icon={ShieldAlert} color="var(--gov)" gradient="from-sky-400 to-sky-700" />
                <StatCard title="Recorded Violations" value={`${violations.length} Incidents`} sub="Logged this cycle" icon={AlertTriangle} color="var(--accent-rose)" gradient="from-rose-400 to-rose-700" />
                <StatCard title="Days to Deadline" value="8 Days" sub="Wastewater review" icon={CalendarClock} color="var(--accent-amber)" gradient="from-amber-400 to-amber-700" />
                <StatCard title="Pending Approvals" value="1 Request" sub="Corporate guidelines" icon={UserCheck} color="var(--env)" gradient="from-emerald-400 to-emerald-700" />
            </div>

            <GlassCard>
                <h4 className="font-semibold text-white mb-3">Pending Verification Checklist</h4>
                <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs p-3 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-300">
                        <span>Verification needed for fuel logs in Logistics fleet</span>
                        <span className="font-bold">Pending Review</span>
                    </div>
                </div>
            </GlassCard>
        </div>
    );
}
