// components/user/UserHome.jsx (extracted from original UserDashboard, enhanced)
import React, { useState, useEffect } from 'react';
import { UserRound, Calendar, Briefcase, Users, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

function StatCard({ icon: Icon, title, value, color = 'blue' }) {
    const colorClasses = {
        blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
        green: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
        purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
        orange: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
    };

    return (
        <motion.div
            className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
            whileHover={{ scale: 1.05 }}
        >
            <div className="flex items-center mb-4">
                <div className={`${colorClasses[color]} p-3 rounded-full mr-4`}>
                    <Icon className="h-6 w-6" />
                </div>
                <h2 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
        </motion.div>
    );
}

function ActivityTable({ activities }) {
    return (
        <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 mt-8 overflow-x-auto">
            <h2 className="text-lg md:text-xl font-bold mb-4 text-gray-900 dark:text-white">Recent Activities</h2>
            <table className="w-full table-auto min-w-[600px]">
                <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                    <th className="p-3 text-gray-900 dark:text-white">Date</th>
                    <th className="p-3 text-gray-900 dark:text-white">Action</th>
                    <th className="p-3 text-gray-900 dark:text-white">Details</th>
                </tr>
                </thead>
                <tbody>
                {activities.map((activity, index) => (
                    <motion.tr
                        key={index}
                        className="border-t hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <td className="p-3 text-gray-700 dark:text-gray-300">{activity.date}</td>
                        <td className="p-3 text-gray-700 dark:text-gray-300">{activity.action}</td>
                        <td className="p-3 text-gray-700 dark:text-gray-300">{activity.details}</td>
                    </motion.tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default function UserHome() {
    const [userStats, setUserStats] = useState({
        leavesTaken: 5,
        leavesRemaining: 15,
        nextPayDate: 'September 15, 2025',
        totalHoursWorked: 160,
        pendingTasks: 3,
        teamMembers: 12,
    });
    const [activities, setActivities] = useState([]);

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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <h1 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 dark:text-white">Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <StatCard icon={CheckCircle} title="Leaves Taken" value={userStats.leavesTaken} color="blue" />
                <StatCard icon={CheckCircle} title="Leaves Remaining" value={userStats.leavesRemaining} color="green" />
                <StatCard icon={Calendar} title="Next Pay Date" value={userStats.nextPayDate} color="purple" />
                <StatCard icon={Clock} title="Hours Worked This Month" value={userStats.totalHoursWorked} color="orange" />
                <StatCard icon={Briefcase} title="Pending Tasks" value={userStats.pendingTasks} color="blue" />
                <StatCard icon={Users} title="Team Members" value={userStats.teamMembers} color="green" />
            </div>
            <ActivityTable activities={activities} />
            <div className="mt-8">
                <button className="bg-blue-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg">
                    Request Leave
                </button>
            </div>
        </motion.div>
    );
}