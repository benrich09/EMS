import React from 'react';
import { LogOut, Thermometer } from 'lucide-react';
import {useNavigate} from "react-router-dom";
import { ThemeToggle } from '../ThemeToggle';

export default function TopNav() {
    const navigate = useNavigate();
    const handleLogout = () => {
        alert('Logged out!');
        navigate('/login')// Replace with actual logic
    };

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-lg p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Hi, User</h1>

            <ThemeToggle/>
            <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
                
                <LogOut className="h-5 w-5 mr-2" />
                Logout
            </button>
        </nav>
    );
}