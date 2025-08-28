import React, { useState, useEffect } from 'react';
import { DollarSign, Edit, Trash2 } from 'lucide-react';

export default function Payroll() {
    const [payrolls, setPayrolls] = useState([]);

    useEffect(() => {
        // Mock data; replace with API fetch
        setPayrolls([
            { id: 1, employee: 'John Doe', month: 'August 2025', amount: 8000, status: 'Paid' },
            { id: 2, employee: 'Jane Smith', month: 'August 2025', amount: 7000, status: 'Pending' },
        ]);
    }, []);

    const handleGenerate = () => {
        // Logic to generate payroll
        alert('Payroll generated!');
    };

    return (
        <div className="container mx-auto py-12 px-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Payroll</h1>
                <button
                    onClick={handleGenerate}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
                >
                    <DollarSign className="h-5 w-5 mr-2" /> Generate Payroll
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                    <thead>
                    <tr>
                        <th className="py-2 px-4 border-b text-left text-gray-900 dark:text-white">Employee</th>
                        <th className="py-2 px-4 border-b text-left text-gray-900 dark:text-white">Month</th>
                        <th className="py-2 px-4 border-b text-left text-gray-900 dark:text-white">Amount</th>
                        <th className="py-2 px-4 border-b text-left text-gray-900 dark:text-white">Status</th>
                        <th className="py-2 px-4 border-b text-left text-gray-900 dark:text-white">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {payrolls.map((pay) => (
                        <tr key={pay.id}>
                            <td className="py-2 px-4 border-b text-gray-700 dark:text-gray-300">{pay.employee}</td>
                            <td className="py-2 px-4 border-b text-gray-700 dark:text-gray-300">{pay.month}</td>
                            <td className="py-2 px-4 border-b text-gray-700 dark:text-gray-300">${pay.amount}</td>
                            <td className="py-2 px-4 border-b text-gray-700 dark:text-gray-300">{pay.status}</td>
                            <td className="py-2 px-4 border-b">
                                <button className="text-blue-600 mr-2">
                                    <Edit className="h-5 w-5" />
                                </button>
                                <button className="text-red-600">
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}