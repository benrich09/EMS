import React from 'react';
import { Link } from 'react-router-dom';
import { 
    UserRound, Building, Banknote, Check, LogOut, Clock, 
    Plus, ArrowRight 
} from 'lucide-react';
import { 
    BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

export default function DashboardHome() {
    const dashboardCards = [
        { title: 'Total Employees', value: '150', icon: <UserRound className="h-8 w-8 text-blue-500" />, path: '/admin/employees' },
        { title: 'Total Departments', value: '5', icon: <Building className="h-8 w-8 text-green-500" />, path: '/admin/departments' },
        { title: 'Pending Leaves', value: '10', icon: <Check className="h-8 w-8 text-yellow-500" />, path: '/admin/leaves' },
        { title: 'Monthly Payroll', value: '$500K', icon: <Banknote className="h-8 w-8 text-red-500" />, path: '/admin/payroll' },
        { title: 'New Hires', value: '8', icon: <UserRound className="h-8 w-8 text-purple-500" /> },
        { title: 'Terminations', value: '3', icon: <LogOut className="h-8 w-8 text-orange-500" /> },
        { title: 'Attendance', value: '95%', icon: <Check className="h-8 w-8 text-indigo-500" /> },
        { title: 'Overtime Hours', value: '450', icon: <Clock className="h-8 w-8 text-pink-500" /> },
    ];

    const quickActions = [
        { name: 'Add Employee', path: '/admin/employees/add', color: 'bg-blue-500 hover:bg-blue-600' },
        { name: 'Run Payroll', path: '/admin/payroll/run', color: 'bg-green-500 hover:bg-green-600' },
        { name: 'New Dept', path: '/admin/departments/create', color: 'bg-yellow-500 hover:bg-yellow-600' },
        { name: 'Approve Leaves', path: '/admin/leaves/approve', color: 'bg-red-500 hover:bg-red-600' },
    ];

    const recentActivities = [
        'John Doe requested 3 days vacation leave',
        'August payroll processed successfully',
        'New "Marketing" department created',
        'Jane Smith promoted to Senior Developer',
        'Overtime tracking feature added',
    ];

    const chartData = [
        { name: 'Jan', employees: 120, leaves: 15 },
        { name: 'Feb', employees: 130, leaves: 20 },
        { name: 'Mar', employees: 135, leaves: 18 },
        { name: 'Apr', employees: 140, leaves: 22 },
        { name: 'May', employees: 145, leaves: 25 },
        { name: 'Jun', employees: 150, leaves: 20 },
    ];

    return (
        <div className="space-y-6">
            {/* Stats Cards - Mobile Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {dashboardCards.map((card, index) => (
                    <Link
                        to={card.path || '#'}
                        key={index}
                        className="block bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{card.title}</h3>
                            {card.icon}
                        </div>
                        <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{card.value}</p>
                    </Link>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-md">
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
                    <Plus className="h-5 w-5 mr-2" /> Quick Actions
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {quickActions.map((action, index) => (
                        <Link
                            key={index}
                            to={action.path}
                            className={`${action.color} text-white p-3 rounded-lg flex flex-col items-center justify-center text-sm font-semibold transition-all duration-200 hover:scale-105`}
                        >
                            <ArrowRight className="h-4 w-4 mb-1" />
                            <span>{action.name}</span>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-md">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Recent Activity</h2>
                    <ul className="space-y-3">
                        {recentActivities.map((activity, index) => (
                            <li key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300">
                                {activity}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Chart */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-md">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Trends</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={chartData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="employees" fill="#8884d8" />
                            <Bar dataKey="leaves" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}