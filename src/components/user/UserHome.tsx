import React, { useState, useEffect } from 'react';
import { 
    UserRound, Calendar, Briefcase, Users, Clock, CheckCircle, 
    Plus, ArrowRight, FileText 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function StatCard({ icon: Icon, title, value, color = 'blue', path }) {
    const colorClasses = {
        blue:  { chip: 'bg-blue-50 text-blue-600',   bar: 'bg-blue-500' },
        green: { chip: 'bg-green-50 text-green-600', bar: 'bg-green-500' },
        red:   { chip: 'bg-red-50 text-red-600',     bar: 'bg-red-500' },
        purple:{ chip: 'bg-blue-50 text-blue-600',   bar: 'bg-blue-500' },
        orange:{ chip: 'bg-red-50 text-red-600',     bar: 'bg-red-500' },
    };
    const st = colorClasses[color] || colorClasses.blue;

    return (
        <div className="relative bg-white dark:bg-gray-800 px-4 py-3 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <span className={`absolute left-0 top-0 bottom-0 w-1 ${st.bar}`} />
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{value}</p>
                    <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400">{title}</p>
                </div>
                <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${st.chip}`}>
                    <Icon className="h-4 w-4" />
                </span>
            </div>
        </div>
    );
}

function QuickAction({ name, path, color }) {
    return (
        <Link
            to={path}
            className={`${color} text-white px-3 py-2.5 rounded-lg flex items-center justify-center gap-1.5 text-xs font-semibold transition-colors shadow-sm`}
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