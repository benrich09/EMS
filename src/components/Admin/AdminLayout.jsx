import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Building, Banknote, Check, Menu, LogOut, Moon, Sun, ChevronLeft, ChevronRight, UserRound } from 'lucide-react';

export default function AdminLayout() {
    // Initialize dark mode based on localStorage or system preference
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme === 'dark';
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar hidden by default
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true); // Sidebar collapsed by default
    const [sidebarWidth, setSidebarWidth] = useState(256);
    const location = useLocation();
    const sidebarRef = useRef(null);
    const isResizing = useRef(false);

    // Handle dark mode toggle and persist to localStorage
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    // Listen for system theme changes
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => {
            if (!localStorage.getItem('theme')) {
                setIsDarkMode(e.matches);
            }
        };
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Toggle dark/light mode
    const toggleTheme = () => {
        setIsDarkMode((prev) => !prev);
    };

    // Toggle sidebar collapse (desktop)
    const toggleSidebarCollapse = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
        if (isSidebarCollapsed) setSidebarWidth(256); // Reset width when expanding
    };

    // Handle sidebar resizing
    const handleMouseDown = (e) => {
        if (isSidebarCollapsed) return;
        isResizing.current = true;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e) => {
        if (!isResizing.current) return;
        const newWidth = e.clientX;
        if (newWidth >= 150 && newWidth <= 400) {
            setSidebarWidth(newWidth);
        }
    };

    const handleMouseUp = () => {
        isResizing.current = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    // Placeholder for logout action
    const handleLogout = () => {
        alert('Logged out!'); // Replace with actual logout logic
    };

    const navItems = [
        { name: 'Dashboard', path: '/admin', icon: <Home className="h-5 w-5" /> },
        { name: 'Employees', path: '/admin/employees', icon: <UserRound className="h-5 w-5" /> },
        { name: 'Departments', path: '/admin/departments', icon: <Building className="h-5 w-5" /> },
        { name: 'Payroll', path: '/admin/payroll', icon: <Banknote className="h-5 w-5" /> },
        { name: 'Leave Management', path: '/admin/leaves', icon: <Check className="h-5 w-5" /> },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 font-sans">
            {/* Top Navbar */}
            <nav className="bg-white dark:bg-gray-800 shadow-lg p-4 flex justify-between items-center fixed top-0 w-full z-50 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-4">
                    <button
                        className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={toggleSidebar}
                        aria-label="Toggle Sidebar"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                    <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                        EMS Admin
                    </h1>
                </div>
                <div className="flex items-center space-x-6">
                    <button
                        onClick={toggleTheme}
                        className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                        aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    >
                        {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
                    </button>
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

            <div className="flex">
                {/* Sidebar */}
                <aside
                    ref={sidebarRef}
                    className={`fixed inset-y-0 left-0 bg-white dark:bg-gray-800 shadow-xl transition-all duration-300 ease-in-out z-40 border-r border-gray-200 dark:border-gray-700 
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                    md:${isSidebarCollapsed ? 'w-16' : `w-[${sidebarWidth}px]`}`}
                    style={{ width: isSidebarOpen ? (isSidebarCollapsed ? '64px' : `${sidebarWidth}px`) : '0px' }}
                >
                    <div className="p-4 flex flex-col h-full">
                        {/* Logo */}
                        <div className="mb-6 flex items-center justify-between">
                            <div
                                className={`text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 transition-opacity duration-200 ${
                                    isSidebarCollapsed && !isSidebarOpen ? 'opacity-0 w-0' : 'opacity-100'
                                }`}
                            >
                                EMS
                            </div>
                            <button
                                onClick={toggleSidebarCollapse}
                                className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                                aria-label={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
                            >
                                {isSidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
                            </button>
                        </div>
                        {/* Navigation */}
                        <nav className="space-y-1 flex-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`flex items-center p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-105 
                                    ${location.pathname === item.path
                                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                                        : 'text-gray-600 dark:text-gray-300'}`}
                                    onClick={() => setIsSidebarOpen(false)}
                                    title={isSidebarCollapsed && !isSidebarOpen ? item.name : ''}
                                    aria-label={item.name}
                                >
                                    <div className="flex items-center justify-center w-8">
                                        {item.icon}
                                    </div>
                                    <span
                                        className={`ml-3 font-medium transition-opacity duration-200 ${
                                            isSidebarCollapsed && !isSidebarOpen ? 'opacity-0 w-0' : 'opacity-100'
                                        }`}
                                    >
                                        {item.name}
                                    </span>
                                </Link>
                            ))}
                        </nav>
                    </div>
                    {/* Resize Handle */}
                    {!isSidebarCollapsed && (
                        <div
                            className="absolute top-0 right-0 w-2 h-full bg-blue-200 dark:bg-blue-900 cursor-col-resize hover:bg-blue-300 dark:hover:bg-blue-800 transition-colors duration-200"
                            onMouseDown={handleMouseDown}
                            aria-hidden="true"
                        ></div>
                    )}
                </aside>

                {/* Main Content */}
                <main
                    className={`flex-1 p-6 md:p-10 transition-all duration-300 mt-16 
                    ${isSidebarOpen ? (isSidebarCollapsed ? 'ml-16' : `ml-[${sidebarWidth}px]`) : 'ml-0'} 
                    md:${isSidebarCollapsed ? 'md:ml-16' : `md:ml-[${sidebarWidth}px]`} 
                    bg-white dark:bg-gray-800 rounded-xl shadow-lg m-4`}
                >
                    <Outlet />
                </main>
            </div>

            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-60 md:hidden z-30 transition-opacity duration-300"
                    onClick={toggleSidebar}
                    aria-hidden="true"
                ></div>
            )}
        </div>
    );
}