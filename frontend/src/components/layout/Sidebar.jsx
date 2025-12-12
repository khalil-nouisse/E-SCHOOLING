import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../lib/utils';
import {
    LayoutDashboard,
    Files,
    Settings,
    LogOut,
    GraduationCap
} from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard' },
        { icon: Files, label: 'Applications', to: '/applications' },
        { icon: Settings, label: 'Settings', to: '/settings' },
    ];

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-slate-200 bg-slate-50/50">
            <div className="flex h-16 items-center border-b border-slate-200 px-6">
                <div className="flex items-center gap-2 font-bold text-xl text-slate-900">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                        <GraduationCap className="h-5 w-5" />
                    </div>
                    <span>e-Scolarité</span>
                </div>
            </div>

            <div className="flex h-[calc(100vh-4rem)] flex-col justify-between p-4">
                <nav className="space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) => cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-indigo-50 text-indigo-700"
                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-rose-50 hover:text-rose-700">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
