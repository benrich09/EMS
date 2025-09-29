import React from 'react';
import { Link } from 'react-router-dom';
import { UserRound, Calendar, Home, LogOut, Settings, Briefcase, Users, ChevronLeft, ChevronRight, X as CloseIcon } from 'lucide-react';

const SideNav = ({ isSidebarOpen, isSidebarCollapsed, toggleSidebar, toggleSidebarCollapse, location }) => {
    return (

        <aside
            className={`fixed top-0 left-0 h-screen bg-gray-900 dark:bg-gray-800 text-white p-4 sm:p-6 transform transition-all duration-300 ease-in-out z-50 shadow-lg flex flex-col justify-between
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                ${isSidebarCollapsed ? 'w-16' : 'w-64'} 
                lg:translate-x-0`}
        >
            <div>
                <div className="flex justify-between items-center mb-8">
                    {!isSidebarCollapsed && (
                        <h2 className="text-xl sm:text-2xl font-bold text-blue-400">Employee Panel</h2>
                    )}
                    <div className="flex items-center space-x-2">
                        <button
                            className="hidden lg:block text-white"
                            onClick={toggleSidebarCollapse}
                            aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                        >
                            {isSidebarCollapsed ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
                        </button>
                        <button
                            className="lg:hidden text-white"
                            onClick={toggleSidebar}
                            aria-label="Close sidebar"
                        >
                            <CloseIcon className="w-6 h-6" />
                        </button>
                    </div>
                </div>
                <nav className="space-y-4">
                    {[
                        { to: '/dashboard', icon: Home, label: 'Dashboard' },
                        { to: '/dashboard/profile', icon: UserRound, label: 'Profile' },
                        { to: '/dashboard/payinfo', icon: Calendar, label: 'Pay Info' },
                        { to: '/dashboard/teampage', icon: Users, label: 'Team' },
                        { to: '/dashboard/taskpage', icon: Briefcase, label: 'Tasks' },
                        { to: '/dashboard/settings', icon: Settings, label: 'Settings' },
                    ].map(({ to, icon: Icon, label }) => (
                        <Link
                            key={to}
                            to={to}
                            onClick={() => toggleSidebar()}
                            className={`flex items-center px-3 py-2 rounded transition ${
                                location.pathname === to ? 'bg-gray-800' : 'hover:bg-gray-800'
                            }`}
                            title={isSidebarCollapsed ? label : ''}
                            aria-label={label}
                        >
                            <Icon className="w-5 h-5 mr-2 text-blue-300" />
                            {!isSidebarCollapsed && label}
                        </Link>
                    ))}
                </nav>
            </div>
            <Link
                to="/dashboard/logout"
                onClick={() => toggleSidebar()}
                className={`flex items-center justify-center px-3 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200`}
                title={isSidebarCollapsed ? 'Logout' : ''}
                aria-label="Logout"
            >
                <LogOut className="w-5 h-5 mr-2" />
                {!isSidebarCollapsed && 'Logout'}
            </Link>
        </aside>
    );
};

export default SideNav;