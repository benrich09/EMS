// HRISELINK / CLEARIQ-style shell: white left sidebar with grouped nav,
// clean top bar with global search — desktop-first, nothing opens or closes.
import React from 'react';
import { Outlet, Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, Users, Building2, Banknote, CalendarCheck,
    Search, Bell, LogOut, MessageSquareText, Settings,
} from 'lucide-react';
import { ThemeToggle } from '../ThemeToggle';

const navGroups = [
    {
        label: 'Menu',
        items: [
            { name: 'Dashboard',   path: '/admin',             icon: LayoutDashboard, end: true },
            { name: 'Employees',   path: '/admin/employees',   icon: Users },
            { name: 'Departments', path: '/admin/departments', icon: Building2 },
        ],
    },
    {
        label: 'Finance',
        items: [
            { name: 'Payroll',          path: '/admin/payroll', icon: Banknote },
            { name: 'Leave Management', path: '/admin/leaves',  icon: CalendarCheck },
        ],
    },
];

const pageTitles: Record<string, string> = {
    '/admin': 'Dashboard',
    '/admin/employees': 'Employees',
    '/admin/departments': 'Departments',
    '/admin/payroll': 'Payroll',
    '/admin/leaves': 'Leave Management',
};

export default function AdminLayout() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white">

            {/* Sidebar — fixed, white, grouped like HRISELINK */}
            <aside className="w-60 shrink-0 flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2.5 px-5 h-16 border-b border-gray-100 dark:border-gray-800">
                    <span className="w-8 h-8 rounded-lg bg-gray-900 dark:bg-white flex items-center justify-center">
                        <LayoutDashboard size={15} className="text-white dark:text-gray-900" />
                    </span>
                    <span className="font-bold tracking-tight">EMS<span className="text-blue-600">LINK</span></span>
                </div>

                <div className="px-4 pt-4">
                    <div className="relative">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            placeholder="Search…"
                            className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 pl-8 pr-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
                        />
                    </div>
                </div>

                <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto">
                    {navGroups.map((group) => (
                        <div key={group.label}>
                            <p className="px-2 mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                                {group.label}
                            </p>
                            <div className="space-y-0.5">
                                {group.items.map((item) => (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        end={item.end}
                                        className={({ isActive }) =>
                                            `flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium transition-colors ${
                                                isActive
                                                    ? 'bg-blue-600 text-white shadow-sm'
                                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                            }`
                                        }
                                    >
                                        <item.icon size={16} />
                                        {item.name}
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>

                <div className="p-3 border-t border-gray-100 dark:border-gray-800 space-y-0.5">
                    <button className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <Settings size={16} /> Settings
                    </button>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                    >
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main */}
            <div className="flex-1 flex flex-col min-w-0">
                <header className="h-16 shrink-0 flex items-center justify-between px-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
                    <h1 className="text-lg font-bold">
                        {pageTitles[location.pathname] || 'Dashboard'}
                    </h1>

                    <div className="flex items-center gap-2">
                        <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors" aria-label="Messages">
                            <MessageSquareText size={16} />
                        </button>
                        <button className="relative w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors" aria-label="Notifications">
                            <Bell size={16} />
                            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
                        </button>
                        <ThemeToggle />
                        <div className="flex items-center gap-2.5 pl-2 ml-1 border-l border-gray-200 dark:border-gray-700">
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">A</div>
                            <div className="leading-tight">
                                <p className="text-xs font-semibold">Admin</p>
                                <p className="text-[10px] text-gray-400">Administrator</p>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-6 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
