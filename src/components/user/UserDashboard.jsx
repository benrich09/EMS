import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { UserRound, Calendar, Home, LogOut, Bell, Settings, Briefcase, FileText, Users, Clock } from 'lucide-react';

// StatCard Component
function StatCard({ icon: Icon, title, value, color = 'blue' }) {
    const colorClasses = {
        blue: 'bg-blue-100 text-blue-700',
        green: 'bg-green-100 text-green-700',
        purple: 'bg-purple-100 text-purple-700',
        orange: 'bg-orange-100 text-orange-700',
    };

    return (
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
                <div className={`${colorClasses[color]} p-3 rounded-full mr-4`}>
                    <Icon className="h-6 w-6" />
                </div>
                <h2 className="text-base md:text-lg font-semibold">{title}</h2>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-gray-900">{value}</p>
        </div>
    );
}

// ActivityTable Component
function ActivityTable({ activities }) {
    return (
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100 mt-8 overflow-x-auto">
            <h2 className="text-lg md:text-xl font-bold mb-4">Recent Activities</h2>
            <table className="w-full table-auto min-w-[600px]">
                <thead>
                <tr className="bg-gray-100 text-left">
                    <th className="p-3">Date</th>
                    <th className="p-3">Action</th>
                    <th className="p-3">Details</th>
                </tr>
                </thead>
                <tbody>
                {activities.map((activity, index) => (
                    <tr key={index} className="border-t">
                        <td className="p-3">{activity.date}</td>
                        <td className="p-3">{activity.action}</td>
                        <td className="p-3">{activity.details}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

// Sidebar Component
function Sidebar({ isOpen, toggleSidebar }) {
    const location = useLocation();

    return (
        <div className={`fixed top-0 left-0 h-screen bg-gray-900 text-white p-4 md:p-6 w-64 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 z-50 shadow-lg flex flex-col justify-between`}>
            <div>
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl md:text-2xl font-bold text-blue-400">Employee Panel</h2>
                    <button className="md:hidden text-white" onClick={toggleSidebar}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <nav className="space-y-4">
                    <Link to="/dashboard/" onClick={toggleSidebar} className={`flex items-center px-3 py-2 rounded transition ${location.pathname === '/' ? 'bg-gray-800' : 'hover:bg-gray-800'}`}>
                        <Home className="w-5 h-5 mr-2 text-blue-300" /> Dashboard
                    </Link>
                    <Link to="/dashboard/profile" onClick={toggleSidebar} className={`flex items-center px-3 py-2 rounded transition ${location.pathname === '/profile' ? 'bg-gray-800' : 'hover:bg-gray-800'}`}>
                        <UserRound className="w-5 h-5 mr-2 text-blue-300" /> Profile
                    </Link>
                    <Link to="/dashboard/payinfo" onClick={toggleSidebar} className={`flex items-center px-3 py-2 rounded transition ${location.pathname === '/pay-info' ? 'bg-gray-800' : 'hover:bg-gray-800'}`}>
                        <Calendar className="w-5 h-5 mr-2 text-blue-300" /> Pay Info
                    </Link>
                    <Link to="/dashboard/teampage" onClick={toggleSidebar} className={`flex items-center px-3 py-2 rounded transition ${location.pathname === '/team' ? 'bg-gray-800' : 'hover:bg-gray-800'}`}>
                        <Users className="w-5 h-5 mr-2 text-blue-300" /> Team
                    </Link>
                    <Link to="/dashboard/taskpage" onClick={toggleSidebar} className={`flex items-center px-3 py-2 rounded transition ${location.pathname === '/tasks' ? 'bg-gray-800' : 'hover:bg-gray-800'}`}>
                        <Briefcase className="w-5 h-5 mr-2 text-blue-300" /> Tasks
                    </Link>
                </nav>
            </div>
            <Link to="/dashboard/logout" onClick={toggleSidebar} className="flex items-center hover:bg-red-600 px-3 py-2 rounded transition">
                <LogOut className="w-5 h-5 mr-2 text-white" /> Logout
            </Link>
        </div>
    );
}

// TopNavBar Component
function TopNavBar({ toggleSidebar }) {
    return (
        <div className="fixed top-0 left-0 md:left-64 right-0 h-16 bg-black text-white flex items-center justify-between px-4 md:px-6 shadow-md z-50">
            <div className="flex items-center space-x-4">
                <button className="md:hidden text-white" onClick={toggleSidebar}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <div className="text-lg md:text-xl font-bold">Employee Management System</div>
            </div>
            <div className="flex items-center space-x-4 md:space-x-6">
                <button className="hover:text-gray-300 transition">
                    <Bell className="w-5 h-5" />
                </button>
                <button className="hover:text-gray-300 transition">
                    <Settings className="w-5 h-5" />
                </button>
                <button className="flex items-center space-x-2 hover:text-gray-300 transition">
                    <UserRound className="w-6 h-6" />
                    <span className="hidden md:inline text-sm">User</span>
                </button>
            </div>
        </div>
    );
}

// UserDashboard Component
export default function UserDashboard() {
    const [userStats, setUserStats] = useState({
        leavesTaken: 5,
        leavesRemaining: 15,
        nextPayDate: 'September 15, 2025',
        totalHoursWorked: 160,
        pendingTasks: 3,
        teamMembers: 12,
    });
    const [activities, setActivities] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const fetchStats = async () => {
            const data = {
                leavesTaken: 5,
                leavesRemaining: 15,
                nextPayDate: 'September 15, 2025',
                totalHoursWorked: 160,
                pendingTasks: 3,
                teamMembers: 12,
            };
            setUserStats(data);
        };

        const fetchActivities = async () => {
            const data = [
                { date: '2025-08-30', action: 'Leave Approved', details: 'Vacation leave from 2025-09-01 to 2025-09-03' },
                { date: '2025-08-28', action: 'Task Completed', details: 'Finished quarterly report' },
                { date: '2025-08-25', action: 'Meeting Attended', details: 'Team sync-up' },
            ];
            setActivities(data);
        };

        fetchStats();
        fetchActivities();
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <TopNavBar toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <main className="md:ml-64 w-full pt-20 px-4 md:px-8 bg-gray-50 min-h-screen">
                <h1 className="text-2xl md:text-3xl font-bold mb-8">Dashboard</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    <StatCard icon={UserRound} title="Leaves Taken" value={userStats.leavesTaken} color="blue" />
                    <StatCard icon={UserRound} title="Leaves Remaining" value={userStats.leavesRemaining} color="green" />
                    <StatCard icon={Calendar} title="Next Pay Date" value={userStats.nextPayDate} color="purple" />
                    <StatCard icon={Clock} title="Hours Worked This Month" value={userStats.totalHoursWorked} color="orange" />
                    <StatCard icon={Briefcase} title="Pending Tasks" value={userStats.pendingTasks} color="blue" />
                    <StatCard icon={Users} title="Team Members" value={userStats.teamMembers} color="green" />
                </div>
                <ActivityTable activities={activities} />
                <div className="mt-8">
                    <button className="bg-blue-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-blue-700 transition">
                        Request Leave
                    </button>
                </div>
            </main>
        </div>
    );
}