import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { cn } from '../../lib/utils';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'info', duration = 3000) => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts(prev => [...prev, { id, message, type }]);

        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, duration);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        className={cn(
                            "flex items-center gap-3 min-w-[300px] max-w-md p-4 rounded-lg shadow-lg border animate-in slide-in-from-right-full duration-300",
                            toast.type === 'success' && "bg-white border-emerald-100 text-slate-800",
                            toast.type === 'error' && "bg-white border-rose-100 text-slate-800",
                            toast.type === 'info' && "bg-white border-slate-100 text-slate-800"
                        )}
                    >
                        <div className={cn(
                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                            toast.type === 'success' && "bg-emerald-100 text-emerald-600",
                            toast.type === 'error' && "bg-rose-100 text-rose-600",
                            toast.type === 'info' && "bg-slate-100 text-slate-600"
                        )}>
                            {toast.type === 'success' && <CheckCircle className="h-4 w-4" />}
                            {toast.type === 'error' && <AlertCircle className="h-4 w-4" />}
                            {toast.type === 'info' && <Info className="h-4 w-4" />}
                        </div>
                        <p className="text-sm font-medium flex-1">{toast.message}</p>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
