import React from 'react';
import { motion } from 'framer-motion';

// ---- REUSABLE UI PRIMITIVES ----

export const Badge = ({ children, variant = 'default', size = 'sm' }) => {
    const variants = {
        default: 'bg-white/10 text-gray-300',
        green: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
        blue: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
        purple: 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
        amber: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
        red: 'bg-red-500/20 text-red-400 border border-red-500/30',
        gray: 'bg-gray-500/20 text-gray-400 border border-gray-500/30',
    };
    const sizes = {
        xs: 'text-[10px] px-2 py-0.5',
        sm: 'text-xs px-2.5 py-1',
        md: 'text-sm px-3 py-1.5',
    };
    return (
        <span className={`inline-flex items-center rounded-full font-medium ${variants[variant]} ${sizes[size]}`}>
            {children}
        </span>
    );
};

export const StatusBadge = ({ status }) => {
    const map = {
        active: { label: 'Active', variant: 'green' },
        inactive: { label: 'Inactive', variant: 'gray' },
        completed: { label: 'Completed', variant: 'blue' },
        draft: { label: 'Draft', variant: 'gray' },
        archived: { label: 'Archived', variant: 'gray' },
        on_track: { label: 'On Track', variant: 'green' },
        at_risk: { label: 'At Risk', variant: 'amber' },
        achieved: { label: 'Achieved', variant: 'blue' },
        missed: { label: 'Missed', variant: 'red' },
        pending: { label: 'Pending', variant: 'amber' },
        approved: { label: 'Approved', variant: 'green' },
        rejected: { label: 'Rejected', variant: 'red' },
        under_review: { label: 'Under Review', variant: 'purple' },
        open: { label: 'Open', variant: 'red' },
        in_progress: { label: 'In Progress', variant: 'amber' },
        resolved: { label: 'Resolved', variant: 'green' },
        closed: { label: 'Closed', variant: 'gray' },
        scheduled: { label: 'Scheduled', variant: 'blue' },
        upcoming: { label: 'Upcoming', variant: 'purple' },
    };
    const cfg = map[status] || { label: status, variant: 'default' };
    return <Badge variant={cfg.variant} size="sm">{cfg.label}</Badge>;
};

export const SeverityBadge = ({ severity }) => {
    const map = {
        low: 'green', medium: 'amber', high: 'red', critical: 'red',
    };
    return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${severity === 'critical' ? 'bg-red-500/30 text-red-300 border-red-500/50 animate-pulse' :
                severity === 'high' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                    severity === 'medium' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                        'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
            }`}>
            {severity?.toUpperCase()}
        </span>
    );
};

export const StatCard = ({ title, value, sub, icon: Icon, color, gradient, trend }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 border-t-2"
        style={{ borderTopColor: color }}
    >
        <div className="flex justify-between items-start">
            <div>
                <p className="text-[var(--text-muted)] text-xs font-semibold uppercase tracking-wider">{title}</p>
                <h3 className="text-3xl font-bold text-white mt-2 tracking-tight">{value}</h3>
                {sub && <p className="text-xs text-[var(--text-muted)] mt-1">{sub}</p>}
                {trend !== undefined && (
                    <p className={`text-xs mt-2 font-medium ${trend >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {trend >= 0 ? '▲' : '▼'} {Math.abs(trend)}% vs last month
                    </p>
                )}
            </div>
            {Icon && (
                <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
            )}
        </div>
    </motion.div>
);

export const PageHeader = ({ title, subtitle, action }) => (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 mt-4 gap-4">
        <div>
            <h2 className="text-3xl font-bold text-white tracking-tight">{title}</h2>
            {subtitle && <p className="text-[var(--text-muted)] text-sm mt-1.5">{subtitle}</p>}
        </div>
        {action}
    </div>
);

export const GlassCard = ({ children, className = '' }) => (
    <div className={`glass-card p-6 ${className}`}>{children}</div>
);

export const EmptyState = ({ icon: Icon, title, description, action }) => (
    <div className="flex flex-col items-center justify-center py-20 text-center">
        {Icon && <Icon className="w-16 h-16 text-[var(--text-muted)]/20 mb-4" />}
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-[var(--text-muted)] text-sm mb-6 max-w-xs">{description}</p>
        {action}
    </div>
);

export const ProgressBar = ({ value, max = 100, color = 'var(--accent-emerald)' }) => {
    const pct = Math.min(100, Math.round((value / max) * 100));
    return (
        <div className="w-full bg-white/10 rounded-full h-2">
            <div
                className="h-2 rounded-full transition-all duration-700"
                style={{ width: `${pct}%`, backgroundColor: color }}
            />
        </div>
    );
};

export const DataTable = ({ columns, data }) => (
    <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-sm">
            <thead>
                <tr className="border-b border-[var(--border-glass)]">
                    {columns.map((col, i) => (
                        <th key={i} className="text-left text-[var(--text-muted)] text-xs uppercase tracking-wider font-semibold px-4 py-3">
                            {col.header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, ri) => (
                    <motion.tr
                        key={ri}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: ri * 0.05 }}
                        className="border-b border-[var(--border-glass)]/50 hover:bg-white/5 transition"
                    >
                        {columns.map((col, ci) => (
                            <td key={ci} className="px-4 py-3 text-[var(--text-primary)]">
                                {col.cell ? col.cell(row) : row[col.accessor]}
                            </td>
                        ))}
                    </motion.tr>
                ))}
            </tbody>
        </table>
    </div>
);

export const LoadingSkeleton = ({ rows = 5 }) => (
    <div className="space-y-3">
        {[...Array(rows)].map((_, i) => (
            <div key={i} className="h-12 bg-white/5 rounded-xl animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
        ))}
    </div>
);

export const DifficultyBadge = ({ difficulty }) => {
    const map = { easy: 'green', medium: 'amber', hard: 'red' };
    return <Badge variant={map[difficulty] || 'default'} size="xs">{difficulty}</Badge>;
};
