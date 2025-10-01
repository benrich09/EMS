import React, { useState, useEffect } from 'react';
import {Outlet, Link, useLocation, useNavigate} from 'react-router-dom';
import { Home, Building, Banknote, Check, LogOut, Moon, Sun, UserRound } from 'lucide-react';

export default function AdminLayout() {
    const location = useLocation();
    const navigate = useNavigate();

    // Placeholder for logout action
    const handleLogout = () => {
        alert('Logged out!'); // Replace with actual logout logic
        navigate('/login')
    };

    {/* Side Navigation bar items*/}
    const navItems = [
        { name: 'Dashboard', path: '/admin', icon: <Home className="h-5 w-5" /> },
        { name: 'Employees', path: '/admin/employees', icon: <UserRound className="h-5 w-5" /> },
        { name: 'Departments', path: '/admin/departments', icon: <Building className="h-5 w-5" /> },
        { name: 'Payroll', path: '/admin/payroll', icon: <Banknote className="h-5 w-5" /> },
        { name: 'Leave Management', path: '/admin/leaves', icon: <Check className="h-5 w-5" /> },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 font-sans">

            {/* Top Navbar */}
            <nav className="bg-white dark:bg-gray-800 shadow-lg p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">

                <div className="flex items-center space-x-4">

                    <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                        EMS Admin
                    </h1>

                </div>

                <div className="flex items-center space-x-6">



                    <button
                        onClick={handleLogout}
                        className="flex items-center px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 transition-colors duration-200 shadow-md"
                        aria-label="Logout"
                    >

                        <LogOut className="h-5 w-5 mr-2" />
                        <span>Logout</span>

                    </button>

                </div>

            </nav>

            {/* Main Content Area */}
            <div className="flex flex-1">

                {/* Sidebar */}
                <aside className="w-[20%] flex-shrink-0 bg-white dark:bg-gray-800 shadow-xl border-r border-gray-200 dark:border-gray-700">
                    <div className="p-4 flex flex-col h-full">

                        {/* Logo */}
                        <div className="mb-6">

                            <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                                EMS
                            </div>

                        </div>

                        {/* Side Navigation bar items called from the declaration */}
                        <nav className="space-y-1 flex-1">
                            {navItems.map((item) => (

                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`flex items-center p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-105 
                                          ${location.pathname === item.path
                                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                                        : 'text-gray-600 dark:text-gray-300'}`}
                                    aria-label={item.name}>

                                    <div className="flex items-center justify-center w-8 mr-3">
                                        {item.icon}
                                    </div>

                                    <span className="font-medium">
                                        {item.name}
                                    </span>

                                </Link>

                            ))}
                        </nav>

                    </div>

                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6 md:p-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg m-4 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}