import React, { useState, useEffect } from 'react';
import { 
    UserRound, Calendar, Briefcase, Users, Clock, CheckCircle, 
    Plus, ArrowRight, FileText 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function StatCard({ icon: Icon, title, value, color = 'blue', path }) {
    const colorClasses = {
        blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
        green: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
        purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
        orange: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
    };

    return (
        <motion.div
            className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 border border-blue-200/50 dark:border-gray-700"
            whileHover={{ scale: 1.02 }}
        >
            <div className="flex items-center justify-between mb-3">
                <div className={`${colorClasses[color]} p-3 rounded-full`}>
                    <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{title}</h3>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
        </motion.div>
    );
}

function QuickAction({ name, path, color }) {
    return (
        <Link
            to={path}
            className={`${color} text-white p-4 rounded-lg flex flex-col items-center justify-center text-sm font-semibold transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg`}
        >
            <ArrowRight className="h-4 w-4 mb-1" />
            <span>{name}</span>
        </Link>
    );
}

function ActivityTable({ activities }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-md border border-blue-200/50 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
                <FileText className="h-5 w-5 mr-2" /> Recent Activities
            </h2>
            <div className="space-y-3">
                {activities.map((activity, index) => (
                    <motion.div
                        key={index}
                        className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 rounded-lg text-sm text-gray-700 dark:text-gray-300"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className="flex items-center space-x-3">
                            <CheckCircle className="h-4 w-4 text-blue-500" />
                            <span>{activity}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default function UserHome() {
    const [userStats, setUserStats] = useState({});
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setUserStats({
                leavesTaken: 5,
                leavesRemaining: 15,
                nextPayDate: 'Oct 15, 2025',
                totalHoursWorked: '160',
                pendingTasks: 3,
                teamMembers: 12,
            });
            
            setActivities([
                'Leave approved for 3 days vacation',
                'August payroll processed - $5,250',
                'Completed quarterly performance review',
                'Team meeting scheduled for tomorrow',
                'New task assigned: Website redesign',
            ]);
            setLoading(false);
        }, 800);
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <StatCard 
                    icon={CheckCircle} 
                    title="Leaves Taken" 
                    value={userStats.leavesTaken} 
                    color="blue" 
                />
                <StatCard 
                    icon={CheckCircle} 
                    title="Leaves Remaining" 
                    value={userStats.leavesRemaining} 
                    color="green" 
                />
                <StatCard 
                    icon={Calendar} 
                    title="Next Pay" 
                    value={userStats.nextPayDate} 
                    color="purple" 
                />
                <StatCard 
                    icon={Clock} 
                    title="Hours Worked" 
                    value={userStats.totalHoursWorked} 
                    color="orange" 
                />
                <StatCard 
                    icon={Briefcase} 
                    title="Pending Tasks" 
                    value={userStats.pendingTasks} 
                    color="blue" 
                />
                <StatCard 
                    icon={Users} 
                    title="Team Members" 
                    value={userStats.teamMembers} 
                    color="green" 
                />
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-md border border-blue-200/50 dark:border-gray-700">
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
                    <Plus className="h-5 w-5 mr-2 text-blue-600" /> Quick Actions
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <QuickAction name="Request Leave" path="/dashboard/leaves" color="bg-blue-500 hover:bg-blue-600" />
                    <QuickAction name="View Payslip" path="/dashboard/payinfo" color="bg-green-500 hover:bg-green-600" />
                    <QuickAction name="My Tasks" path="/dashboard/taskpage" color="bg-yellow-500 hover:bg-yellow-600" />
                    <QuickAction name="Team Chat" path="/dashboard/teampage" color="bg-purple-500 hover:bg-purple-600" />
                </div>
            </div>

            {/* Recent Activities */}
            <ActivityTable activities={activities} />
        </motion.div>
    );
}