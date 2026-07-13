import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Mail, Lock, Eye, EyeOff, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function Login({ onLoginSuccess }) {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const result = await login(email, password);
            if (result.success) {
                onLoginSuccess();
            } else {
                setError(result.message || 'Invalid credentials');
            }
        } catch (err) {
            setError(err.message || 'Please enter valid credentials');
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
                            EcoSphere Enterprise Suite
                        </span>
                        <h2 className="text-3xl font-extrabold text-white leading-tight">
                            Empowering <span className="bg-gradient-to-r from-[var(--accent-emerald)] to-emerald-400 bg-clip-text text-transparent">ESG Action</span> & Compliance
                        </h2>
                        <p className="text-sm text-gray-300 leading-relaxed font-normal">
                            EcoSphere unifies data logging, verified audit trails, carbon footprints estimation and gamified CSR milestones into one gorgeous platform.
                        </p>
                    </div>

                    {/* Stats Highlights Grid */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="glass-card p-4 rounded-xl border border-white/10 flex flex-col gap-1 bg-[#111827]/70 shadow-lg shadow-black/40">
                            <div className="text-xs text-gray-400 uppercase font-semibold">ESG Score</div>
                            <div className="text-2xl font-black text-white font-mono">87.4</div>
                            <span className="text-[10px] text-[var(--accent-emerald)] font-semibold mt-0.5">↑ 4.2% Quarter</span>
                        </div>
                        <div className="glass-card p-4 rounded-xl border border-white/10 flex flex-col gap-1 bg-[#111827]/70 shadow-lg shadow-black/40">
                            <div className="text-xs text-gray-400 uppercase font-semibold">CO₂ Goal</div>
                            <div className="text-2xl font-black text-emerald-400 font-mono">40%</div>
                            <span className="text-[10px] text-gray-400 font-medium mt-0.5">Reduction path</span>
                        </div>
                        <div className="glass-card p-4 rounded-xl border border-white/10 flex flex-col gap-1 bg-[#111827]/70 shadow-lg shadow-black/40">
                            <div className="text-xs text-gray-400 uppercase font-semibold">Volunteer</div>
                            <div className="text-2xl font-black text-teal-400 font-mono">1,280h</div>
                            <span className="text-[10px] text-[var(--accent-teal)] font-semibold mt-0.5">Approved Proofs</span>
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
                    className="w-full max-w-md space-y-8"
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
                            <h2 className="text-xl font-bold text-white leading-normal">Welcome back</h2>
                            <p className="text-xs text-gray-300 mt-1">Sign in to access your dashboard settings</p>
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-xs font-semibold">
                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Email */}
                            <div>
                                <label className="text-[10px] text-gray-300 uppercase tracking-wider font-bold mb-1.5 block">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@ecosphere.com"
                                        required
                                        className="w-full bg-[#030712]/90 border border-white/15 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="text-[10px] text-gray-300 uppercase tracking-wider font-bold mb-1.5 block">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        className="w-full bg-[#030712]/90 border border-white/15 rounded-xl pl-10 pr-12 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-medium"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 rounded-xl bg-gradient-to-r from-[var(--accent-emerald)] to-emerald-700 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-60 flex items-center justify-center gap-2 mt-2 cursor-pointer"
                            >
                                {loading && <Loader2 className="w-4.5 h-4.5 animate-spin" />}
                                {loading ? 'Signing in...' : 'Sign In'}
                            </button>
                        </form>



                        {/* Register link */}
                        <p className="text-xs text-center text-gray-300 mt-2 font-normal">
                            Don't have an account?{' '}
                            <Link to="/auth/register" className="text-[var(--accent-emerald)] font-bold hover:underline">Create one →</Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
