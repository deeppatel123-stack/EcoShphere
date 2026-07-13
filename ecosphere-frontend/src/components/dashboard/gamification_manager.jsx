import React, { useState } from 'react';
import { Trophy, Gift, Award, Coins, Medal, Plus, Trash2 } from 'lucide-react';
import { StatCard, GlassCard, DataTable, StatusBadge } from '../ui/index.jsx';

export default function GamificationManagerView({ tab }) {
    const [challenges, setChallenges] = useState([
        { id: 1, title: 'Cycle to Work Week', category: 'challenge', xp: 200, evidence: 'Required', status: 'active' },
        { id: 2, title: 'Zero Waste Workstation', category: 'challenge', xp: 150, evidence: 'None', status: 'active' }
    ]);
    const [newCh, setNewCh] = useState({ title: '', xp: 100, evidence: 'Required' });

    const addChallenge = (e) => {
        e.preventDefault();
        setChallenges([...challenges, { ...newCh, id: Date.now(), category: 'challenge', status: 'draft' }]);
        setNewCh({ title: '', xp: 100, evidence: 'Required' });
    };

    if (tab === 'manage_challenges') {
        return (
            <GlassCard>
                <h3 className="text-xl font-bold text-white mb-4">Manage Leaderboard Challenges</h3>
                <form onSubmit={addChallenge} className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-white/5 p-4 rounded-xl border border-white/10 mb-5">
                    <input type="text" placeholder="Challenge Scenario" value={newCh.title} onChange={e => setNewCh({ ...newCh, title: e.target.value })} required className="bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-xs text-white" />
                    <input type="number" placeholder="XP Points Reward" value={newCh.xp} onChange={e => setNewCh({ ...newCh, xp: Number(e.target.value) })} required className="bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-xs text-white" />
                    <select value={newCh.evidence} onChange={e => setNewCh({ ...newCh, evidence: e.target.value })} className="bg-[var(--bg-secondary)] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none">
                        <option value="Required">Evidence Required</option>
                        <option value="None">No Evidence Required</option>
                    </select>
                    <button type="submit" className="bg-[var(--accent-emerald)] text-white text-xs font-bold rounded-lg hover:bg-emerald-600 transition flex items-center justify-center gap-1">
                        <Plus className="w-4 h-4" /> Create Challenge
                    </button>
                </form>
                <DataTable
                    columns={[
                        { header: 'Challenge', accessor: 'title' },
                        { header: 'XP Reward', cell: c => <span className="text-[var(--accent-teal)] font-bold">+{c.xp} XP</span> },
                        { header: 'Verification Log', accessor: 'evidence' },
                        { header: 'Status', cell: c => <StatusBadge status={c.status} /> }
                    ]}
                    data={challenges}
                />
            </GlassCard>
        );
    }

    if (tab === 'manage_rewards') {
        return (
            <GlassCard>
                <h3 className="text-xl font-bold text-white mb-4">Manage Redeemable Corporate Rewards</h3>
                <DataTable
                    columns={[
                        { header: 'Reward Package Name', accessor: 'name' },
                        { header: 'XP Required', cell: r => <span className="font-bold text-yellow-400">{r.cost} XP</span> },
                        { header: 'Active Stock', accessor: 'stock' }
                    ]}
                    data={[
                        { name: 'Extra Single Day Off Leave', cost: 1000, stock: '10 Vouchers' },
                        { name: 'Amazon Gift Card ₹500', cost: 500, stock: '50 Vouchers' },
                        { name: 'Sustainability Branded kit', cost: 200, stock: '94 Vouchers' }
                    ]}
                />
            </GlassCard>
        );
    }

    if (tab === 'mana_badges' || tab === 'manage_badges') {
        return (
            <GlassCard>
                <h3 className="text-xl font-bold text-white mb-4">Manage System Badges</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { title: 'Carbon Hero', req: 'Earn standard 500 XP', emoji: '🌱' },
                        { title: 'Green Champion', req: 'Acknowledge 5 audits', emoji: '🏆' },
                        { title: 'CSR Specialist Star', req: 'Join 3 community events', emoji: '⭐' }
                    ].map((b, i) => (
                        <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-xl text-center">
                            <span className="text-4xl block mb-2">{b.emoji}</span>
                            <h4 className="font-bold text-white mb-1">{b.title}</h4>
                            <p className="text-[10px] text-[var(--text-muted)]">{b.req}</p>
                        </div>
                    ))}
                </div>
            </GlassCard>
        );
    }

    if (tab === 'xp_rules') {
        return (
            <GlassCard>
                <h3 className="text-xl font-bold text-white mb-4">Set Point Allocation Rules</h3>
                <div className="space-y-3">
                    {[
                        { label: 'Registering community CSR drive participation', pts: 50 },
                        { label: 'Accepted revised compliance security policy', pts: 20 },
                        { label: 'Submit validated carbon offset ledger proof', pts: 100 }
                    ].map((r, i) => (
                        <div key={i} className="flex justify-between items-center bg-white/5 border border-white/10 p-3 rounded-xl">
                            <span className="text-xs text-white font-medium">{r.label}</span>
                            <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded font-bold">+{r.pts} XP</span>
                        </div>
                    ))}
                </div>
            </GlassCard>
        );
    }

    // Default Overview
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-2">🎮 Gamification Dashboard Center</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Active Challenges" value="4 Challenges" sub="2 completed this week" icon={Trophy} color="var(--social)" gradient="from-purple-400 to-purple-700" />
                <StatCard title="Total XP Distributed" value="12,450 XP" sub="All time employees sum" icon={Coins} color="var(--env)" gradient="from-emerald-400 to-emerald-700" />
                <StatCard title="Badges Unlocked" value="98 Badges" sub="Pioneers tier leads" icon={Award} color="var(--accent-amber)" gradient="from-amber-400 to-amber-700" />
                <StatCard title="Rewards Redeemed" value="14 Vouchers" sub="Day off leads" icon={Medal} color="var(--gov)" gradient="from-sky-400 to-sky-700" />
            </div>

            <GlassCard>
                <h4 className="font-semibold text-white mb-3">Top XP Earner Departments</h4>
                <div className="space-y-2">
                    {[
                        { name: 'Corporate Head Office', points: 3400 },
                        { name: 'IT Infrastructure & Digital', points: 2800 },
                        { name: 'Customer Success & Support', points: 1980 }
                    ].map((d, i) => (
                        <div key={i} className="flex justify-between items-center text-xs p-3 rounded-lg bg-white/5 border border-white/10 text-white">
                            <span>#{i + 1} {d.name}</span>
                            <span className="font-bold text-[var(--social)]">+{d.points} XP Total</span>
                        </div>
                    ))}
                </div>
            </GlassCard>
        </div>
    );
}
