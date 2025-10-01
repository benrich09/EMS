import React from 'react';
import { Link } from 'react-router-dom';
import { UserRound, Building, Banknote, Check, LogOut, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function DashboardHome() {
    const dashboardCards = [
        {
            title: 'Total Employees',
            value: '150',
            icon: <UserRound className="h-8 w-8 text-blue-500" />,
            path: '/admin/employees',
        },
        {
            title: 'Total Departments',
            value: '5',
            icon: <Building className="h-8 w-8 text-green-500" />,
            path: '/admin/departments',
        },
        {
            title: 'Pending Leaves',
            value: '10',
            icon: <Check className="h-8 w-8 text-yellow-500" />,
            path: '/admin/leaves',
        },
        {
            title: 'Monthly Payroll',
            value: '$500,000',
            icon: <Banknote className="h-8 w-8 text-red-500" />,
            path: '/admin/payroll',
        },
        {
            title: 'New Hires This Month',
            value: '8',
            icon: <UserRound className="h-8 w-8 text-purple-500" />,
        },
        {
            title: 'Terminations This Month',
            value: '3',
            icon: <LogOut className="h-8 w-8 text-orange-500" />,
        },
        {
            title: 'Average Attendance Rate',
            value: '95%',
            icon: <Check className="h-8 w-8 text-indigo-500" />,
        },
        {
            title: 'Total Overtime Hours',
            value: '450',
            icon: <Clock className="h-8 w-8 text-pink-500" />,
        },
    ];

    const quickActions = [
        {
            name: 'Add New Employee',
            path: '/admin/employees/add',
            color: 'bg-blue-500 hover:bg-blue-600',
        },
        {
            name: 'Run Payroll',
            path: '/admin/payroll/run',
            color: 'bg-green-500 hover:bg-green-600',
        },
        {
            name: 'Create Department',
            path: '/admin/departments/create',
            color: 'bg-yellow-500 hover:bg-yellow-600',
        },
        {
            name: 'Approve Leaves',
            path: '/admin/leaves/approve',
            color: 'bg-red-500 hover:bg-red-600',
        },
    ];

    const recentActivities = [
        'Employee John Doe requested 3 days of leave.',
        'Payroll for August processed successfully.',
        'New department "Marketing" created.',
        'Employee Jane Smith promoted to Senior Developer.',
        'System update: Added new overtime tracking feature.',
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
        <>
            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dashboardCards.map((card, index) => (
                    card.path ? (
                        <Link
                            to={card.path}
                            key={index}
                            className="block bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 hover:scale-105 transition-transform duration-200"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{card.title}</h3>
                                {card.icon}
                            </div>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">{card.value}</p>
                        </Link>
                    ) : (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 hover:scale-105 transition-transform duration-200 cursor-pointer"
                            onClick={() => alert(`Details for ${card.title}`)} // Placeholder interactivity
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{card.title}</h3>
                                {card.icon}
                            </div>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">{card.value}</p>
                        </div>
                    )
                ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {quickActions.map((action, index) => (
                        <Link
                            key={index}
                            to={action.path}
                            className={`${action.color} text-white p-4 rounded-lg flex items-center justify-center transition-colors duration-200 font-semibold hover:scale-105 transition-transform duration-200`}
                        >
                            {action.name}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Recent Activity */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Recent Activity</h2>
                <ul className="bg-white dark:bg-gray-800 rounded-lg shadow-md divide-y divide-gray-200 dark:divide-gray-700">
                    {recentActivities.map((activity, index) => (
                        <li key={index} className="p-4 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                            {activity}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Employee Growth Chart */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Employee and Leave Trends</h2>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="employees" fill="#8884d8" name="Employees" />
                            <Bar dataKey="leaves" fill="#82ca9d" name="Leaves" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    );
}