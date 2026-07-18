import React from 'react';
import { LogOut, Menu, User } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from '../ThemeToggle';

export default function TopNav({ onMenuToggle }) {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        alert('Logged out!');
        navigate('/login');
    };

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-lg p-3 sm:p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
                <button 
                    onClick={onMenuToggle}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 sm:hidden"
                >
                    <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                </button>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                    Hi, Ben Rich
                </h1>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
                <ThemeToggle />
                <button
                    onClick={handleLogout}
                    className="flex items-center px-3 sm:px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm sm:text-base"
                >
                    <LogOut className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Logout
                </button>
            </div>
        </nav>
    );
}