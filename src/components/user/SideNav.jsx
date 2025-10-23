import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, Users, Briefcase, Settings, LaptopMinimalCheck, X } from 'lucide-react';

export default function SideNav({ onClose }) {
    const location = useLocation();
    
    const navItems = [
        { name: 'Home', path: '/dashboard', icon: Home },
        { name: 'Profile', path: '/dashboard/profile', icon: User },
        { name: 'Pay Info', path: '/dashboard/payinfo', icon: Briefcase },
        { name: 'Team', path: '/dashboard/teampage', icon: Users },
        { name: 'Tasks', path: '/dashboard/taskpage', icon: LaptopMinimalCheck },
        { name: 'Settings', path: '/dashboard/setting', icon: Settings },
    ];

    return (
        <nav className="h-full p-2 sm:p-4 border-r border-gray-200 dark:border-gray-700">
            {/* Mobile Close Button */}
            <button 
                onClick={onClose}
                className="sm:hidden mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
                <X className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </button>
            
            <ul className="space-y-1 sm:space-y-2">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            onClick={onClose}
                            className={`
                                flex items-center p-3 rounded-lg transition-colors text-sm sm:text-base
                                ${isActive
                                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }
                            `}
                        >
                            <item.icon className="h-4 w-4 sm:h-5 sm:w-5 mr-3 flex-shrink-0" />
                            <span className="truncate">{item.name}</span>
                        </Link>
                    );
                })}
            </ul>
        </nav>
    );
}