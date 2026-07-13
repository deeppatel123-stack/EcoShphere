import React, { useState } from 'react';
import { CheckSquare, ClipboardList, LineChart, Check, X } from 'lucide-react';
import { StatCard, GlassCard, DataTable, StatusBadge } from '../ui/index.jsx';
import { useToast } from '../../contexts/ToastContext.jsx';

export default function DepartmentHeadView({ tab }) {
    const toast = useToast();
    const [reviews, setReviews] = useState([
        { id: 1, employee: 'Sarah Jenkins', activity: 'Beach Cleanup Initiative', file: 'selfie_beach.jpg', date: '2026-07-12', points: 80 },
        { id: 2, employee: 'James Carter', activity: 'Tree Planting Drive', file: 'tree_planted.png', date: '2026-07-11', points: 100 }
    ]);

    const handleAction = (id, action) => {
        setReviews(reviews.filter(r => r.id !== id));
        if (action === 'approve') {
            toast.success("Submission successfully approved and points awarded.");
        } else {
            toast.warning("Submission successfully rejected.");
        }
    };

    if (tab === 'approve_csr' || tab === 'approve_challenge') {
        return (
            <GlassCard>
                <h3 className="text-xl font-bold text-white mb-2">Review Employee CSR Submissions</h3>
                <p className="text-xs text-[var(--text-muted)] mb-5">Audit submitted evidence and approve to dispatch XP rewards to employees.</p>
                {reviews.length === 0 ? (
                    <div className="p-8 text-center text-xs text-[var(--text-muted)]">No pending CSR submissions to review.</div>
                ) : (
                    <div className="space-y-4">
                        {reviews.map(r => (
                            <div key={r.id} className="p-4 bg-white/5 border border-white/10 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <h4 className="text-sm font-semibold text-white">{r.employee}</h4>
                                    <p className="text-xs text-slate-300 mt-0.5">{r.activity}</p>
                                    <div className="flex gap-4 mt-2">
                                        <span className="text-[10px] text-[var(--text-muted)]">Evidence: <span className="text-[var(--accent-teal)] underline cursor-pointer">{r.file}</span></span>
                                        <span className="text-[10px] text-[var(--accent-teal)] font-bold">Reward: +{r.points} XP</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleAction(r.id, 'approve')} className="p-1 px-3 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-lg flex items-center gap-1 transition">
                                        <Check className="w-3.5 h-3.5" /> Approve
                                    </button>
                                    <button onClick={() => handleAction(r.id, 'reject')} className="p-1 px-3 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 text-xs font-semibold rounded-lg flex items-center gap-1 transition">
                                        <X className="w-3.5 h-3.5" /> Reject
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </GlassCard>
        );
    }

    if (tab === 'dept_analytics') {
        return (
            <GlassCard>
                <h3 className="text-xl font-bold text-white mb-4">Department ESG Analytics</h3>
                <div className="space-y-4">
                    {[
                        { label: 'Weekly Active Users (WAU)', val: '88%', max: 100, color: 'var(--social)' },
                        { label: 'Challenge Completion Rate', val: '74%', max: 100, color: 'var(--env)' },
                        { label: 'Policy Acceptance Compliance', val: '92%', max: 100, color: 'var(--gov)' }
                    ].map((idx, i) => (
                        <div key={i}>
                            <div className="flex justify-between text-xs mb-1 text-slate-300">
                                <span>{idx.label}</span>
                                <span className="font-semibold text-white">{idx.val}</span>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-2">
                                <div className="h-2 rounded-full" style={{ width: idx.val, backgroundColor: idx.color }} />
                            </div>
                        </div>
                    ))}
                </div>
            </GlassCard>
        );
    }

    // Default Overview
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-2">🏢 Department Overview Dashboard</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Department score" value="73.2" sub="Manufacturing Division" icon={LineChart} color="var(--env)" gradient="from-emerald-400 to-emerald-700" />
                <StatCard title="Total Employees" value="150 Workers" sub="Core shifts active" icon={ClipboardList} color="var(--social)" gradient="from-purple-400 to-purple-700" />
                <StatCard title="Joined Challenges" value="23 Enrolled" sub="Zero Waste Week" icon={ClipboardList} color="var(--accent-amber)" gradient="from-amber-400 to-amber-700" />
                <StatCard title="CSR Activity Hours" value="120 Hrs" sub="This Quarter" icon={CheckSquare} color="var(--gov)" gradient="from-sky-400 to-sky-700" />
            </div>

            <GlassCard>
                <h4 className="font-semibold text-white mb-3">Pending Tasks & Approvals Queue</h4>
                <p className="text-xs text-[var(--text-muted)] mb-4">You have {reviews.length} employee activity evidence packets awaiting audit check.</p>
                <button onClick={() => toast.info("Redirecting to approvals layout...")} className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-lg transition">
                    Open Review Dashboard Actions
                </button>
            </GlassCard>
        </div>
    );
}
