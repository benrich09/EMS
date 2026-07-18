import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
    Home, User, Users, Briefcase, Settings, Check, 
    LogOut, Sun, Menu, X, ChevronDown 
} from 'lucide-react';
import { ThemeToggle } from '../ThemeToggle';

export default function UserLayout() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: <Home className="h-5 w-5" /> },
        { name: 'Profile', path: '/dashboard/profile', icon: <User className="h-5 w-5" /> },
        { name: 'Pay Info', path: '/dashboard/payinfo', icon: <Briefcase className="h-5 w-5" /> },
        { name: 'Team', path: '/dashboard/teampage', icon: <Users className="h-5 w-5" /> },
        { name: 'Leaves', path: '/dashboard/leaves', icon: <Check className="h-5 w-5" /> },
        { name: 'Settings', path: '/dashboard/setting', icon: <Settings className="h-5 w-5" /> },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 font-sans">
            
            {/* Top Navbar - IDENTICAL TO ADMIN */}
            <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Left: Logo + Mobile Menu Button */}
                        <div className="flex items-center space-x-2">
                                                        <Link to="/dashboard" className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                                    <User className="h-4 w-4 text-white" />
                                </div>
                                <h1 className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
                                    EMS User
                                </h1>
                            </Link>
                        </div>

                        {/* Right: Theme + Logout */}
                        <div className="flex items-center space-x-2 sm:space-x-4">
                            <ThemeToggle />
                            
                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors hidden sm:flex"
                            >
                                <LogOut className="h-4 w-4" />
                                <span>Logout</span>
                            </button>

                            {/* Mobile Logout */}
                            <button
                                onClick={handleLogout}
                                className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700 sm:hidden"
                            >
                                <LogOut className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu - BLUE COLORS */}
                            </nav>

            {/* Main Content Area */}
            <div className="flex flex-1 overflow-hidden">
                
                {/* Desktop Sidebar - IDENTICAL TO ADMIN */}
                <aside className={`w-64 hidden lg:flex flex-shrink-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800`}>
                    <div className="flex flex-col h-full">
                        <div className="p-4 flex items-center justify-center">
                            <div className={`text-xl font-bold text-gray-900 dark:text-white block`}>
                                EMS
                            </div>
                                                    </div>

                        <nav className="flex-1 px-2 py-4 space-y-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`group flex items-center p-3 rounded-lg transition-all duration-200 ${
                                        location.pathname === item.path
                                            ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 font-semibold'
                                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                    }`}
                                >
                                    <div className="flex items-center justify-center w-10 mr-3">
                                        {React.cloneElement(item.icon, {
                                            className: `h-5 w-5 ${
                                                location.pathname === item.path 
                                                    ? 'text-blue-600 dark:text-blue-400' 
                                                    : 'text-gray-600 dark:text-gray-300'
                                            }`
                                        })}
                                    </div>
                                    <span className="font-medium text-sm">{item.name}</span>
                                </Link>
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* Main Content - BLUE BACKGROUND */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-950 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}