import React, { useState } from 'react';
import { Trophy, Gift, Award, Plus, Upload, CheckSquare, Sparkles, CheckCircle2 } from 'lucide-react';
import { StatCard, GlassCard, DataTable, StatusBadge } from '../ui/index.jsx';
import { dummyChallenges, dummyLeaderboard, dummyRewards } from '../../data/dummy/index.js';
import { useToast } from '../../contexts/ToastContext.jsx';

export default function EmployeeView({ tab }) {
    const toast = useToast();
    const [myXp, setMyXp] = useState(480);
    const [rewards, setRewards] = useState(dummyRewards);
    const [selectedChallenge, setSelectedChallenge] = useState(null);
    const [proof, setProof] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const handleRedeem = (id, points) => {
        if (myXp < points) return toast.error("Not enough XP to claim this reward!");
        setMyXp(myXp - points);
        setRewards(rewards.map(r => r._id === id ? { ...r, stock: r.stock - 1 } : r));
        toast.success("Reward redeemed successfully! Check your email.");
    };

    if (tab === 'join_challenge') {
        return (
            <GlassCard>
                <h3 className="text-xl font-bold text-white mb-4">🏆 Active Gamification Challenges</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {dummyChallenges.map(c => (
                        <div key={c._id} className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-semibold text-white">{c.title}</h4>
                                    <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">+{c.xp} XP</span>
                                </div>
                                <p className="text-xs text-[var(--text-muted)]">{c.description}</p>
                            </div>
                            <button className="mt-4 w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold transition">
                                Launch Challenge
                            </button>
                        </div>
                    ))}
                </div>
            </GlassCard>
        );
    }

    if (tab === 'join_csr') {
        return (
            <GlassCard>
                <h3 className="text-xl font-semibold text-white mb-4">🌱 Social CSR Initiatives</h3>
                <div className="space-y-3">
                    {[
                        { title: 'Tree Plantation Drive', dept: 'Corporate Office', Date: 'July 25', pts: 100 },
                        { title: 'Community Beach Cleanup', dept: 'HR & People', Date: 'August 1', pts: 80 },
                        { title: 'Blood Donation Camp Campaign', dept: 'Manufacturing Sector A', Date: 'August 22', pts: 150 }
                    ].map((c, i) => (
                        <div key={i} className="flex justify-between items-center bg-white/5 border border-white/10 p-4 rounded-xl">
                            <div>
                                <h4 className="text-white font-semibold">{c.title}</h4>
                                <p className="text-xs text-[var(--text-muted)] mt-1">Department: {c.dept} | Date: {c.Date}</p>
                            </div>
                            <button className="px-3 py-1.5 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-xs font-bold transition">
                                Register Participation (+{c.pts} pts)
                            </button>
                        </div>
                    ))}
                </div>
            </GlassCard>
        );
    }

    if (tab === 'upload_proof') {
        const fileChange = (e) => {
            if (e.target.files && e.target.files[0]) {
                setProof(e.target.files[0].name);
            }
        };

        const submitProof = (e) => {
            e.preventDefault();
            if (!proof) return;
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
                setProof(null);
                toast.success("Activity proof successfully submitted to your Department Head for approval!");
            }, 1500);
        };

        return (
            <GlassCard>
                <h3 className="text-xl font-bold text-white mb-2">Upload CSR Proof & Evidence</h3>
                <p className="text-xs text-[var(--text-muted)] mb-5">Submit image or log documents of your sustainable activities to claim XP rewards.</p>
                <form onSubmit={submitProof} className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-[var(--text-muted)] block mb-1">Select Activity</label>
                        <select className="w-full bg-[var(--bg-secondary)] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none">
                            <option value="env_ride">Cycle to Work Commute log</option>
                            <option value="csr_trees">Participation: Tree Plantation</option>
                            <option value="recycle_desks">Desks Recycling Drive Proof</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-[var(--text-muted)] block mb-1">Choose Evidence File (PDF, PNG, JPG)</label>
                        <input
                            type="file"
                            onChange={fileChange}
                            className="w-full text-xs text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-500/10 file:text-emerald-400 hover:file:bg-[var(--accent-emerald)]/20"
                            required
                        />
                    </div>
                    {proof && <p className="text-xs text-emerald-400 font-medium">Selected file: {proof}</p>}
                    <button type="submit" className="w-full py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:opacity-90 transition text-white font-bold text-sm rounded-xl">
                        {submitted ? "Uploading proof..." : "Upload & Claim Points"}
                    </button>
                </form>
            </GlassCard>
        );
    }

    if (tab === 'accept_policies') {
        return (
            <GlassCard>
                <h3 className="text-xl font-bold text-white mb-2">Platform Policies & Code of Conduct</h3>
                <p className="text-xs text-[var(--text-muted)] mb-5">Ensure you acknowledge the latest ESG compliance documents below.</p>
                <div className="space-y-3">
                    {[
                        { title: 'EcoSphere Code of Conduct v1.4', status: 'acknowledged' },
                        { title: 'Wastewater Handling Action Plans v2.1', status: 'pending' },
                        { title: 'Global Carbon Reporting Guidelines v1.0', status: 'acknowledged' }
                    ].map((p, i) => (
                        <div key={i} className="flex justify-between items-center bg-white/5 border border-white/10 p-4 rounded-xl">
                            <span className="text-sm font-medium text-white">{p.title}</span>
                            {p.status === 'acknowledged' ? (
                                <span className="text-xs bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-lg font-bold">✓ Signed</span>
                            ) : (
                                <button onClick={() => toast.success("Policy acknowledged in system!")} className="text-xs bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/30 px-3 py-1 rounded-lg font-semibold transition">
                                    Sign Policy Acknowledgment
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </GlassCard>
        );
    }

    if (tab === 'redeem_rewards') {
        return (
            <GlassCard>
                <div className="flex justify-between items-center mb-5">
                    <div>
                        <h3 className="text-xl font-bold text-white">🎁 Rewards Store</h3>
                        <p className="text-xs text-[var(--text-muted)] mt-0.5">Use your current corporate ESG XP points to buy vouchers and offdays.</p>
                    </div>
                    <div className="bg-purple-500/10 border border-purple-500/20 text-purple-400 px-3 py-1.5 rounded-xl text-sm font-bold">
                        My Points: {myXp} XP
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {rewards.map(r => (
                        <div key={r._id} className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
                            <div>
                                <h4 className="font-semibold text-white text-sm">{r.name}</h4>
                                <p className="text-xs text-[var(--text-muted)] mt-1">{r.description}</p>
                                <p className="text-[10px] text-amber-400 mt-2 font-bold uppercase">Stock Left: {r.stock} units</p>
                            </div>
                            <button
                                onClick={() => handleRedeem(r._id, r.pointsRequired)}
                                disabled={r.stock === 0 || myXp < r.pointsRequired}
                                className="mt-4 w-full py-2 bg-purple-500 hover:bg-purple-600 disabled:opacity-40 disabled:hover:bg-purple-500 text-white rounded-lg text-xs font-bold transition"
                            >
                                Redeem for {r.pointsRequired} XP
                            </button>
                        </div>
                    ))}
                </div>
            </GlassCard>
        );
    }

    // Default overview
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-2">🏆 Employee Engagement Center</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="My Score" value="98%" sub="High sustainability" icon={Sparkles} color="var(--env)" gradient="from-emerald-400 to-emerald-700" />
                <StatCard title="My XP Points" value={`${myXp} XP`} sub="Top 10 ranking" icon={Trophy} color="var(--social)" gradient="from-purple-400 to-purple-700" />
                <StatCard title="My Badges" value="4 Badges" sub="Green Medalist" icon={Award} color="var(--accent-amber)" gradient="from-amber-400 to-amber-700" />
                <StatCard title="CSR Contributions" value="3 Completed" sub="Tree planting drive" icon={Gift} color="var(--gov)" gradient="from-sky-400 to-sky-700" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <GlassCard>
                        <h4 className="font-semibold text-white mb-4">Employee Leaderboard Top Rankings</h4>
                        <DataTable
                            columns={[
                                { header: 'Rank', accessor: 'rank' },
                                { header: 'Name', cell: l => <span className="font-semibold text-white">{l.name}</span> },
                                { header: 'Department', accessor: 'department' },
                                { header: 'XP Score', cell: l => <span className="text-[var(--social)] font-bold">{l.xp} XP</span> }
                            ]}
                            data={dummyLeaderboard}
                        />
                    </GlassCard>
                </div>

                <GlassCard>
                    <h4 className="font-semibold text-white mb-4">My Badges Collection</h4>
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { name: 'Carbon Hero', emoji: '🌱' },
                            { name: 'Green Champ', emoji: '🏆' },
                            { name: 'CSR Specialist', emoji: '⭐' },
                            { name: 'Vanguard', emoji: '🚀' }
                        ].map((b, i) => (
                            <div key={i} className="p-3 bg-white/5 border border-white/10 rounded-xl text-center">
                                <span className="text-3xl block mb-1">{b.emoji}</span>
                                <span className="text-xs font-semibold text-white">{b.name}</span>
                            </div>
                        ))}
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}
