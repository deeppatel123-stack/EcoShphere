import React, { useState } from 'react';
import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Download, Filter, BarChart2, Plus } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LineChart, Line, CartesianGrid } from 'recharts';
import { PageHeader, GlassCard, StatCard } from '../components/ui/index.jsx';
import {
    dummyDeptScores,
    dummyCarbonTransactions,
    dummyGoals,
    dummyCsrActivities,
    dummyLeaderboard,
    dummyAudits,
    dummyComplianceIssues,
    dummyPolicies
} from '../data/dummy/index.js';

const SUB_TABS = [
    { path: 'esg-summary', label: 'ESG Summary' },
    { path: 'environmental', label: 'Environmental' },
    { path: 'social', label: 'Social' },
    { path: 'governance', label: 'Governance' },
    { path: 'analytics', label: 'Analytics' },
    { path: 'builder', label: 'Report Builder' },
];

const SubTabs = () => (
    <div className="flex gap-2 mb-6 flex-wrap">
        {SUB_TABS.map(t => (
            <NavLink key={t.path} to={t.path}
                className={({ isActive }) => `px-4 py-2 rounded-lg text-sm font-medium transition ${isActive
                    ? 'bg-white/20 text-white border border-white/30'
                    : 'text-[var(--text-muted)] bg-white/5 hover:bg-white/10 hover:text-white border border-transparent'}`}
            >{t.label}</NavLink>
        ))}
    </div>
);

const COLORS = ['var(--env)', 'var(--social)', 'var(--gov)', 'var(--accent-amber)', 'var(--gamify)'];

function EsgSummary() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="grid grid-cols-3 gap-5 mb-4">
                <StatCard title="Environmental Avg" value="82/100" icon={null} color="var(--env)" gradient="from-emerald-400 to-emerald-700" />
                <StatCard title="Social Avg" value="77/100" icon={null} color="var(--social)" gradient="from-purple-400 to-purple-700" />
                <StatCard title="Governance Avg" value="86/100" icon={null} color="var(--gov)" gradient="from-sky-400 to-sky-700" />
            </div>

            <GlassCard>
                <div className="flex justify-between items-center mb-5">
                    <h3 className="font-semibold text-white">Department ESG Scores (All Pillars)</h3>
                    <button onClick={() => window.print()} className="no-print flex items-center gap-2 px-3 py-2 text-xs bg-white/10 hover:bg-white/20 text-white rounded-lg transition">
                        <Download className="w-3.5 h-3.5" /> Export PDF
                    </button>
                </div>
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-[var(--border-glass)]">
                                {['Department', 'Environmental', 'Social', 'Governance', 'Total Score'].map((h, i) => (
                                    <th key={i} className="text-left text-[var(--text-muted)] text-xs uppercase tracking-wider px-4 py-3">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {dummyDeptScores.map((d, i) => (
                                <motion.tr key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                                    className="border-b border-[var(--border-glass)]/50 hover:bg-white/5">
                                    <td className="px-4 py-3 font-medium text-white">{d.department}</td>
                                    <td className="px-4 py-3"><span className="text-[var(--env)] font-bold">{d.environmentalScore}</span></td>
                                    <td className="px-4 py-3"><span className="text-[var(--social)] font-bold">{d.socialScore}</span></td>
                                    <td className="px-4 py-3"><span className="text-[var(--gov)] font-bold">{d.governanceScore}</span></td>
                                    <td className="px-4 py-3">
                                        <span className={`font-bold ${d.totalScore >= 85 ? 'text-[var(--env)]' : d.totalScore >= 70 ? 'text-[var(--accent-amber)]' : 'text-red-400'}`}>
                                            {d.totalScore.toFixed(1)}
                                        </span>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </GlassCard>

            <GlassCard>
                <h3 className="font-semibold text-white mb-5">ESG Pillars Comparison by Department</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dummyDeptScores} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                        <XAxis dataKey="department" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                        <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} domain={[0, 100]} />
                        <CartesianGrid strokeDasharray="4 4" stroke="var(--border-glass)" vertical={false} />
                        <Tooltip contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-glass)', borderRadius: '12px' }} />
                        <Bar dataKey="environmentalScore" name="Environmental" fill="var(--env)" radius={[4, 4, 0, 0]} fillOpacity={0.8} />
                        <Bar dataKey="socialScore" name="Social" fill="var(--social)" radius={[4, 4, 0, 0]} fillOpacity={0.8} />
                        <Bar dataKey="governanceScore" name="Governance" fill="var(--gov)" radius={[4, 4, 0, 0]} fillOpacity={0.8} />
                    </BarChart>
                </ResponsiveContainer>
            </GlassCard>
        </motion.div>
    );
}

function EnvironmentalReport() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-4">
                <StatCard title="Carbon Footprint" value="11,881 tCO2e" sub="Total tracked emissions" icon={null} color="var(--env)" gradient="from-red-400 to-red-700" />
                <StatCard title="Carbon Goals" value="8,200 tCO2e" sub="Current target (On Track)" icon={null} color="var(--env)" gradient="from-emerald-400 to-emerald-700" />
                <StatCard title="Renewable Energy Share" value="100%" sub="IT & Digital Operations" icon={null} color="var(--env)" gradient="from-blue-400 to-blue-700" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <GlassCard>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-white">Carbon Footprint Transactions</h3>
                        <button onClick={() => window.print()} className="no-print flex items-center gap-2 px-3 py-1.5 text-xs bg-white/10 hover:bg-white/20 text-white rounded-lg transition">
                            <Download className="w-3 h-3" /> Export PDF
                        </button>
                    </div>
                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-[var(--border-glass)]">
                                    <th className="text-left text-[var(--text-muted)] text-xs uppercase px-4 py-2">Department</th>
                                    <th className="text-left text-[var(--text-muted)] text-xs uppercase px-4 py-2">Factor Category</th>
                                    <th className="text-left text-[var(--text-muted)] text-xs uppercase px-4 py-2">Quantity</th>
                                    <th className="text-left text-[var(--text-muted)] text-xs uppercase px-4 py-2">Emissions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dummyCarbonTransactions.map((t, i) => (
                                    <tr key={i} className="border-b border-[var(--border-glass)]/50 hover:bg-white/5">
                                        <td className="px-4 py-2.5 font-medium text-white">{t.department}</td>
                                        <td className="px-4 py-2.5 text-slate-300 text-xs">{t.emissionFactor}</td>
                                        <td className="px-4 py-2.5 text-slate-300 text-xs">{t.quantity}</td>
                                        <td className="px-4 py-2.5 text-[var(--env)] font-bold">{t.calculatedEmission} kg CO2e</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </GlassCard>

                <GlassCard>
                    <h3 className="font-semibold text-white mb-4">Active Environmental Goals</h3>
                    <div className="space-y-4">
                        {dummyGoals.map((g, i) => {
                            const pct = Math.min(100, Math.round((g.currentValue / g.targetValue) * 100));
                            return (
                                <div key={i} className="p-3 bg-white/5 border border-white/10 rounded-xl">
                                    <div className="flex justify-between items-center text-xs mb-1.5">
                                        <span className="font-bold text-white">{g.title}</span>
                                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold 
                                            ${g.status === 'achieved' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                                                g.status === 'on_track' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                                                    'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>
                                            {g.status.replace('_', ' ')}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                                        <span>Current: {g.currentValue} {g.unit}</span>
                                        <span>Target: {g.targetValue} {g.unit}</span>
                                    </div>
                                    <div className="w-full bg-white/10 rounded-full h-1.5">
                                        <div className="bg-[var(--env)] h-1.5 rounded-full" style={{ width: `${pct}%` }}></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </GlassCard>
            </div>

            <GlassCard>
                <h3 className="font-semibold text-white mb-5">Carbon Footprint Distribution by Department</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dummyCarbonTransactions} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                        <XAxis dataKey="department" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                        <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                        <CartesianGrid strokeDasharray="4 4" stroke="var(--border-glass)" vertical={false} />
                        <Tooltip contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-glass)', borderRadius: '12px' }} />
                        <Bar dataKey="calculatedEmission" name="Carbon Emissions (kg CO2e)" fill="var(--accent-rose)" radius={[4, 4, 0, 0]} fillOpacity={0.85} />
                    </BarChart>
                </ResponsiveContainer>
            </GlassCard>
        </motion.div>
    );
}

function SocialReport() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-4">
                <StatCard title="Total CSR Drive Participants" value="180 Members" sub="Across all divisions" icon={null} color="var(--social)" gradient="from-purple-400 to-purple-700" />
                <StatCard title="CSR Success Hours" value="384 Hours" sub="Community volunteering logs" icon={null} color="var(--social)" gradient="from-amber-400 to-amber-700" />
                <StatCard title="Active CSR Activities" value="3 Campaigns" sub="Organized this quarter" icon={null} color="var(--social)" gradient="from-indigo-400 to-indigo-700" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <GlassCard>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-white">Platform Activity Leaderboard</h3>
                        <span className="text-[10px] uppercase font-bold text-[var(--accent-teal)]">Updated Hourly</span>
                    </div>
                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-[var(--border-glass)]">
                                    <th className="text-left text-[var(--text-muted)] text-xs uppercase px-4 py-2">Rank</th>
                                    <th className="text-left text-[var(--text-muted)] text-xs uppercase px-4 py-2">Participant</th>
                                    <th className="text-left text-[var(--text-muted)] text-xs uppercase px-4 py-2">Department</th>
                                    <th className="text-left text-[var(--text-muted)] text-xs uppercase px-4 py-2">Total Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dummyLeaderboard.map((user, i) => (
                                    <tr key={i} className="border-b border-[var(--border-glass)]/50 hover:bg-white/5">
                                        <td className="px-4 py-2.5 font-bold text-[var(--accent-teal)]">#{user.rank}</td>
                                        <td className="px-4 py-2.5 font-medium text-white">{user.name}</td>
                                        <td className="px-4 py-2.5 text-xs text-slate-300">{user.department}</td>
                                        <td className="px-4 py-2.5 font-bold text-yellow-400">{user.xp} XP</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </GlassCard>

                <GlassCard>
                    <h3 className="font-semibold text-white mb-4">CSR Initiatives & Activities</h3>
                    <div className="space-y-4">
                        {dummyCsrActivities.map((act, i) => (
                            <div key={i} className="p-3 bg-white/5 border border-white/10 rounded-xl">
                                <div className="flex justify-between items-center mb-1 text-xs">
                                    <span className="font-bold text-white">{act.title}</span>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 border rounded uppercase
                                        ${act.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                                            act.status === 'active' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                                                'bg-purple-500/20 text-purple-400 border-purple-500/30'}`}>
                                        {act.status}
                                    </span>
                                </div>
                                <div className="flex justify-between text-[11px] text-slate-400">
                                    <span>Date Range: {act.startDate} / {act.endDate}</span>
                                    <span className="text-yellow-400 font-bold">Reward: +{act.pointsOffered} XP</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </GlassCard>
            </div>
        </motion.div>
    );
}

function GovernanceReport() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-4">
                <StatCard title="Compliance Health" value="94.2%" sub="Standard ISO alignment score" icon={null} color="var(--gov)" gradient="from-sky-400 to-sky-700" />
                <StatCard title="Critical Breaches Logged" value="1 Event" sub="Discharge wastewater case" icon={null} color="var(--gov)" gradient="from-red-400 to-red-700" />
                <StatCard title="Signed Policies Rate" value="100%" sub="Annual acknowledgment quotas" icon={null} color="var(--gov)" gradient="from-emerald-400 to-emerald-700" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <GlassCard>
                    <h3 className="font-semibold text-white mb-4">Compliance Audits Registry</h3>
                    <div className="space-y-4">
                        {dummyAudits.map((aud, i) => (
                            <div key={i} className="p-3 bg-white/5 border border-white/10 rounded-xl">
                                <div className="flex justify-between items-center mb-1 text-xs">
                                    <span className="font-bold text-white">{aud.title}</span>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 border rounded uppercase
                                        ${aud.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-blue-500/20 text-blue-400 border-blue-500/30'}`}>
                                        {aud.status}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-[11px] text-slate-400">
                                    <span>Auditor: {aud.auditor}</span>
                                    <span>Target Scope: {aud.department}</span>
                                </div>
                                {aud.findings && <p className="text-[11px] text-amber-300 italic mt-1.5 font-medium">✏️ Notes: {aud.findings}</p>}
                            </div>
                        ))}
                    </div>
                </GlassCard>

                <GlassCard>
                    <h3 className="font-semibold text-white mb-4">Track Compliance Issues</h3>
                    <div className="space-y-4">
                        {dummyComplianceIssues.map((issue, i) => (
                            <div key={i} className="p-3 bg-white/5 border border-white/10 rounded-xl">
                                <div className="flex justify-between items-center mb-1.5 text-xs">
                                    <span className="font-bold text-white truncate max-w-[200px]">{issue.description}</span>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 border rounded uppercase
                                        ${issue.severity === 'critical' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                                            issue.severity === 'high' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                                                'bg-blue-500/20 text-blue-400 border-blue-500/30'}`}>
                                        {issue.severity}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-[10px] text-slate-400">
                                    <span>Owner: {issue.owner}</span>
                                    <span>Due Date: {issue.dueDate}</span>
                                    <span className={`font-bold ${issue.status === 'open' ? 'text-red-400' : 'text-emerald-400'}`}>{issue.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </GlassCard>
            </div>
        </motion.div>
    );
}

function AnalyticsReport() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-4">
                <StatCard title="Best Environmental" value="IT & Digital (95)" icon={null} color="var(--env)" gradient="from-emerald-400 to-emerald-700" />
                <StatCard title="Best Social" value="HR & People (92)" icon={null} color="var(--social)" gradient="from-purple-400 to-purple-700" />
                <StatCard title="Best Governance" value="Corporate (90)" icon={null} color="var(--gov)" gradient="from-sky-400 to-sky-700" />
                <StatCard title="Worst Performing" value="Logistics Sector" icon={null} color="var(--accent-rose)" gradient="from-rose-400 to-rose-700" />
            </div>

            <GlassCard>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-white">Full ESG Pillars Comparison Profile</h3>
                    <button onClick={() => window.print()} className="no-print flex items-center gap-2 px-3 py-1.5 text-xs bg-white/10 hover:bg-white/20 text-white rounded-lg transition">
                        <Download className="w-3 h-3" /> Export PDF Report
                    </button>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dummyDeptScores} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                        <XAxis dataKey="department" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                        <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} domain={[0, 100]} />
                        <CartesianGrid strokeDasharray="4 4" stroke="var(--border-glass)" vertical={false} />
                        <Tooltip contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-glass)', borderRadius: '12px' }} />
                        <Bar dataKey="environmentalScore" name="Environmental Score" fill="var(--env)" radius={[4, 4, 0, 0]} fillOpacity={0.8} />
                        <Bar dataKey="socialScore" name="Social Score" fill="var(--social)" radius={[4, 4, 0, 0]} fillOpacity={0.8} />
                        <Bar dataKey="governanceScore" name="Governance Score" fill="var(--gov)" radius={[4, 4, 0, 0]} fillOpacity={0.8} />
                    </BarChart>
                </ResponsiveContainer>
            </GlassCard>

            <GlassCard>
                <h3 className="font-semibold text-white mb-5">Divisional ESG Performance Progress Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={[
                        { month: 'Jan', Corporate: 74, Manufacturing: 66, Logistics: 70, IT: 85 },
                        { month: 'Feb', Corporate: 76, Manufacturing: 68, Logistics: 71, IT: 86 },
                        { month: 'Mar', Corporate: 78, Manufacturing: 71, Logistics: 72, IT: 87 },
                        { month: 'Apr', Corporate: 79, Manufacturing: 70, Logistics: 72, IT: 88 },
                        { month: 'May', Corporate: 81, Manufacturing: 72, Logistics: 73, IT: 87 },
                        { month: 'Jun', Corporate: 83, Manufacturing: 72, Logistics: 74, IT: 88 },
                        { month: 'Jul', Corporate: 84.8, Manufacturing: 73.2, Logistics: 73.4, IT: 87.4 },
                    ]} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                        <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                        <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} domain={[50, 100]} />
                        <CartesianGrid strokeDasharray="4 4" stroke="var(--border-glass)" vertical={false} />
                        <Tooltip contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-glass)', borderRadius: '12px' }} />
                        <Line type="monotone" dataKey="Corporate" stroke="var(--accent-amber)" strokeWidth={2.5} dot={{ r: 3 }} />
                        <Line type="monotone" dataKey="Manufacturing" stroke="var(--accent-rose)" strokeWidth={2.5} dot={{ r: 3 }} />
                        <Line type="monotone" dataKey="Logistics" stroke="var(--social)" strokeWidth={2.5} dot={{ r: 3 }} />
                        <Line type="monotone" dataKey="IT" stroke="var(--env)" strokeWidth={2.5} dot={{ r: 3 }} />
                    </LineChart>
                </ResponsiveContainer>
            </GlassCard>
        </motion.div>
    );
}

function ReportBuilder() {
    const [filters, setFilters] = useState({ department: 'All', module: 'All', dateFrom: '', dateTo: '' });

    const exportToCSV = () => {
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Department,Environmental Score,Social Score,Governance Score,Total Score\n";
        dummyDeptScores.forEach(d => {
            csvContent += `"${d.department}",${d.environmentalScore},${d.socialScore},${d.governanceScore},${d.totalScore}\n`;
        });
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "EcoSphere_Custom_ESG_Report.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const exportToExcel = () => {
        let excelContent = "data:application/vnd.ms-excel;charset=utf-8,";
        excelContent += "Department\tEnvironmental Score\tSocial Score\tGovernance Score\tTotal Score\n";
        dummyDeptScores.forEach(d => {
            excelContent += `"${d.department}"\t${d.environmentalScore}\t${d.socialScore}\t${d.governanceScore}\t${d.totalScore}\n`;
        });
        const encodedUri = encodeURI(excelContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "EcoSphere_Custom_ESG_Report.xls");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <GlassCard>
                <h3 className="font-semibold text-white mb-5 flex items-center gap-2"><Filter className="w-5 h-5 text-[var(--accent-emerald)]" /> Custom Report Builder</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {[
                        { label: 'Department', options: ['All', 'Corporate', 'Manufacturing', 'Logistics', 'HR & People', 'IT & Digital'] },
                        { label: 'Module', options: ['All', 'Environmental', 'Social', 'Governance', 'Gamification'] },
                    ].map(({ label, options }) => (
                        <div key={label}>
                            <label className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold mb-1.5 block">{label}</label>
                            <select onChange={e => setFilters(f => ({ ...f, [label.toLowerCase()]: e.target.value }))}
                                className="w-full bg-white/5 border border-[var(--border-glass)] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent-emerald)]/50">
                                {options.map(o => <option key={o} value={o} className="bg-[var(--bg-secondary)]">{o}</option>)}
                            </select>
                        </div>
                    ))}
                    <div>
                        <label className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold mb-1.5 block">Date From</label>
                        <input type="date" className="w-full bg-white/5 border border-[var(--border-glass)] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent-emerald)]/50" />
                    </div>
                    <div>
                        <label className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold mb-1.5 block">Date To</label>
                        <input type="date" className="w-full bg-white/5 border border-[var(--border-glass)] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent-emerald)]/50" />
                    </div>
                </div>
                <div className="flex gap-3 flex-wrap">
                    <button onClick={() => window.print()} className="flex items-center gap-2 px-5 py-2.5 text-sm bg-gradient-to-r from-[var(--accent-emerald)] to-emerald-700 text-white rounded-xl font-medium shadow-lg shadow-emerald-500/20 hover:opacity-90 transition">
                        <BarChart2 className="w-4 h-4" /> Generate & Print Report
                    </button>
                    <button onClick={() => window.print()} className="no-print flex items-center gap-2 px-4 py-2.5 text-sm bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition">
                        <Download className="w-4 h-4" /> Export PDF
                    </button>
                    <button onClick={exportToExcel} className="no-print flex items-center gap-2 px-4 py-2.5 text-sm bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition">
                        <Download className="w-4 h-4" /> Export Excel
                    </button>
                    <button onClick={exportToCSV} className="no-print flex items-center gap-2 px-4 py-2.5 text-sm bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition">
                        <Download className="w-4 h-4" /> Export CSV
                    </button>
                </div>
            </GlassCard>

            <GlassCard>
                <h3 className="font-semibold text-white mb-5">Preview: ESG Score Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={[
                        { month: 'Jan', score: 76 }, { month: 'Feb', score: 74 }, { month: 'Mar', score: 79 },
                        { month: 'Apr', score: 78 }, { month: 'May', score: 80 }, { month: 'Jun', score: 82 }, { month: 'Jul', score: 81 },
                    ]} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                        <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} domain={[60, 100]} />
                        <CartesianGrid strokeDasharray="4 4" stroke="var(--border-glass)" vertical={false} />
                        <Tooltip contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-glass)', borderRadius: '12px' }} />
                        <Line type="monotone" dataKey="score" stroke="var(--accent-emerald)" strokeWidth={3} dot={{ fill: 'var(--accent-emerald)', r: 5 }} />
                    </LineChart>
                </ResponsiveContainer>
            </GlassCard>
        </motion.div>
    );
}

export default function Reports() {
    return (
        <div className="pb-20 mt-4">
            <PageHeader title="Reports & Analytics" subtitle="Environmental, Social, Governance reports with custom builder and exports"
                action={
                    <button onClick={() => window.print()} className="no-print flex items-center gap-2 px-4 py-2 text-sm bg-gradient-to-r from-[var(--accent-emerald)] to-emerald-700 hover:opacity-90 text-white font-medium rounded-xl shadow-lg shadow-emerald-500/20 transition cursor-pointer">
                        <Download className="w-4 h-4" /> Download PDF Report
                    </button>
                } />
            <SubTabs />
            <Routes>
                <Route path="esg-summary" element={<EsgSummary />} />
                <Route path="environmental" element={<EnvironmentalReport />} />
                <Route path="social" element={<SocialReport />} />
                <Route path="governance" element={<GovernanceReport />} />
                <Route path="analytics" element={<AnalyticsReport />} />
                <Route path="builder" element={<ReportBuilder />} />
                <Route path="*" element={<Navigate to="esg-summary" replace />} />
            </Routes>
        </div>
    );
}
