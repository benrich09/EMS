import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
    Home, Building, Banknote, Check, LogOut, Sun, 
    Menu, X, ChevronDown 
} from 'lucide-react';
import { ThemeToggle } from '../ThemeToggle';

export default function AdminLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const handleLogout = () => {
        // Replace with actual logout logic
        localStorage.removeItem('token');
        navigate('/login');
    };

    const navItems = [
        { name: 'Dashboard', path: '/admin', icon: <Home className="h-5 w-5" /> },
        { name: 'Employees', path: '/admin/employees', icon: <Home className="h-5 w-5" /> },
        { name: 'Departments', path: '/admin/departments', icon: <Building className="h-5 w-5" /> },
        { name: 'Payroll', path: '/admin/payroll', icon: <Banknote className="h-5 w-5" /> },
        { name: 'Leave Management', path: '/admin/leaves', icon: <Check className="h-5 w-5" /> },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 transition-colors duration-300 font-sans">
            
            {/* Enhanced Top Navbar - Mobile Responsive */}
            <nav className="bg-white/80 dark:bg-gray-800/95 backdrop-blur-md shadow-xl border-b border-blue-200/50 dark:border-gray-700 sticky top-0 z-50">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        
                        {/* Left: Logo + Mobile Menu Button */}
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="lg:hidden p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700"
                            >
                                {isMobileMenuOpen ? <X className="h-5 w-5 text-blue-600 dark:text-blue-400" /> : <Menu className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
                            </button>
                            
                            <Link to="/admin" className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
                                    <Home className="h-4 w-4 text-white" />
                                </div>
                                <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 hidden sm:block">
                                    EMS Admin
                                </h1>
                            </Link>
                        </div>

                        {/* Right: Theme Icon Only + Logout */}
                        <div className="flex items-center space-x-2 sm:space-x-4">
                            <ThemeToggle />
                            
                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 dark:from-blue-700 dark:to-indigo-700 transition-all duration-200 shadow-lg hidden sm:flex"
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
                {isMobileMenuOpen && (
                    <div className="lg:hidden bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 border-t border-blue-200 dark:border-gray-600">
                        <div className="px-4 py-2 space-y-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
                                        location.pathname === item.path
                                            ? 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 dark:from-blue-900 dark:to-indigo-900 dark:text-blue-300 shadow-md'
                                            : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-600'
                                    }`}
                                >
                                    <div className="w-6 mr-3 flex items-center justify-center">
                                        {React.cloneElement(item.icon, {
                                            className: `h-5 w-5 ${
                                                location.pathname === item.path 
                                                    ? 'text-blue-600 dark:text-blue-400' 
                                                    : 'text-gray-600 dark:text-gray-300'
                                            }`
                                        })}
                                    </div>
                                    <span className="font-medium">{item.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content Area */}
            <div className="flex flex-1 overflow-hidden">
                
                {/* Desktop Sidebar - BLUE COLORS & BACKGROUND */}
                <aside className={`${
                    isSidebarCollapsed ? 'w-20' : 'w-64'
                } hidden lg:flex flex-shrink-0 bg-white/80 dark:bg-gray-800/95 backdrop-blur-md shadow-2xl border-r border-blue-200/50 dark:border-gray-700 transition-all duration-300`}>
                    <div className="flex flex-col h-full">
                        <div className="p-4 flex items-center justify-center">
                            <div className={`text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 ${
                                isSidebarCollapsed ? 'hidden' : 'block'
                            }`}>
                                EMS
                            </div>
                            <button
                                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                                className="p-1 rounded hover:bg-blue-100 dark:hover:bg-gray-700"
                            >
                                {isSidebarCollapsed ? <Menu className="h-5 w-5 text-blue-600 dark:text-blue-400" /> : <X className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
                            </button>
                        </div>

                        <nav className="flex-1 px-2 py-4 space-y-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`group flex items-center p-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] ${
                                        location.pathname === item.path
                                            ? 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 dark:from-blue-900 dark:to-indigo-900 dark:text-blue-300 shadow-md'
                                            : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'
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
                                    {!isSidebarCollapsed && (
                                        <span className="font-medium text-sm">{item.name}</span>
                                    )}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* Main Content - BLUE BACKGROUND */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-blue-50/50 via-indigo-50/50 to-cyan-50/50 dark:from-gray-900/50 dark:via-gray-800/50 dark:to-gray-950/50 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}