import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { useState } from 'react';

export function AppShell() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen overflow-hidden bg-[var(--bg-primary)]">
            <Sidebar isOpen={sidebarOpen} />
            <div className="flex-1 flex flex-col min-w-0 relative overflow-hidden">
                <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <main className="flex-1 overflow-y-auto px-4 md:px-6 pb-6 pt-2 custom-scrollbar">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
