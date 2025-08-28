import React, { useState, useEffect } from 'react';
import { UserRound, Building, Banknote, Check } from 'lucide-react';

export default function Dashboard() {
    const [stats, setStats] = useState({
        employees: 0,
        departments: 0,
        monthlyPay: 0,
        leavesApplied: 0,
        leavesApproved: 0,
        leavesPending: 0,
        leavesRejected: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            // Replace with real API call in production
            const data = {
                employees: 150,
                departments: 12,
                monthlyPay: 450000,
                leavesApplied: 25,
                leavesApproved: 15,
                leavesPending: 7,
                leavesRejected: 3,
            };
            setStats(data);
        };
        fetchData();
    }, []);

    return (
        <div className="container mx-auto py-12 px-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0 text-gray-900 dark:text-white">
                    Administrator Dashboard
                </h1>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center mb-4">
                        <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mr-4">
                            <UserRound className="h-6 w-6 text-blue-700 dark:text-blue-300" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Total Employees
                        </h2>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.employees}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center mb-4">
                        <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mr-4">
                            <Building className="h-6 w-6 text-blue-700 dark:text-blue-300" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Total Departments
                        </h2>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.departments}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center mb-4">
                        <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mr-4">
                            <Banknote className="h-6 w-6 text-blue-700 dark:text-blue-300" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Total Monthly Pay
                        </h2>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        ${stats.monthlyPay.toLocaleString()}
                    </p>
                </div>
            </div>
            <div className="flex justify-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Leave Details</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center mb-4">
                        <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mr-4">
                            <Check className="h-6 w-6 text-blue-700 dark:text-blue-300" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Leaves Applied
                        </h2>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.leavesApplied}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center mb-4">
                        <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full mr-4">
                            <Check className="h-6 w-6 text-green-700 dark:text-green-300" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Leaves Approved
                        </h2>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.leavesApproved}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center mb-4">
                        <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-full mr-4">
                            <Check className="h-6 w-6 text-yellow-700 dark:text-yellow-300" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Leaves Pending
                        </h2>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.leavesPending}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center mb-4">
                        <div className="bg-red-100 dark:bg-red-900 p-3 rounded-full mr-4">
                            <Check className="h-6 w-6 text-red-700 dark:text-red-300" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Leaves Rejected
                        </h2>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.leavesRejected}</p>
                </div>
            </div>
            {/* Additional Dashboard Features */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 mb-10">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activities</h2>
                <ul className="space-y-2">
                    <li className="text-gray-700 dark:text-gray-300">New employee John Doe added.</li>
                    <li className="text-gray-700 dark:text-gray-300">Leave request from Jane Smith approved.</li>
                    <li className="text-gray-700 dark:text-gray-300">Payroll for August processed.</li>
                </ul>
            </div>
        </div>
    );
}