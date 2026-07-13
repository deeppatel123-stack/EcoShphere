import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, FileText, ChevronRight, BrainCircuit, Leaf, Shield, UserRoundCheck } from 'lucide-react';
import { StatCard, GlassCard, DataTable, StatusBadge } from '../ui/index.jsx';

export default function ExecutiveView({ tab }) {
    const [prompt, setPrompt] = useState('');
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);

    const getAiSummary = (e) => {
        e.preventDefault();
        if (!prompt) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSummary(`EcoSphere AI Executive Report: Based on your analysis request "${prompt}", here is the high-level summarization. 
The environmental score is stable at 86%, while the IT department currently leads the organization by 95% total score. 
However, wastewater levels in Manufacturing are flagged as a critical compliance risk factor (Risk Index: 4). 
Action items include accelerating ESG onboarding initiatives to improve employees' weekly engagement (currently 74%).`);
        }, 1500);
    };

    if (tab === 'ai_executive_summary') {
        return (
            <GlassCard className="border border-[var(--accent-emerald)]/30">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 text-[var(--accent-emerald)] flex items-center justify-center rounded-xl">
                        <BrainCircuit className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">AI Executive Summarizer</h3>
                        <p className="text-xs text-[var(--text-muted)]">Describe what trends or parameters you wish to distill</p>
                    </div>
                </div>

                <form onSubmit={getAiSummary} className="space-y-4">
                    <textarea
                        value={prompt}
                        onChange={e => setPrompt(e.target.value)}
                        placeholder="e.g. Summarize compliance failures and provide an efficiency roadmap for manufacturing department emissions."
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-[var(--accent-emerald)] transition"
                        required
                    />
                    <button type="submit" className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:opacity-90 text-white text-xs font-bold rounded-xl transition flex items-center gap-2">
                        <Sparkles className="w-4 h-4" /> {loading ? "Distilling data..." : "Generate AI Summary"}
                    </button>
                </form>

                {summary && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 bg-white/5 border border-white/10 p-5 rounded-xl text-xs text-gray-200 leading-relaxed font-mono">
                        {summary}
                    </motion.div>
                )}
            </GlassCard>
        );
    }

    // Default Overview
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-2">📊 Executive Decision Board</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Company Score" value="82.4%" sub="Weighted average" icon={Shield} color="var(--accent-amber)" gradient="from-amber-400 to-amber-700" />
                <StatCard title="Carbon Footprint" value="11,500 kg" sub="Total carbon emissions" icon={Leaf} color="var(--env)" gradient="from-emerald-400 to-emerald-700" />
                <StatCard title="Risk Index Score" value="Low Risk" sub="Compliance status" icon={Shield} color="var(--gov)" gradient="from-sky-400 to-sky-700" />
                <StatCard title="Avg Engagement" value="64%" sub="Monthly active users" icon={UserRoundCheck} color="var(--social)" gradient="from-purple-400 to-purple-700" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <GlassCard>
                    <h4 className="font-semibold text-white mb-4">Top Performing Divisions</h4>
                    <div className="space-y-4">
                        {[
                            { name: 'HR & People Operations', score: 90.2, color: 'text-violet-400' },
                            { name: 'IT Infrastructure & Digital', score: 87.4, color: 'text-blue-400' },
                            { name: 'Corporate Executive Offices', score: 84.8, color: 'text-emerald-400' }
                        ].map((d, i) => (
                            <div key={i} className="flex justify-between items-center border-b border-white/5 pb-2 text-sm text-white">
                                <span>{d.name}</span>
                                <span className={`font-bold ${d.color}`}>{d.score}%</span>
                            </div>
                        ))}
                    </div>
                </GlassCard>

                <GlassCard>
                    <h4 className="font-semibold text-white mb-4">Action Items & Bottlenecks</h4>
                    <div className="space-y-4">
                        {[
                            { name: 'Manufacturing Sector emissions', issue: '8% higher emissions than baseline projection', action: 'Schedule review' },
                            { name: 'Policy ACK rate', issue: 'Awaiting acknowledgment by 12 workers in Mfg', action: 'Send nudge email' }
                        ].map((b, i) => (
                            <div key={i} className="p-3 bg-white/5 border border-white/10 rounded-xl text-xs">
                                <p className="font-bold text-white mb-1">{b.name}</p>
                                <p className="text-[var(--text-muted)] mb-2">{b.issue}</p>
                                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-bold uppercase text-[10px]">{b.action}</span>
                            </div>
                        ))}
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}
