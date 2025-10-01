import React, { useState, useEffect } from 'react';
import { Calendar, FileText } from 'lucide-react';
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

export default function PayInfo() {
    const [payInfo, setPayInfo] = useState({
        salary: 75000,
        lastPay: 'August 31, 2025',
        nextPay: 'September 15, 2025',
        deductions: 1200,
    });
    const [payHistory, setPayHistory] = useState([]);

    useEffect(() => {
        // Mock data
        setPayInfo({
            salary: 75000,
            lastPay: 'August 31, 2025',
            nextPay: 'September 15, 2025',
            deductions: 1200,
        });
        setPayHistory([
            { month: 'August 2025', amount: 6250, deductions: 1000 },
            { month: 'July 2025', amount: 6250, deductions: 1200 },
            // Add more
        ]);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >

            <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                Pay Information
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StatCard icon={FileText} title="Annual Salary" value={`$${payInfo.salary}`} color="blue" />
                <StatCard icon={Calendar} title="Last Pay Date" value={payInfo.lastPay} color="green" />
                <StatCard icon={Calendar} title="Next Pay Date" value={payInfo.nextPay} color="purple" />
                <StatCard icon={FileText} title="Monthly Deductions" value={`$${payInfo.deductions}`} color="orange" />
            </div>

            <div className="mt-8">

                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    Pay History
                </h2>

                <div className="overflow-x-auto rounded-lg shadow-md">

                    <table className="min-w-full bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">

                        <thead className="bg-gray-50 dark:bg-gray-700 hover:bg-gray-50">

                        <tr>
                            <th className="py-3 px-6 text-left text-gray-900 dark:text-white hover:text-black ">Month</th>
                            <th className="py-3 px-6 text-left text-gray-900 dark:text-white hover:text-black ">Amount</th>
                            <th className="py-3 px-6 text-left text-gray-900 dark:text-white hover:text-black ">Deductions</th>
                            <th className="py-3 px-6 text-left text-gray-900 dark:text-white hover:text-black ">Remain Amount</th>
                        </tr>

                        </thead>

                        <tbody>
                        {payHistory.map((pay, index) => (
                            <motion.tr
                                key={index}
                                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <td className="py-3 px-6 text-gray-700 dark:text-gray-300">{pay.month}</td>
                                <td className="py-3 px-6 text-gray-700 dark:text-gray-300">${pay.amount}</td>
                                <td className="py-3 px-6 text-gray-700 dark:text-gray-300">${pay.deductions}</td>
                                <td className="py-3 px-6 text-gray-700 dark:text-gray-300">
                                    ${pay.amount - pay.deductions}
                                </td>
                            </motion.tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-8">
                <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition shadow-md hover:shadow-lg">
                    Download Latest Pay Stub
                </button>
            </div>

        </motion.div>
    );
}