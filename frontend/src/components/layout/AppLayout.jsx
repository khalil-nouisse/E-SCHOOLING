import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const AppLayout = () => {
    return (
        <div className="min-h-screen bg-white">
            <Sidebar />
            <div className="pl-64">
                <Header />
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AppLayout;
