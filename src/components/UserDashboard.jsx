import React, { useState, useEffect } from 'react';
import { UserRound, Calendar, Home, LogOut, Bell, Settings } from 'lucide-react';

// Top Navigation Bar Component
function TopNavBar() {
    return (
        <div className="fixed top-0 left-64 right-0 h-16 bg-black text-white flex items-center justify-between px-6 shadow-md z-50">
            {/* App Title or Logo */}
            <div className="text-xl font-bold">MyApp</div>

            {/* Right-side Icons */}
            <div className="flex items-center space-x-6">
                <button className="hover:text-gray-300 transition">
                    <Bell className="w-5 h-5" />
                </button>
                <button className="hover:text-gray-300 transition">
                    <Settings className="w-5 h-5" />
                </button>
                <button className="flex items-center space-x-2 hover:text-gray-300 transition">
                    <UserRound className="w-6 h-6" />
                    <span className="hidden md:inline">User</span>
                </button>
            </div>
        </div>
    );
}

// Reusable Card Component
function StatCard({ icon: Icon, title, value }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Icon className="h-6 w-6 text-blue-700" />
                </div>
                <h2 className="text-lg font-semibold">{title}</h2>
            </div>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
    );
}

// Sidebar Component
function Sidebar() {
    return (
        <div className="w-64 h-screen bg-gray-900 text-white p-6 fixed top-0 left-0 shadow-lg">
            <h2 className="text-2xl font-bold mb-8 text-blue-400">User Panel</h2>
            <nav className="space-y-4">
                <a href="#" className="flex items-center hover:bg-gray-800 px-3 py-2 rounded transition">
                    <Home className="w-5 h-5 mr-2 text-blue-300" /> Dashboard
                </a>
                <a href="#" className="flex items-center hover:bg-gray-800 px-3 py-2 rounded transition">
                    <UserRound className="w-5 h-5 mr-2 text-blue-300" /> Profile
                </a>
                <a href="#" className="flex items-center hover:bg-gray-800 px-3 py-2 rounded transition">
                    <Calendar className="w-5 h-5 mr-2 text-blue-300" /> Pay Info
                </a>
                <a href="#" className="flex items-center hover:bg-red-600 px-3 py-2 rounded transition mt-8">
                    <LogOut className="w-5 h-5 mr-2 text-white" /> Logout
                </a>
            </nav>
        </div>
    );
}

// Main Dashboard
export default function UserDashboard() {
    const [userStats, setUserStats] = useState({
        leavesTaken: 5,
        leavesRemaining: 15,
        nextPayDate: 'September 15, 2025',
    });

    useEffect(() => {
        // Mock fetch; replace with API call
        const fetchData = async () => {
            const data = {
                leavesTaken: 5,
                leavesRemaining: 15,
                nextPayDate: 'September 15, 2025',
            };
            setUserStats(data);
        };
        fetchData();
    }, []);

    return (
        <div className="flex">
            <Sidebar />
            <TopNavBar />

            <main className="ml-64 w-full pt-20 px-8">
                <h1 className="text-3xl font-bold mb-8">User Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard icon={UserRound} title="Leaves Taken" value={userStats.leavesTaken} />
                    <StatCard icon={UserRound} title="Leaves Remaining" value={userStats.leavesRemaining} />
                    <StatCard icon={Calendar} title="Next Pay Date" value={userStats.nextPayDate} />
                </div>
            </main>
        </div>
    );
}
