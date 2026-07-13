import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';
import { ProtectedRoute, GuestRoute } from '../components/auth/ProtectedRoute';

// Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Landing from '../pages/Landing';
import Dashboard from '../pages/Dashboard';
import Environmental from '../pages/Environmental';
import Social from '../pages/Social';
import Governance from '../pages/Governance';
import Gamification from '../pages/Gamification';
import Reports from '../pages/Reports';
import SettingsPage from '../pages/Settings';

function LoginWrapper() {
    const navigate = useNavigate();
    return <Login onLoginSuccess={() => navigate('/dashboard')} />;
}

function RegisterWrapper() {
    const navigate = useNavigate();
    return <Register onSuccess={() => navigate('/auth/login')} />;
}

export function AppRoutes() {
    return (
        <Routes>
            {/* ── Public Landing Page at root ── */}
            <Route path="/" element={<Landing />} />

            {/* ── Guest-only routes (redirect to /dashboard if already logged in) ── */}
            <Route element={<GuestRoute />}>
                <Route path="/auth/login" element={<LoginWrapper />} />
                <Route path="/auth/register" element={<RegisterWrapper />} />
            </Route>

            {/* ── Protected app routes (redirect to / if not logged in) ── */}
            <Route element={<ProtectedRoute />}>
                <Route path="/app" element={<AppShell />}>
                    <Route index element={<Navigate to="/dashboard" replace />} />
                </Route>
                <Route element={<AppShell />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="environmental/*" element={<Environmental />} />
                    <Route path="social/*" element={<Social />} />
                    <Route path="governance/*" element={<Governance />} />
                    <Route path="gamification/*" element={<Gamification />} />
                    <Route path="reports/*" element={<Reports />} />
                    <Route path="settings/*" element={<SettingsPage />} />
                </Route>
            </Route>

            {/* ── Fallback ── */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
