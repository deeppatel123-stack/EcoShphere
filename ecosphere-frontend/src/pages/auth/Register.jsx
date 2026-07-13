import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Leaf, User, Mail, Lock, Eye, EyeOff,
    Loader2, AlertCircle, CheckCircle2, ChevronDown, ArrowLeft
} from 'lucide-react';
import { api } from '../../lib/api';

/* ── All 10 roles from the Mongoose User model ── */
const ROLES = [
    {
        value: 'super_admin',
        label: 'Super Admin',
        desc: 'Full platform control & system configuration',
        icon: '👑',
        badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    },
    {
        value: 'esg_manager',
        label: 'ESG Manager',
        desc: 'Manage sustainability programs & indicators',
        icon: '🌿',
        badge: 'bg-green-500/10 text-green-400 border-green-500/30',
    },
    {
        value: 'department_head',
        label: 'Department Head',
        desc: 'Oversee department-level ESG performance',
        icon: '🏢',
        badge: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    },
    {
        value: 'employee',
        label: 'Employee',
        desc: 'Participate in carbon action challenges',
        icon: '👤',
        badge: 'bg-violet-500/10 text-violet-400 border-violet-500/30',
    },
    {
        value: 'auditor',
        label: 'Auditor',
        desc: 'Review ESG record audits & certifications',
        icon: '🔍',
        badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    },
    {
        value: 'executive',
        label: 'Executive',
        desc: 'High-level dashboards & brief insights',
        icon: '📊',
        badge: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    },
    {
        value: 'csr_manager',
        label: 'CSR Manager',
        desc: 'Manage social initiatives & completions',
        icon: '🌱',
        badge: 'bg-teal-500/10 text-teal-400 border-teal-500/30',
    },
    {
        value: 'compliance_officer',
        label: 'Compliance Officer',
        desc: 'Oversee policy tracking & risk flags',
        icon: '⚖️',
        badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
    },
    {
        value: 'gamification_manager',
        label: 'Gamification Manager',
        desc: 'Manage leaderboard settings & rewards',
        icon: '🎮',
        badge: 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/30',
    },
    {
        value: 'viewer',
        label: 'Viewer',
        desc: 'Read-only dashboard, report & baseline info',
        icon: '👀',
        badge: 'bg-slate-500/10 text-slate-400 border-slate-500/30',
    },
];

export default function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', role: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showRoleDropdown, setShowRoleDropdown] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const selectedRole = ROLES.find(r => r.value === form.role);

    const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!form.role) return setError('Please select a role to continue.');
        if (form.password.length < 6) return setError('Password must be at least 6 characters.');
        if (form.password !== form.confirmPassword) return setError('Passwords do not match.');

        setLoading(true);
        try {
            const res = await api.post('/auth/register', {
                name: form.name,
                email: form.email,
                password: form.password,
                role: form.role,
            });

            if (res.success) {
                setSuccess('Account created successfully! Redirecting to login...');
                setTimeout(() => navigate('/auth/login'), 2000);
            } else {
                setError(res.message || 'Registration failed. Please try again.');
            }
        } catch (err) {
            setError(err.message || 'Could not connect to server. Please ensure backend is running.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#030712] flex flex-col lg:flex-row relative overflow-hidden">
            {/* Back to Home Link */}
            <Link to="/" className="absolute top-6 left-6 flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition z-50 font-bold bg-white/5 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full hover:bg-white/10 shadow-lg">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Home</span>
            </Link>

            {/* Ambient background glow */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[var(--accent-emerald)]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[var(--gov)]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Left Col: Details Box */}
            <div className="w-full lg:w-1/2 hidden lg:flex flex-col justify-center p-8 md:p-16 bg-[#090d16] border-r border-white/5 relative z-10">
                <div className="absolute top-[20%] right-[-10%] w-[330px] h-[330px] bg-[var(--accent-teal)]/15 rounded-full blur-3xl pointer-events-none animate-pulse" />

                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-lg space-y-8"
                >
                    <div className="space-y-4">
                        <span className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-[var(--accent-emerald)] rounded-full text-[10px] font-bold tracking-wider uppercase">
                            Join EcoSphere Network
                        </span>
                        <h2 className="text-3xl font-extrabold text-white leading-tight">
                            Start Your <span className="bg-gradient-to-r from-[var(--accent-emerald)] to-emerald-400 bg-clip-text text-transparent">ESG Journey</span> Today
                        </h2>
                        <p className="text-sm text-gray-300 leading-relaxed font-normal">
                            Register now to gain streamlined workspace access, analyze carbon impact offsets, and contribute directly towards target net-zero operations.
                        </p>
                    </div>

                    {/* Stats Highlights Grid */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="glass-card p-4 rounded-xl border border-white/10 flex flex-col gap-1 bg-[#111827]/70 shadow-lg shadow-black/40">
                            <div className="text-xs text-gray-400 uppercase font-semibold">Active Members</div>
                            <div className="text-2xl font-black text-white font-mono">12K+</div>
                            <span className="text-[10px] text-[var(--accent-emerald)] font-semibold mt-0.5">Joined globally</span>
                        </div>
                        <div className="glass-card p-4 rounded-xl border border-white/10 flex flex-col gap-1 bg-[#111827]/70 shadow-lg shadow-black/40">
                            <div className="text-xs text-gray-400 uppercase font-semibold">Global Divisions</div>
                            <div className="text-2xl font-black text-emerald-400 font-mono">24+</div>
                            <span className="text-[10px] text-gray-400 font-medium mt-0.5">Active hubs</span>
                        </div>
                        <div className="glass-card p-4 rounded-xl border border-white/10 flex flex-col gap-1 bg-[#111827]/70 shadow-lg shadow-black/40">
                            <div className="text-xs text-gray-400 uppercase font-semibold">CSR Badges</div>
                            <div className="text-2xl font-black text-teal-400 font-mono">4.8K+</div>
                            <span className="text-[10px] text-[var(--accent-teal)] font-semibold mt-0.5">Awarded achievements</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Right Col: Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 z-10 bg-[#030712] relative">
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-lg space-y-8"
                >
                    {/* Header */}
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent-emerald)] to-emerald-800 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                            <Leaf className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white tracking-tight">EcoSphere</h1>
                            <p className="text-[10px] text-gray-400 tracking-wider uppercase font-semibold">ESG Management Platform</p>
                        </div>
                    </div>

                    <div className="glass-card p-6 md:p-8 space-y-6 bg-[#111827]/60 border border-white/10 shadow-2xl relative">
                        <div>
                            <h2 className="text-xl font-bold text-white leading-normal">Create your account</h2>
                            <p className="text-xs text-gray-300 mt-1">Join EcoSphere and start your sustainability journey</p>
                        </div>

                        {/* Error & Success */}
                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-xs font-semibold"
                                >
                                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                    {error}
                                </motion.div>
                            )}
                            {success && (
                                <motion.div
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl px-4 py-3 text-xs font-semibold"
                                >
                                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                                    {success}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Full Name */}
                            <div className="md:col-span-1">
                                <label className="text-[10px] text-gray-300 uppercase tracking-wider font-bold mb-1.5 block">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={e => update('name', e.target.value)}
                                        placeholder="John Doe"
                                        required
                                        className="w-full bg-[#030712]/90 border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="md:col-span-1">
                                <label className="text-[10px] text-gray-300 uppercase tracking-wider font-bold mb-1.5 block">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={e => update('email', e.target.value)}
                                        placeholder="you@ecosphere.com"
                                        required
                                        className="w-full bg-[#030712]/90 border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            {/* Role Selector */}
                            <div className="relative md:col-span-2">
                                <label className="text-[10px] text-gray-300 uppercase tracking-wider font-bold mb-1.5 block">Role</label>
                                <button
                                    type="button"
                                    onClick={() => setShowRoleDropdown(v => !v)}
                                    className={`w-full flex items-center justify-between bg-[#030712]/90 border rounded-xl px-4 py-2.5 text-xs transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${selectedRole ? 'border-emerald-500 text-white font-semibold' : 'border-white/15 text-gray-400'}`}
                                >
                                    {selectedRole ? (
                                        <span className="flex items-center gap-2">
                                            <span>{selectedRole.icon}</span>
                                            <span className="font-semibold text-white">{selectedRole.label}</span>
                                        </span>
                                    ) : (
                                        <span>Select your role...</span>
                                    )}
                                    <ChevronDown className={`w-4 h-4 transition-transform ${showRoleDropdown ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {showRoleDropdown && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scaleY: 1 }}
                                            exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute z-50 top-full mt-2 w-full rounded-xl border border-white/10 bg-[#111827] shadow-2xl max-h-60 overflow-y-auto custom-scrollbar"
                                            style={{ transformOrigin: 'top' }}
                                        >
                                            {ROLES.map((role, idx) => (
                                                <button
                                                    key={role.value}
                                                    type="button"
                                                    onClick={() => { update('role', role.value); setShowRoleDropdown(false); }}
                                                    className={`w-full flex items-start gap-3 px-4 py-3 text-left transition hover:bg-white/5 ${form.role === role.value ? 'bg-emerald-500/10' : ''} ${idx !== ROLES.length - 1 ? 'border-b border-white/5' : ''}`}
                                                >
                                                    <span className="text-xl mt-0.5 flex-shrink-0">{role.icon}</span>
                                                    <div className="min-w-0">
                                                        <div className="text-xs font-bold text-white flex items-center gap-2">
                                                            {role.label}
                                                            {form.role === role.value && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                                                        </div>
                                                        <div className="text-[10px] text-gray-400 mt-0.5 font-normal">{role.desc}</div>
                                                    </div>
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Password */}
                            <div className="md:col-span-1">
                                <label className="text-[10px] text-gray-300 uppercase tracking-wider font-bold mb-1.5 block">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={form.password}
                                        onChange={e => update('password', e.target.value)}
                                        placeholder="Min. 6 chars"
                                        required
                                        className="w-full bg-[#030712]/90 border border-white/15 rounded-xl pl-10 pr-12 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-medium"
                                    />
                                    <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition">
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                                {/* Password strength indicator */}
                                {form.password && (
                                    <div className="mt-1.5 flex gap-1">
                                        {[1, 2, 3, 4].map(i => (
                                            <div key={i} className={`flex-1 h-1 rounded-full transition-all ${form.password.length >= i * 3
                                                ? i <= 1 ? 'bg-red-500' : i <= 2 ? 'bg-amber-500' : i <= 3 ? 'bg-yellow-400' : 'bg-emerald-500'
                                                : 'bg-white/10'
                                                }`} />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div className="md:col-span-1">
                                <label className="text-[10px] text-gray-300 uppercase tracking-wider font-bold mb-1.5 block">Confirm Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type={showConfirm ? 'text' : 'password'}
                                        value={form.confirmPassword}
                                        onChange={e => update('confirmPassword', e.target.value)}
                                        placeholder="Re-enter password"
                                        required
                                        className={`w-full bg-[#030712]/90 border rounded-xl pl-10 pr-12 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all font-medium ${form.confirmPassword && form.password !== form.confirmPassword
                                            ? 'border-red-500/50 focus:ring-red-500/30'
                                            : form.confirmPassword && form.password === form.confirmPassword
                                                ? 'border-emerald-500/50 focus:ring-emerald-500/30'
                                                : 'border-white/15 focus:ring-emerald-500/50'
                                            }`}
                                    />
                                    <button type="button" onClick={() => setShowConfirm(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition">
                                        {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                    {form.confirmPassword && form.password === form.confirmPassword && (
                                        <CheckCircle2 className="absolute right-10 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                                    )}
                                </div>
                            </div>

                            {/* Submit */}
                            <div className="md:col-span-2">
                                <button
                                    type="submit"
                                    disabled={loading || !!success}
                                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[var(--accent-emerald)] to-emerald-700 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-60 flex items-center justify-center gap-2 mt-2 cursor-pointer"
                                >
                                    {loading && <Loader2 className="w-4.5 h-4.5 animate-spin" />}
                                    {loading ? 'Creating Account...' : success ? '✓ Account Created!' : 'Create Account'}
                                </button>
                            </div>
                        </form>

                        {/* Login link */}
                        <p className="text-xs text-center text-gray-300 mt-2 font-normal">
                            Already have an account?{' '}
                            <Link to="/auth/login" className="text-[var(--accent-emerald)] font-bold hover:underline">Sign in →</Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
