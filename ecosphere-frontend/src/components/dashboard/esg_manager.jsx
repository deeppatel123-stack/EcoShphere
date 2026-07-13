import React, { useState } from 'react';
import { Leaf, Plus, Target, CheckCircle2, ChevronRight, BarChart3, Activity } from 'lucide-react';
import { StatCard, GlassCard, DataTable, StatusBadge } from '../ui/index.jsx';
import { dummyEmissionFactors, dummyCarbonTransactions, dummyGoals } from '../../data/dummy/index.js';

export default function EsgManagerView({ tab }) {
    const [products, setProducts] = useState([
        { id: 1, name: 'EcoPack Cardboard Box', carbonFootprint: '1.2 kg CO2e / unit', recyclability: '100%', waterUse: '12L / unit', status: 'approved' },
        { id: 2, name: 'Glass Bottle (Reusable)', carbonFootprint: '4.8 kg CO2e / unit', recyclability: '95%', waterUse: '24L / unit', status: 'approved' },
        { id: 3, name: 'Soot Neutralizer Spray', carbonFootprint: '0.45 kg CO2e / unit', recyclability: '80%', waterUse: '8L / unit', status: 'pending_review' },
    ]);

    if (tab === 'product_esg_profile') {
        return (
            <GlassCard>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-white">Product ESG Sustainability Profiles</h3>
                    <button className="flex items-center gap-2 px-3 py-1.5 text-xs bg-[var(--env)] hover:bg-emerald-600 text-white rounded-lg font-medium transition">
                        <Plus className="w-3.5 h-3.5" /> Register Product
                    </button>
                </div>
                <DataTable
                    columns={[
                        { header: 'Product Item', accessor: 'name' },
                        { header: 'Carbon Footprint', cell: p => <span className="text-[var(--env)] font-bold">{p.carbonFootprint}</span> },
                        { header: 'Recyclability', accessor: 'recyclability' },
                        { header: 'Water Footprint', accessor: 'waterUse' },
                        { header: 'Compliance', cell: p => <StatusBadge status={p.status} /> }
                    ]}
                    data={products}
                />
            </GlassCard>
        );
    }

    // Default overview
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-2">🌿 Environmental Analytics</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Total Carbon Emission" value="11,502 kg" sub="Cumulative this Q" icon={Leaf} color="var(--env)" gradient="from-emerald-400 to-emerald-700" />
                <StatCard title="Carbon Goals" value="2 / 3" sub="On track" icon={Target} color="var(--accent-teal)" gradient="from-teal-400 to-teal-700" />
                <StatCard title="Auto Calculations" value="92%" sub="API system synced" icon={Activity} color="var(--accent-amber)" gradient="from-amber-400 to-amber-700" />
                <StatCard title="Emission Factors" value="5 Factors" sub="Active state" icon={CheckCircle2} color="var(--gov)" gradient="from-sky-400 to-sky-700" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <GlassCard>
                    <h4 className="font-semibold text-white mb-4">Carbon Footprints by Division</h4>
                    <div className="space-y-3">
                        {[
                            { name: 'Manufacturing Division', co2: '9,840 kg', pct: 85 },
                            { name: 'Logistics Division (Automotive)', co2: '1,340 kg', pct: 12 },
                            { name: 'Corporate Office Operations', co2: '92 kg', pct: 1 },
                            { name: 'IT Infrastructure Rooms', co2: '250 kg', pct: 2 },
                        ].map((item, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-xs mb-1 text-white">
                                    <span>{item.name}</span>
                                    <span>{item.co2} ({item.pct}%)</span>
                                </div>
                                <div className="w-full bg-white/10 rounded-full h-1.5">
                                    <div className="h-1.5 rounded-full bg-[var(--env)]" style={{ width: `${item.pct}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </GlassCard>

                <GlassCard>
                    <h4 className="font-semibold text-white mb-4">Goal Timeline Progress</h4>
                    <div className="space-y-4">
                        {dummyGoals.map((g, i) => (
                            <div key={i} className="p-3 bg-white/5 border border-white/10 rounded-xl">
                                <div className="flex justify-between items-center text-xs mb-1">
                                    <span className="font-semibold text-white">{g.title}</span>
                                    <StatusBadge status={g.status} />
                                </div>
                                <p className="text-[10px] text-[var(--text-muted)]">Deadline: {g.deadline}</p>
                            </div>
                        ))}
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}
