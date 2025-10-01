import React from 'react';
import { Link } from 'react-router-dom';
import { Home, User, Users, Briefcase, Settings, LaptopMinimalCheck} from 'lucide-react';

export default function SideNav() {
    const navItems = [
        { name: 'Home', path: '/dashboard', icon: <Home className="h-5 w-5" /> },
        { name: 'Profile', path: '/dashboard/profile', icon: <User className="h-5 w-5" /> },
        { name: 'Pay Info', path: '/dashboard/payinfo', icon: <Briefcase className="h-5 w-5" /> },
        { name: 'Team', path: '/dashboard/teampage', icon: <Users className="h-5 w-5" /> },
        { name: 'Task Page', path: '/dashboard/taskpage', icon: <LaptopMinimalCheck className="h-5 w-5" /> },
        { name: 'Settings', path: '/dashboard/setting', icon: <Settings className="h-5 w-5" /> },
    ];

    return (
        <nav className="bg-white dark:bg-gray-800 h-full p-4 border-r border-gray-200 dark:border-gray-700">
            <ul className="space-y-2">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        to={item.path}
                        className="flex items-center p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        {item.icon}
                        <span className="ml-3">{item.name}</span>
                    </Link>
                ))}
            </ul>
        </nav>
    );
}