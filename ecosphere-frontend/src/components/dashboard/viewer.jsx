import React from 'react';
import { LayoutDashboard, FileText, LineChart, Shield, Leaf } from 'lucide-react';
import { StatCard, GlassCard, DataTable } from '../ui/index.jsx';

export default function ViewerView({ tab }) {
    if (tab === 'viewer_analytics') {
        return (
            <GlassCard>
                <h3 className="text-xl font-bold text-white mb-4">Viewer Performance Analytics</h3>
                <div className="space-y-4">
                    {[
                        { title: 'Carbon Offset projection rate', val: 'On track with +4.5% YoY' },
                        { title: 'Social CSR attendance quota', val: 'Exceeded target by 14%' },
                        { title: 'Quarterly compliance checks audit status', val: 'Completed with zero penalties' }
                    ].map((a, i) => (
                        <div key={i} className="p-3 bg-white/5 border border-white/10 rounded-xl text-xs text-white">
                            <span className="font-semibold block">{a.title}</span>
                            <span className="text-[var(--accent-teal)] mt-1 block">{a.val}</span>
                        </div>
                    ))}
                </div>
            </GlassCard>
        );
    }

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-2">👀 Read-Only Auditor View</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Company Score" value="82.4%" sub="Weighted index score" icon={Shield} color="var(--accent-amber)" gradient="from-amber-400 to-amber-700 font-semibold" />
                <StatCard title="Environmental" value="86%" sub="CO2 Trackers Active" icon={Leaf} color="var(--env)" gradient="from-emerald-400 to-emerald-700" />
                <StatCard title="Engagement Status" value="74%" sub="Monthly active users" icon={FileText} color="var(--social)" gradient="from-purple-400 to-purple-700" />
                <StatCard title="Audit Health" value="Healthy" sub="Scheduled checkpoints" icon={Shield} color="var(--gov)" gradient="from-sky-400 to-sky-700" />
            </div>

            <GlassCard>
                <h4 className="font-semibold text-white mb-3">Enterprise Dashboard Notice</h4>
                <p className="text-xs text-[var(--text-muted)]">You are logged in with a read-only viewer profile. If you require registration actions or approvals edit permissions, please submit an elevation ticket to the Super Admin.</p>
            </GlassCard>
        </div>
    );
}
