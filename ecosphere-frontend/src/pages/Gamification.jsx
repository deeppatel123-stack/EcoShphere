import React, { useState } from 'react';
import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Gift, Zap, Plus, Target } from 'lucide-react';
import { PageHeader, GlassCard, StatCard, DataTable, StatusBadge, Badge, DifficultyBadge, ProgressBar } from '../components/ui/index.jsx';
import { dummyChallenges, dummyBadges, dummyRewards, dummyLeaderboard } from '../data/dummy/index.js';
import { useToast } from '../contexts/ToastContext.jsx';

const SUB_TABS = [
    { path: 'dashboard', label: 'Dashboard' },
    { path: 'challenges', label: 'Challenges' },
    { path: 'badges', label: 'Badges' },
    { path: 'rewards', label: 'Rewards' },
    { path: 'leaderboards', label: 'Leaderboards' },
];

const SubTabs = () => (
    <div className="flex gap-2 mb-6 flex-wrap">
        {SUB_TABS.map(t => (
            <NavLink key={t.path} to={t.path}
                className={({ isActive }) => `px-4 py-2 rounded-lg text-sm font-medium transition ${isActive
                    ? 'bg-[var(--gamify)]/20 text-[var(--gamify)] border border-[var(--gamify)]/30'
                    : 'text-[var(--text-muted)] bg-white/5 hover:bg-white/10 hover:text-white border border-transparent'}`}
            >{t.label}</NavLink>
        ))}
    </div>
);

const CHALLENGE_STATUSES = ['draft', 'active', 'under_review', 'completed', 'archived'];
const STATUS_COLORS = {
    draft: 'var(--text-muted)', active: 'var(--env)', under_review: 'var(--social)',
    completed: 'var(--gov)', archived: 'var(--accent-amber)'
};

function GameDashboard() {
    const activeCount = dummyChallenges.filter(c => c.status === 'active').length;
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                <StatCard title="Active Challenges" value={activeCount} sub="Accepting participants" icon={Target} color="var(--gamify)" gradient="from-orange-400 to-orange-700" />
                <StatCard title="Your XP" value="980" sub="Current balance" icon={Zap} color="var(--social)" gradient="from-purple-400 to-purple-700" />
                <StatCard title="Badges Earned" value="3" sub="Of 4 total" icon={Star} color="var(--accent-amber)" gradient="from-amber-400 to-amber-700" />
                <StatCard title="Points Balance" value="450" sub="Redeemable" icon={Gift} color="var(--env)" gradient="from-emerald-400 to-emerald-700" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <GlassCard>
                    <h3 className="font-semibold text-white mb-5">Challenge Lifecycle Status</h3>
                    <div className="flex items-center justify-between relative">
                        <div className="absolute h-1 bg-[var(--border-glass)] top-3 left-8 right-8 rounded-full" />
                        <div className="absolute h-1 bg-gradient-to-r from-[var(--gamify)] to-[var(--env)] top-3 left-8 w-[50%] rounded-full" />
                        {CHALLENGE_STATUSES.map((s, i) => (
                            <div key={s} className="flex flex-col items-center z-10">
                                <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold ${i <= 2 ? 'border-[var(--gamify)] bg-[var(--gamify)]/30 text-[var(--gamify)]' : 'border-[var(--border-glass)] bg-[var(--bg-secondary)] text-[var(--text-muted)]'
                                    }`}>{i + 1}</div>
                                <span className="text-[9px] text-[var(--text-muted)] mt-1.5 capitalize">{s.replace('_', ' ')}</span>
                            </div>
                        ))}
                    </div>
                </GlassCard>

                <GlassCard>
                    <h3 className="font-semibold text-white mb-4">Active Challenges</h3>
                    <div className="space-y-3">
                        {dummyChallenges.filter(c => c.status === 'active').map((ch, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                                <div className="w-9 h-9 rounded-lg bg-[var(--gamify)]/20 flex items-center justify-center text-lg">{i === 0 ? '🚴' : '♻️'}</div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-white truncate">{ch.title}</p>
                                    <p className="text-xs text-[var(--text-muted)]">Due: {ch.deadline}</p>
                                </div>
                                <span className="text-[var(--gamify)] font-bold text-sm">+{ch.xp} XP</span>
                            </div>
                        ))}
                    </div>
                </GlassCard>
            </div>
        </motion.div>
    );
}

function ChallengesPage() {
    const [filter, setFilter] = useState('all');
    const toast = useToast();
    const [joinedIds, setJoinedIds] = useState([]);

    const filtered = filter === 'all' ? dummyChallenges : dummyChallenges.filter(c => c.status === filter);

    const handleJoin = (ch) => {
        if (joinedIds.includes(ch._id)) return;
        setJoinedIds(prev => [...prev, ch._id]);
        toast.success(`You have successfully joined the "${ch.title}" challenge!`);
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex justify-between items-center mb-5">
                <div className="flex gap-2 flex-wrap">
                    {['all', ...CHALLENGE_STATUSES].map(s => (
                        <button key={s} onClick={() => setFilter(s)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition capitalize ${filter === s
                                ? 'bg-[var(--gamify)]/20 text-[var(--gamify)] border border-[var(--gamify)]/30'
                                : 'text-[var(--text-muted)] bg-white/5 hover:bg-white/10'}`}
                        >{s.replace('_', ' ')}</button>
                    ))}
                </div>
                <button className="flex items-center gap-2 px-4 py-2 text-sm bg-[var(--gamify)] hover:bg-orange-600 text-white rounded-lg font-medium transition">
                    <Plus className="w-4 h-4" /> New Challenge
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((ch, i) => (
                    <motion.div key={ch._id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                        <GlassCard className={`h-full border-l-4`} style={{ borderLeftColor: STATUS_COLORS[ch.status] }}>
                            <div className="flex justify-between items-start mb-3">
                                <h4 className="font-semibold text-white flex-1 mr-2">{ch.title}</h4>
                                <StatusBadge status={ch.status} />
                            </div>
                            <p className="text-xs text-[var(--text-muted)] mb-3 line-clamp-2">{ch.description}</p>
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                                <DifficultyBadge difficulty={ch.difficulty} />
                                <div className="flex items-center gap-1.5">
                                    {ch.evidenceRequired && <span className="text-[10px] bg-[var(--gov)]/20 text-[var(--gov)] px-2 py-0.5 rounded-full">Evidence Required</span>}
                                </div>
                                <span className="text-[var(--gamify)] font-bold text-sm ml-auto">⚡ {ch.xp} XP</span>
                            </div>
                            <p className="text-xs text-[var(--text-muted)] mt-3">Deadline: {ch.deadline}</p>
                            {ch.status === 'active' && (
                                <button
                                    onClick={() => handleJoin(ch)}
                                    disabled={joinedIds.includes(ch._id)}
                                    className={`mt-3 w-full py-2 rounded-lg text-sm font-medium border transition cursor-pointer flex items-center justify-center gap-1.5 ${joinedIds.includes(ch._id)
                                            ? 'bg-emerald-500/10 text-emerald-450 border-emerald-500/30'
                                            : 'bg-[var(--gamify)]/20 text-[var(--gamify)] border-[var(--gamify)]/30 hover:bg-[var(--gamify)]/30'
                                        }`}
                                >
                                    {joinedIds.includes(ch._id) ? '✓ Joined' : 'Join Challenge →'}
                                </button>
                            )}
                        </GlassCard>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

function BadgesPage() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3 className="font-semibold text-white mb-5">Badges & Achievements</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {dummyBadges.map((b, i) => {
                    const unlocked = i < 3; // first 3 unlocked for demo
                    return (
                        <GlassCard key={i} className={`text-center ${!unlocked ? 'opacity-50' : ''}`}>
                            <motion.div
                                animate={unlocked ? { scale: [1, 1.1, 1] } : {}}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                                className={`text-5xl mb-3 mx-auto w-16 h-16 flex items-center justify-center rounded-full ${unlocked ? 'bg-[var(--accent-amber)]/20 ring-2 ring-[var(--accent-amber)]/50' : 'bg-white/5'
                                    }`}
                            >
                                {b.icon}
                            </motion.div>
                            <h4 className="font-semibold text-white mb-1">{b.name}</h4>
                            <p className="text-xs text-[var(--text-muted)] mb-2">{b.description}</p>
                            <div className="text-[10px] bg-white/10 rounded-full px-2 py-1 text-[var(--text-muted)]">
                                {b.unlockRule.type.replace('_', ' ')}: {b.unlockRule.value}
                            </div>
                            {unlocked && <div className="mt-2 text-xs text-[var(--accent-amber)] font-bold">✨ Unlocked</div>}
                        </GlassCard>
                    );
                })}
            </div>
        </motion.div>
    );
}

function RewardsPage() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex justify-between items-center mb-5">
                <h3 className="font-semibold text-white">Reward Catalog</h3>
                <div className="flex items-center gap-2 bg-[var(--social)]/20 border border-[var(--social)]/30 text-[var(--social)] px-4 py-2 rounded-full text-sm font-bold">
                    ⚡ Your Points: 450
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {dummyRewards.map((r, i) => {
                    const canRedeem = 450 >= r.pointsRequired && r.stock > 0;
                    return (
                        <GlassCard key={i} className={`flex flex-col ${r.stock === 0 ? 'opacity-60' : ''}`}>
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--gamify)] to-amber-700 flex items-center justify-center text-2xl mb-4">
                                {i === 0 ? '🌴' : i === 1 ? '🎁' : i === 2 ? '♻️' : '📚'}
                            </div>
                            <h4 className="font-semibold text-white mb-1">{r.name}</h4>
                            <p className="text-xs text-[var(--text-muted)] mb-3 flex-1">{r.description}</p>
                            <div className="flex items-center justify-between mt-auto">
                                <span className="text-[var(--gamify)] font-bold">{r.pointsRequired} pts</span>
                                <span className="text-xs text-[var(--text-muted)]">Stock: {r.stock}</span>
                            </div>
                            <button
                                disabled={!canRedeem}
                                className={`mt-3 w-full py-2 rounded-lg text-sm font-medium transition ${canRedeem
                                    ? 'bg-[var(--gamify)]/20 text-[var(--gamify)] border border-[var(--gamify)]/30 hover:bg-[var(--gamify)]/30'
                                    : 'bg-white/5 text-[var(--text-muted)] cursor-not-allowed'
                                    }`}
                            >
                                {r.stock === 0 ? 'Out of Stock' : canRedeem ? 'Redeem →' : 'Not Enough Points'}
                            </button>
                        </GlassCard>
                    );
                })}
            </div>
        </motion.div>
    );
}

function Leaderboards() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3 className="font-semibold text-white mb-5">🏆 ESG Leaderboard</h3>
            <GlassCard>
                {/* Top 3 podium */}
                <div className="flex justify-center gap-4 mb-8">
                    {[dummyLeaderboard[1], dummyLeaderboard[0], dummyLeaderboard[2]].map((p, order) => {
                        const heights = ['h-24', 'h-32', 'h-20'];
                        const pos = [2, 1, 3];
                        const golds = ['bg-gray-400', 'bg-gradient-to-b from-yellow-400 to-amber-700', 'bg-gradient-to-b from-amber-700 to-amber-900'];
                        return (
                            <motion.div key={p.rank} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: order * 0.15 }}
                                className="flex flex-col items-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-[var(--bg-secondary)] border-2 border-[var(--border-glass)] flex items-center justify-center font-bold text-white text-sm">
                                    {p.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <p className="text-xs text-white font-medium text-center">{p.name.split(' ')[0]}</p>
                                <p className="text-[10px] text-[var(--gamify)] font-bold">{p.xp} XP</p>
                                <div className={`w-20 ${heights[order]} ${golds[order]} rounded-t-lg flex items-start justify-center pt-2`}>
                                    <span className="text-2xl font-black text-white">{pos[order]}</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Full table */}
                <div className="space-y-2">
                    {dummyLeaderboard.map((p, i) => (
                        <motion.div key={i} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.08 }}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition">
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${i === 0 ? 'bg-yellow-500 text-black' : i === 1 ? 'bg-gray-400 text-black' : i === 2 ? 'bg-amber-700 text-white' : 'bg-white/10 text-[var(--text-muted)]'
                                }`}>{p.rank}</span>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-white">{p.name}</p>
                                <p className="text-xs text-[var(--text-muted)]">{p.department}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right hidden md:block">
                                    <p className="text-xs text-[var(--text-muted)]">{p.completedChallenges} challenges</p>
                                </div>
                                <p className="text-[var(--gamify)] font-bold">{p.xp} XP</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </GlassCard>
        </motion.div>
    );
}

export default function Gamification() {
    return (
        <div className="pb-20 mt-4">
            <PageHeader title="Gamification Hub" subtitle="Challenges, XP, badges, rewards and leaderboards"
                action={<span className="px-3 py-1 text-xs bg-[var(--gamify)]/20 text-[var(--gamify)] border border-[var(--gamify)]/30 rounded-full font-medium">🎮 Gamification</span>} />
            <SubTabs />
            <Routes>
                <Route path="dashboard" element={<GameDashboard />} />
                <Route path="challenges" element={<ChallengesPage />} />
                <Route path="badges" element={<BadgesPage />} />
                <Route path="rewards" element={<RewardsPage />} />
                <Route path="leaderboards" element={<Leaderboards />} />
                <Route path="*" element={<Navigate to="dashboard" replace />} />
            </Routes>
        </div>
    );
}
