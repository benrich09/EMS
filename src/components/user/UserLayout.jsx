import React from 'react';
import { Outlet,  } from 'react-router-dom';
import TopNav from './TopNav';
import SideNav from './SideNav';

export default function UserLayout() {

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            {/* Top Navigation */}
            <TopNav/>

            {/* Content Row: SideNav + Main */}
            <div className="flex flex-1">

                <div className="w-[20%] flex-shrink-0">
                    <SideNav/>
                </div>

                <main className="flex-1 pt-6 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 min-h-screen transition-all duration-300">
                    <Outlet />
                </main>

            </div>
        </div>
    );
}