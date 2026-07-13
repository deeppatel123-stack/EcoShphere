import React, { useState } from 'react';
import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Plus, Target, CheckCircle2, Zap } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { PageHeader, GlassCard, StatCard, DataTable, StatusBadge, ProgressBar, EmptyState } from '../components/ui/index.jsx';
import { dummyEmissionFactors, dummyCarbonTransactions, dummyGoals } from '../data/dummy/index.js';

const SUB_TABS = [
    { path: 'dashboard', label: 'Dashboard' },
    { path: 'emission-factors', label: 'Emission Factors' },
    { path: 'carbon-transactions', label: 'Carbon Transactions' },
    { path: 'goals', label: 'Goals' },
];

const SubTabs = () => (
    <div className="flex gap-2 mb-6 flex-wrap">
        {SUB_TABS.map(t => (
            <NavLink
                key={t.path}
                to={t.path}
                className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium transition ${isActive
                        ? 'bg-[var(--env)]/20 text-[var(--env)] border border-[var(--env)]/30'
                        : 'text-[var(--text-muted)] bg-white/5 hover:bg-white/10 hover:text-white border border-transparent'
                    }`
                }
            >
                {t.label}
            </NavLink>
        ))}
    </div>
);

const deptCarbonData = [
    { name: 'MFG', co2: 9840 },
    { name: 'LOG', co2: 1340 },
    { name: 'CORP', co2: 92 },
    { name: 'IT', co2: 250 },
    { name: 'HR', co2: 180 },
];

function EnvDashboard() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                <StatCard title="Total CO₂ Emissions" value="11,502" sub="kg CO2e this year" icon={Leaf} color="var(--env)" gradient="from-emerald-400 to-emerald-700" />
                <StatCard title="Active Goals" value="2 / 3" sub="On Track" icon={Target} color="var(--accent-teal)" gradient="from-teal-400 to-teal-700" />
                <StatCard title="Auto-Calculated Txns" value="3 / 4" sub="92% Coverage" icon={Zap} color="var(--accent-amber)" gradient="from-amber-400 to-amber-700" />
                <StatCard title="Emission Factors" value={dummyEmissionFactors.length} sub="Configured" icon={CheckCircle2} color="var(--gov)" gradient="from-sky-400 to-sky-700" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <GlassCard>
                    <h3 className="font-semibold text-white mb-5">CO₂ Emissions by Department (kg)</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={deptCarbonData}>
                            <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-glass)', borderRadius: '12px' }} />
                            <Bar dataKey="co2" radius={[6, 6, 0, 0]}>
                                {deptCarbonData.map((_, i) => <Cell key={i} fill="var(--env)" fillOpacity={0.7 + i * 0.06} />)}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </GlassCard>

                <GlassCard>
                    <h3 className="font-semibold text-white mb-5">Sustainability Goals Progress</h3>
                    <div className="space-y-6">
                        {dummyGoals.map((g, i) => (
                            <div key={i}>
                                <div className="flex justify-between mb-1.5">
                                    <span className="text-sm text-[var(--text-primary)] font-medium">{g.title}</span>
                                    <StatusBadge status={g.status} />
                                </div>
                                <ProgressBar value={g.currentValue} max={g.targetValue} color={
                                    g.status === 'achieved' ? 'var(--gov)' : g.status === 'at_risk' ? 'var(--accent-amber)' : 'var(--env)'
                                } />
                                <p className="text-xs text-[var(--text-muted)] mt-1">{g.currentValue} / {g.targetValue} {g.unit} · Due: {g.deadline}</p>
                            </div>
                        ))}
                    </div>
                </GlassCard>
            </div>
        </motion.div>
    );
}

function EmissionFactors() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex justify-between items-center mb-5">
                <h3 className="font-semibold text-white">Emission Factors</h3>
                <button className="flex items-center gap-2 px-4 py-2 text-sm bg-[var(--env)] hover:bg-emerald-600 text-white rounded-lg font-medium transition">
                    <Plus className="w-4 h-4" /> Add Factor
                </button>
            </div>
            <GlassCard className="!p-0 overflow-hidden">
                <DataTable
                    columns={[
                        { header: 'Name', accessor: 'name' },
                        { header: 'Source Type', cell: r => <span className="capitalize">{r.sourceType}</span> },
                        { header: 'Unit', accessor: 'unit' },
                        { header: 'Factor Value (kg CO₂e)', cell: r => <span className="text-[var(--env)] font-bold">{r.factorValue}</span> },
                        { header: 'Status', cell: r => <StatusBadge status={r.status} /> },
                    ]}
                    data={dummyEmissionFactors}
                />
            </GlassCard>
        </motion.div>
    );
}

function CarbonTransactions() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex justify-between items-center mb-5">
                <h3 className="font-semibold text-white">Carbon Transactions</h3>
                <button className="flex items-center gap-2 px-4 py-2 text-sm bg-[var(--env)] hover:bg-emerald-600 text-white rounded-lg font-medium transition">
                    <Plus className="w-4 h-4" /> Log Transaction
                </button>
            </div>
            <GlassCard className="!p-0 overflow-hidden">
                <DataTable
                    columns={[
                        { header: 'Source Type', cell: r => <span className="capitalize">{r.sourceType}</span> },
                        { header: 'Department', accessor: 'department' },
                        { header: 'Factor Used', accessor: 'emissionFactor' },
                        { header: 'Qty', accessor: 'quantity' },
                        { header: 'CO₂ (kg)', cell: r => <span className="text-[var(--env)] font-bold">{r.calculatedEmission.toLocaleString()}</span> },
                        {
                            header: 'Mode', cell: r => r.isAutoCalculated
                                ? <span className="text-[10px] bg-[var(--env)]/20 text-[var(--env)] px-2 py-0.5 rounded-full border border-[var(--env)]/30 font-medium">Auto-Calc</span>
                                : <span className="text-[10px] bg-white/10 text-[var(--text-muted)] px-2 py-0.5 rounded-full border border-white/10">Manual</span>
                        },
                        { header: 'Date', accessor: 'transactionDate' },
                    ]}
                    data={dummyCarbonTransactions}
                />
            </GlassCard>
        </motion.div>
    );
}

function Goals() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex justify-between items-center mb-5">
                <h3 className="font-semibold text-white">Environmental Goals</h3>
                <button className="flex items-center gap-2 px-4 py-2 text-sm bg-[var(--env)] hover:bg-emerald-600 text-white rounded-lg font-medium transition">
                    <Plus className="w-4 h-4" /> New Goal
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {dummyGoals.map((g, i) => (
                    <GlassCard key={i} className="border-t-2" style={{ borderTopColor: g.status === 'achieved' ? 'var(--gov)' : g.status === 'at_risk' ? 'var(--accent-amber)' : 'var(--env)' }}>
                        <div className="flex justify-between items-start mb-3">
                            <h4 className="font-semibold text-white">{g.title}</h4>
                            <StatusBadge status={g.status} />
                        </div>
                        <p className="text-xs text-[var(--text-muted)] mb-1">{g.department} · Due {g.deadline}</p>
                        <ProgressBar value={g.currentValue} max={g.targetValue} color={g.status === 'achieved' ? 'var(--gov)' : g.status === 'at_risk' ? 'var(--accent-amber)' : 'var(--env)'} />
                        <p className="text-sm font-bold text-white mt-2">
                            {g.currentValue} <span className="text-[var(--text-muted)] font-normal">/ {g.targetValue} {g.unit}</span>
                        </p>
                    </GlassCard>
                ))}
            </div>
        </motion.div>
    );
}

export default function Environmental() {
    return (
        <div className="pb-20 mt-4">
            <PageHeader
                title="Environmental Module"
                subtitle="Carbon accounting, emission factors, sustainability goals and carbon reports"
                action={<span className="px-3 py-1 text-xs bg-[var(--env)]/20 text-[var(--env)] border border-[var(--env)]/30 rounded-full font-medium">🌿 Env Module</span>}
            />
            <SubTabs />
            <Routes>
                <Route path="dashboard" element={<EnvDashboard />} />
                <Route path="emission-factors" element={<EmissionFactors />} />
                <Route path="carbon-transactions" element={<CarbonTransactions />} />
                <Route path="goals" element={<Goals />} />
                <Route path="*" element={<Navigate to="dashboard" replace />} />
            </Routes>
        </div>
    );
}
