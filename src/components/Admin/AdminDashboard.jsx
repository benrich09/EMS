import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { UserRound, Building, Banknote, Check, Menu, Bell, LogOut, Moon, Sun, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
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

    const dashboardCards = [
        {
            title: 'Total Employees',
            value: '150',
            icon: <UserRound className="h-8 w-8 text-blue-500" />,
            path: '/admin/employees',
        },
        {
            title: 'Total Departments',
            value: '5',
            icon: <Building className="h-8 w-8 text-green-500" />,
            path: '/admin/departments',
        },
        {
            title: 'Pending Leaves',
            value: '10',
            icon: <Check className="h-8 w-8 text-yellow-500" />,
            path: '/admin/leaves',
        },
        {
            title: 'Monthly Payroll',
            value: '$500,000',
            icon: <Banknote className="h-8 w-8 text-red-500" />,
            path: '/admin/payroll',
        },
        {
            title: 'New Hires This Month',
            value: '8',
            icon: <UserRound className="h-8 w-8 text-purple-500" />,
        },
        {
            title: 'Terminations This Month',
            value: '3',
            icon: <LogOut className="h-8 w-8 text-orange-500" />,
        },
        {
            title: 'Average Attendance Rate',
            value: '95%',
            icon: <Check className="h-8 w-8 text-indigo-500" />,
        },
        {
            title: 'Total Overtime Hours',
            value: '450',
            icon: <Clock className="h-8 w-8 text-pink-500" />,
        },
    ];

    const quickActions = [
        {
            name: 'Add New Employee',
            path: '/admin/employees/add',
            color: 'bg-blue-500 hover:bg-blue-600',
        },
        {
            name: 'Run Payroll',
            path: '/admin/payroll/run',
            color: 'bg-green-500 hover:bg-green-600',
        },
        {
            name: 'Create Department',
            path: '/admin/departments/create',
            color: 'bg-yellow-500 hover:bg-yellow-600',
        },
        {
            name: 'Approve Leaves',
            path: '/admin/leaves/approve',
            color: 'bg-red-500 hover:bg-red-600',
        },
    ];

    const recentActivities = [
        'Employee John Doe requested 3 days of leave.',
        'Payroll for August processed successfully.',
        'New department "Marketing" created.',
        'Employee Jane Smith promoted to Senior Developer.',
        'System update: Added new overtime tracking feature.',
    ];

    const chartData = [
        { name: 'Jan', employees: 120, leaves: 15 },
        { name: 'Feb', employees: 130, leaves: 20 },
        { name: 'Mar', employees: 135, leaves: 18 },
        { name: 'Apr', employees: 140, leaves: 22 },
        { name: 'May', employees: 145, leaves: 25 },
        { name: 'Jun', employees: 150, leaves: 20 },
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
                    {location.pathname === '/admin' ? (
                        <>
                            {/* Dashboard Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {dashboardCards.map((card, index) => (
                                    card.path ? (
                                        <Link
                                            to={card.path}
                                            key={index}
                                            className="block bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 hover:scale-105 transition-transform duration-200"
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{card.title}</h3>
                                                {card.icon}
                                            </div>
                                            <p className="text-3xl font-bold text-gray-900 dark:text-white">{card.value}</p>
                                        </Link>
                                    ) : (
                                        <div
                                            key={index}
                                            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 hover:scale-105 transition-transform duration-200 cursor-pointer"
                                            onClick={() => alert(`Details for ${card.title}`)} // Placeholder interactivity
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{card.title}</h3>
                                                {card.icon}
                                            </div>
                                            <p className="text-3xl font-bold text-gray-900 dark:text-white">{card.value}</p>
                                        </div>
                                    )
                                ))}
                            </div>

                            {/* Quick Actions */}
                            <div className="mt-8">
                                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Quick Actions</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {quickActions.map((action, index) => (
                                        <Link
                                            key={index}
                                            to={action.path}
                                            className={`${action.color} text-white p-4 rounded-lg flex items-center justify-center transition-colors duration-200 font-semibold hover:scale-105 transition-transform duration-200`}
                                        >
                                            {action.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className="mt-8">
                                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Recent Activity</h2>
                                <ul className="bg-white dark:bg-gray-800 rounded-lg shadow-md divide-y divide-gray-200 dark:divide-gray-700">
                                    {recentActivities.map((activity, index) => (
                                        <li key={index} className="p-4 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                                            {activity}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Employee Growth Chart */}
                            <div className="mt-8">
                                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Employee and Leave Trends</h2>
                                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={chartData}>
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="employees" fill="#8884d8" name="Employees" />
                                            <Bar dataKey="leaves" fill="#82ca9d" name="Leaves" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </>
                    ) : (
                        <Outlet />
                    )}
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