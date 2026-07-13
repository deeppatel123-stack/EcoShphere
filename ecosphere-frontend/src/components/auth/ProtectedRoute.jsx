import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Loader2 } from 'lucide-react';

// Protect all routes that require login
export function ProtectedRoute() {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-[var(--accent-emerald)] animate-spin" />
            </div>
        );
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}

// Prevent logged-in users from seeing login page
export function GuestRoute() {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-[var(--accent-emerald)] animate-spin" />
            </div>
        );
    }

    return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
}
