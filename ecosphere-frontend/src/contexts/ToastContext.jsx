import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Info, Sparkles, X } from 'lucide-react';

const ToastContext = createContext(null);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const show = useCallback((type, message) => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts((prev) => [...prev, { id, type, message }]);

        // Auto remove after 3 seconds
        setTimeout(() => {
            removeToast(id);
        }, 3500);
    }, [removeToast]);

    const success = useCallback((msg) => show('success', msg), [show]);
    const error = useCallback((msg) => show('error', msg), [show]);
    const info = useCallback((msg) => show('info', msg), [show]);
    const warning = useCallback((msg) => show('warning', msg), [show]);

    const getToastStyle = (type) => {
        switch (type) {
            case 'success':
                return {
                    border: 'border-emerald-500/30 bg-emerald-950/20 text-emerald-300',
                    icon: <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                };
            case 'error':
                return {
                    border: 'border-rose-500/30 bg-rose-950/20 text-rose-300',
                    icon: <AlertTriangle className="w-5 h-5 text-rose-450 flex-shrink-0" />
                };
            case 'warning':
                return {
                    border: 'border-amber-500/30 bg-amber-950/20 text-amber-300',
                    icon: <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                };
            case 'info':
            default:
                return {
                    border: 'border-sky-500/30 bg-sky-950/20 text-sky-300',
                    icon: <Info className="w-5 h-5 text-sky-400 flex-shrink-0" />
                };
        }
    };

    return (
        <ToastContext.Provider value={{ success, error, info, warning }}>
            {children}

            {/* Portals to render toasts at high z-index */}
            <div className="fixed top-6 right-6 z-[99999] flex flex-col gap-3 w-full max-w-sm pointer-events-none">
                <AnimatePresence>
                    {toasts.map((toast) => {
                        const style = getToastStyle(toast.type);
                        return (
                            <motion.div
                                key={toast.id}
                                layout
                                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
                                className={`pointer-events-auto w-full flex items-start gap-3 p-4 rounded-xl border backdrop-blur-xl shadow-2xl ${style.border}`}
                            >
                                {style.icon}
                                <div className="flex-1 text-xs font-semibold leading-relaxed">
                                    {toast.message}
                                </div>
                                <button
                                    onClick={() => removeToast(toast.id)}
                                    className="text-gray-400 hover:text-white transition flex-shrink-0"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
}
