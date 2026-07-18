import React, { useState, useEffect } from 'react';
import { Calendar, FileText, Download } from 'lucide-react';
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
            className="bg-white dark:bg-gray-800 p-3 sm:p-4 md:p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
            whileHover={{ scale: 1.02 }}
        >
            <div className="flex items-center mb-3 sm:mb-4">
                <div className={`${colorClasses[color]} p-2 sm:p-3 rounded-full mr-3 sm:mr-4`}>
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 dark:text-white truncate">
                    {title}
                </h2>
            </div>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                {value}
            </p>
        </motion.div>
    );
}

export default function PayInfo() {
    const [payInfo, setPayInfo] = useState({});
    const [payHistory, setPayHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setPayInfo({
                salary: '$75,000',
                lastPay: 'Aug 31, 2025',
                nextPay: 'Sep 15, 2025',
                deductions: '$1,200',
            });
            setPayHistory([
                { month: 'August 2025', amount: '$6,250', deductions: '$1,000', net: '$5,250' },
                { month: 'July 2025', amount: '$6,250', deductions: '$1,200', net: '$5,050' },
            ]);
            setLoading(false);
        }, 800);
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 sm:h-12 sm:w-12"></div>
            </div>
        );
    }

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-900 dark:text-white">
                Pay Information
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <StatCard icon={FileText} title="Annual Salary" value={payInfo.salary} color="blue" />
                <StatCard icon={Calendar} title="Last Pay" value={payInfo.lastPay} color="green" />
                <StatCard icon={Calendar} title="Next Pay" value={payInfo.nextPay} color="purple" />
                <StatCard icon={FileText} title="Deductions" value={payInfo.deductions} color="orange" />
            </div>

            <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 md:p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">
                    Pay History
                </h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="py-2 sm:py-3 px-3 sm:px-6 text-left text-xs sm:text-sm font-medium text-gray-900 dark:text-white">Month</th>
                                <th className="py-2 sm:py-3 px-3 sm:px-6 text-left text-xs sm:text-sm font-medium text-gray-900 dark:text-white">Amount</th>
                                <th className="py-2 sm:py-3 px-3 sm:px-6 text-left text-xs sm:text-sm font-medium text-gray-900 dark:text-white">Deductions</th>
                                <th className="py-2 sm:py-3 px-3 sm:px-6 text-left text-xs sm:text-sm font-medium text-gray-900 dark:text-white">Net</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {payHistory.map((pay, index) => (
                                <motion.tr
                                    key={index}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <td className="py-2 sm:py-3 px-3 sm:px-6 text-xs sm:text-sm text-gray-700 dark:text-gray-300">{pay.month}</td>
                                    <td className="py-2 sm:py-3 px-3 sm:px-6 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">{pay.amount}</td>
                                    <td className="py-2 sm:py-3 px-3 sm:px-6 text-xs sm:text-sm text-gray-700 dark:text-gray-300">{pay.deductions}</td>
                                    <td className="py-2 sm:py-3 px-3 sm:px-6 text-xs sm:text-sm font-bold text-green-600 dark:text-green-400">{pay.net}</td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-6 sm:mt-8">
                <button className="w-full sm:w-auto bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition shadow-md hover:shadow-lg text-sm sm:text-base">
                    <Download className="h-4 w-4 mr-2 inline" />
                    Download Latest Pay Stub
                </button>
            </div>
        </motion.div>
    );
}