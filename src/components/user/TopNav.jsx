import React from 'react';
import { Menu, X as CloseIcon, Bell, Moon, Sun } from 'lucide-react';

const TopNav = ({ isSidebarOpen, toggleSidebar, toggleTheme, isDarkMode }) => {
    return (
        <nav className="fixed top-0 left-0 right-0 h-16 bg-black dark:bg-gray-800 text-white flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-md z-40">
            <div className="flex items-center space-x-4">
                <button
                    className="text-white"
                    onClick={toggleSidebar}
                    aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
                >
                    {isSidebarOpen ? <CloseIcon className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
                <div className="text-lg sm:text-xl font-bold">Employee Management System</div>
            </div>
            <div className="flex items-center space-x-4 sm:space-x-6">
                <button
                    onClick={toggleTheme}
                    className="hover:text-gray-300 transition"
                    title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                    {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <button
                    className="hover:text-gray-300 transition"
                    aria-label="Notifications"
                >
                    <Bell className="w-5 h-5" />
                </button>
            </div>
        </nav>
    );
};

export default TopNav;