import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import { EsgConfigProvider } from '../contexts/EsgConfigContext';
import { NotificationProvider } from '../contexts/NotificationContext';
import { ToastProvider } from '../contexts/ToastContext';

export function Providers({ children }) {
    return (
        <ToastProvider>
            <AuthProvider>
                <EsgConfigProvider>
                    <NotificationProvider>
                        {children}
                    </NotificationProvider>
                </EsgConfigProvider>
            </AuthProvider>
        </ToastProvider>
    );
}
