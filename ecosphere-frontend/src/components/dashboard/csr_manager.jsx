import React, { useState } from 'react';
import { Heart, CheckSquare, Users, Calendar, Award, GraduationCap, Plus, Trash2 } from 'lucide-react';
import { StatCard, GlassCard, DataTable, StatusBadge } from '../ui/index.jsx';

export default function CsrManagerView({ tab }) {
    const [events, setEvents] = useState([
        { id: 1, title: 'Plastic-Free Campus Campaign', start: '2026-07-28', end: '2026-07-30', limit: 40, status: 'active' },
        { id: 2, title: 'Rural Primary Solar Installment', start: '2026-08-04', end: '2026-08-06', limit: 25, status: 'upcoming' }
    ]);
    const [regs, setRegs] = useState([
        { id: 1, employee: 'Sarah Jenkins', activity: 'Solar Installment', email: 'sarah@ecosphere.com', enrolledDate: '2026-07-12' },
        { id: 2, employee: 'James Carter', activity: 'Plastic-Free Campaign', email: 'james@ecosphere.com', enrolledDate: '2026-07-10' }
    ]);
    const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '', limit: 30 });

    const addEvent = (e) => {
        e.preventDefault();
        if (!newEvent.title) return;
        setEvents([...events, { ...newEvent, id: Date.now(), status: 'upcoming' }]);
        setNewEvent({ title: '', start: '', end: '', limit: 30 });
    };

    if (tab === 'csr_events') {
        return (
            <GlassCard>
                <h3 className="text-xl font-bold text-white mb-4 font-semibold">Active CSR Programs</h3>
                <form onSubmit={addEvent} className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-white/5 p-4 rounded-xl border border-white/10 mb-5">
                    <input type="text" placeholder="Activity Title" value={newEvent.title} onChange={e => setNewEvent({ ...newEvent, title: e.target.value })} required className="bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-xs text-white" />
                    <input type="date" value={newEvent.start} onChange={e => setNewEvent({ ...newEvent, start: e.target.value })} required className="bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-xs text-white" />
                    <input type="date" value={newEvent.end} onChange={e => setNewEvent({ ...newEvent, end: e.target.value })} required className="bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-xs text-white" />
                    <button type="submit" className="bg-[var(--accent-emerald)] text-white text-xs font-bold rounded-lg hover:bg-emerald-600 transition flex items-center justify-center gap-1">
                        <Plus className="w-4 h-4" /> Create CSR
                    </button>
                </form>
                <DataTable
                    columns={[
                        { header: 'CSR Program Name', accessor: 'title' },
                        { header: 'Start Date', accessor: 'start' },
                        { header: 'End Date', accessor: 'end' },
                        { header: 'Quota Limit', accessor: 'limit' },
                        { header: 'Status', cell: e => <StatusBadge status={e.status} /> }
                    ]}
                    data={events}
                />
            </GlassCard>
        );
    }

    if (tab === 'csr_participation') {
        return (
            <GlassCard>
                <h3 className="text-xl font-bold text-white mb-4">CSR Volunteer Registrations</h3>
                <DataTable
                    columns={[
                        { header: 'Volunteer Employee', accessor: 'employee' },
                        { header: 'Enrolled Program', accessor: 'activity' },
                        { header: 'Work Email Address', accessor: 'email' },
                        { header: 'Enrollment Timestamp', accessor: 'enrolledDate' }
                    ]}
                    data={regs}
                />
            </GlassCard>
        );
    }

    if (tab === 'csr_training') {
        return (
            <GlassCard>
                <h3 className="text-xl font-bold text-white mb-4">Employee Training Hub</h3>
                <div className="space-y-4">
                    {[
                        { title: 'Hazmat & Chemical Waste Handling safety', hours: '4 modules', points: 150 },
                        { title: 'Global Reporting Initiative Standard Course', hours: '6 modules', points: 250 },
                        { title: 'Daily Office Eco Habits and Waste Recycle Guidelines', hours: '2 modules', points: 50 }
                    ].map((c, i) => (
                        <div key={i} className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-xl">
                            <div>
                                <h4 className="font-semibold text-white">{c.title}</h4>
                                <p className="text-xs text-[var(--text-muted)] mt-0.5">Length: {c.hours} | Awards: +{c.points} XP</p>
                            </div>
                            <span className="text-xs bg-purple-500/10 text-purple-400 border border-purple-500/20 px-3 py-1 rounded font-bold">Active training</span>
                        </div>
                    ))}
                </div>
            </GlassCard>
        );
    }

    if (tab === 'csr_certificates') {
        return (
            <GlassCard>
                <h3 className="text-xl font-bold text-white mb-4">Issued Certificates</h3>
                <DataTable
                    columns={[
                        { header: 'Recipient Employee', accessor: 'name' },
                        { header: 'Certificate Label', accessor: 'label' },
                        { header: 'Award Date', accessor: 'date' }
                    ]}
                    data={[
                        { name: 'John Doe', label: 'Certified Carbon Neutral Advocate', date: '2026-06-15' },
                        { name: 'Oliver Taylor', label: 'Safe Waste Disposal Specialist', date: '2026-07-02' }
                    ]}
                />
            </GlassCard>
        );
    }

    // Default Overview
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-2">🌱 CSR Management Center</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="CSR Initiatives" value="12 Active" sub="Tree planting drive" icon={Heart} color="var(--social)" gradient="from-purple-400 to-purple-700" />
                <StatCard title="Total Volunteers" value="230 Enlisted" sub="Active engagement" icon={Users} color="var(--env)" gradient="from-emerald-400 to-emerald-700" />
                <StatCard title="Events Scheduled" value="2 in Q3" sub="Solar install campaign" icon={Calendar} color="var(--accent-amber)" gradient="from-amber-400 to-amber-700" />
                <StatCard title="Certificates Dispatched" value="48 Earned" sub="Completed courses" icon={GraduationCap} color="var(--gov)" gradient="from-sky-400 to-sky-700" />
            </div>

            <GlassCard>
                <h4 className="font-semibold text-white mb-3">Volunteer Ranking (By Hours Contributed)</h4>
                <div className="space-y-2">
                    {[
                        { name: 'Sarah Jenkins', hours: 32, dept: 'IT & Digital' },
                        { name: 'John Doe', hours: 24, dept: 'Corporate Head Office' },
                        { name: 'Oliver Taylor', hours: 18, dept: 'Manufacturing Division' }
                    ].map((v, i) => (
                        <div key={i} className="flex justify-between items-center text-xs p-3 rounded-lg bg-white/5 border border-white/10 text-white">
                            <span>#{i + 1} {v.name} ({v.dept})</span>
                            <span className="font-bold text-[var(--accent-teal)]">{v.hours} Hours Logged</span>
                        </div>
                    ))}
                </div>
            </GlassCard>
        </div>
    );
}
