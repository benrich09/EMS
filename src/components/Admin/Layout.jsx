import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { UserRound, Building, Banknote, Check, Menu, Bell, LogOut, Moon, Sun, ChevronLeft, ChevronRight } from 'lucide-react';

export default function AdminLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(256);
    const location = useLocation();
    const sidebarRef = useRef(null);
    const isResizing = useRef(false);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const toggleSidebarCollapse = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    const handleMouseDown = (e) => {
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

    const navItems = [
        { name: 'Dashboard', path: '/admin', icon: <UserRound className="h-5 w-5" /> },
        { name: 'Employees', path: '/admin/employees', icon: <UserRound className="h-5 w-5" /> },
        { name: 'Departments', path: '/admin/departments', icon: <Building className="h-5 w-5" /> },
        { name: 'Payroll', path: '/admin/payroll', icon: <Banknote className="h-5 w-5" /> },
        { name: 'Leave Management', path: '/admin/leaves', icon: <Check className="h-5 w-5" /> },
    ];

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
            {/* Top Navbar */}
            <nav className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center fixed w-full z-40">
                <div className="flex items-center">
                    <button
                        className="md:hidden text-gray-600 dark:text-gray-300 focus:outline-none"
                        onClick={toggleSidebar}
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white ml-4">
                        EMS Admin
                    </h1>
                </div>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={toggleTheme}
                        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                        title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    >
                        {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
                    </button>
                    <button
                        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                        title="Notifications"
                    >
                        <Bell className="h-6 w-6" />
                    </button>
                    <button
                        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                        title="User Profile"
                    >
                        <UserRound className="h-6 w-6" />
                    </button>
                    <button
                        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                        title="Logout"
                    >
                        <LogOut className="h-6 w-6" />
                    </button>
                </div>
            </nav>

            <div className="flex pt-16">
                {/* Sidebar */}
                <aside
                    ref={sidebarRef}
                    className={`fixed inset-y-0 left-0 bg-white dark:bg-gray-800 shadow-md transition-all duration-200 ease-in-out z-30 mt-16 ${
                        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0 ${isSidebarCollapsed ? 'w-16' : `w-[${sidebarWidth}px]`}`}
                    style={{ width: isSidebarCollapsed ? '64px' : `${sidebarWidth}px` }}
                >
                    <div className="p-4 flex flex-col h-full">
                        {/* Logo */}
                        <div className="mb-6 flex items-center justify-between">
                            {!isSidebarCollapsed && (
                                <div className="text-lg font-bold text-gray-900 dark:text-white">
                                    EMS
                                </div>
                            )}
                            <button
                                onClick={toggleSidebarCollapse}
                                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                            >
                                {isSidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
                            </button>
                        </div>
                        {/* Navigation */}
                        <nav className="space-y-2 flex-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                                        location.pathname === item.path
                                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                                            : 'text-gray-600 dark:text-gray-300'
                                    }`}
                                    onClick={() => setIsSidebarOpen(false)}
                                    title={isSidebarCollapsed ? item.name : ''}
                                >
                                    {item.icon}
                                    {!isSidebarCollapsed && <span className="ml-3">{item.name}</span>}
                                </Link>
                            ))}
                        </nav>
                    </div>
                    {/* Resize Handle */}
                    {!isSidebarCollapsed && (
                        <div
                            className="absolute top-0 right-0 w-1 h-full bg-gray-300 dark:bg-gray-600 cursor-col-resize"
                            onMouseDown={handleMouseDown}
                        ></div>
                    )}
                </aside>

                {/* Main Content */}
                <main className={`flex-1 p-4 md:p-8 transition-all duration-200 ${
                    isSidebarCollapsed ? 'md:ml-16' : `md:ml-[${sidebarWidth}px]`
                }`}>
                    <Outlet />
                </main>
            </div>

            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-20"
                    onClick={toggleSidebar}
                ></div>
            )}
        </div>
    );
}