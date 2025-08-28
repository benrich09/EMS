import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, Edit, Trash2 } from 'lucide-react';

export default function LeaveManagement() {
    const [leaves, setLeaves] = useState([]);

    useEffect(() => {
        // Mock data; replace with API fetch
        setLeaves([
            { id: 1, employee: 'John Doe', type: 'Vacation', start: '2025-09-01', end: '2025-09-05', status: 'Pending' },
            { id: 2, employee: 'Jane Smith', type: 'Sick', start: '2025-08-25', end: '2025-08-27', status: 'Approved' },
        ]);
    }, []);

    const handleApprove = (id) => {
        setLeaves(leaves.map(leave => leave.id === id ? { ...leave, status: 'Approved' } : leave));
    };

    const handleReject = (id) => {
        setLeaves(leaves.map(leave => leave.id === id ? { ...leave, status: 'Rejected' } : leave));
    };

    return (
        <div className="container mx-auto py-12 px-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Leave Management</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                    <thead>
                    <tr>
                        <th className="py-2 px-4 border-b text-left text-gray-900 dark:text-white">Employee</th>
                        <th className="py-2 px-4 border-b text-left text-gray-900 dark:text-white">Type</th>
                        <th className="py-2 px-4 border-b text-left text-gray-900 dark:text-white">Start Date</th>
                        <th className="py-2 px-4 border-b text-left text-gray-900 dark:text-white">End Date</th>
                        <th className="py-2 px-4 border-b text-left text-gray-900 dark:text-white">Status</th>
                        <th className="py-2 px-4 border-b text-left text-gray-900 dark:text-white">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {leaves.map((leave) => (
                        <tr key={leave.id}>
                            <td className="py-2 px-4 border-b text-gray-700 dark:text-gray-300">{leave.employee}</td>
                            <td className="py-2 px-4 border-b text-gray-700 dark:text-gray-300">{leave.type}</td>
                            <td className="py-2 px-4 border-b text-gray-700 dark:text-gray-300">{leave.start}</td>
                            <td className="py-2 px-4 border-b text-gray-700 dark:text-gray-300">{leave.end}</td>
                            <td className="py-2 px-4 border-b text-gray-700 dark:text-gray-300">
                                {leave.status === 'Approved' && <CheckCircle className="text-green-600" />}
                                {leave.status === 'Rejected' && <XCircle className="text-red-600" />}
                                {leave.status === 'Pending' && <Clock className="text-yellow-600" />}
                                {leave.status}
                            </td>
                            <td className="py-2 px-4 border-b">
                                {leave.status === 'Pending' && (
                                    <>
                                        <button onClick={() => handleApprove(leave.id)} className="text-green-600 mr-2">
                                            <CheckCircle className="h-5 w-5" />
                                        </button>
                                        <button onClick={() => handleReject(leave.id)} className="text-red-600 mr-2">
                                            <XCircle className="h-5 w-5" />
                                        </button>
                                    </>
                                )}
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