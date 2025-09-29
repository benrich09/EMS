import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import TopNav from './TopNav';
import SideNav from './SideNav';

export default function UserLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const location = useLocation();

    useEffect(() => {
        try {
            if (isDarkMode) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        } catch (error) {
            console.error('Error toggling dark mode:', error);
        }
    }, [isDarkMode]);

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    const toggleSidebarCollapse = () => {
        setIsSidebarCollapsed((prev) => !prev);
    };

    const toggleTheme = () => {
        setIsDarkMode((prev) => !prev);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            {/* Top Navigation */}
            <TopNav
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                toggleTheme={toggleTheme}
                isDarkMode={isDarkMode}
            />

            {/* Content Row: SideNav + Main */}
            <div className="flex flex-1">
                <SideNav
                    isSidebarOpen={isSidebarOpen}
                    isSidebarCollapsed={isSidebarCollapsed}
                    toggleSidebar={toggleSidebar}
                    toggleSidebarCollapse={toggleSidebarCollapse}
                    location={location}
                />
                <main
                    className={`w-full pt-6 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 min-h-screen transition-all duration-300 ${
                        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
                    }`}
                >
                    <Outlet />
                </main>
            </div>

            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-20"
                    onClick={toggleSidebar}
                    aria-hidden="true"
                ></div>
            )}
        </div>
    );
}
