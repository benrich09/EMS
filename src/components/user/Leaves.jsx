import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle, XCircle, Clock, Plus, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function UserLeaves() {
    const [leaves, setLeaves] = useState([]);
    const [formData, setFormData] = useState({
        type: 'Vacation',
        start: '',
        end: '',
        reason: ''
    });
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        // Mock data
        setLeaves([
            { id: 1, type: 'Vacation', start: '2025-09-01', end: '2025-09-05', status: 'Approved' },
            { id: 2, type: 'Sick', start: '2025-08-25', end: '2025-08-27', status: 'Approved' },
        ]);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (new Date(formData.end) < new Date(formData.start)) {
            alert('End date cannot be before start date');
            return;
        }
        setLeaves([...leaves, { ...formData, id: Date.now(), status: 'Pending' }]);
        setShowForm(false);
        setFormData({ type: 'Vacation', start: '', end: '', reason: '' });
        alert('Leave request submitted!');
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Leave Requests</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center shadow-md"
                >
                    <Plus className="h-5 w-5 mr-2" /> Request Leave
                </button>
            </div>

            {/* Leave History */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-blue-200/50 dark:border-gray-700">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Start</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300">End</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaves.map((leave) => (
                                <tr key={leave.id} className="border-t dark:border-gray-700">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{leave.type}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">{leave.start}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">{leave.end}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                            leave.status === 'Approved' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                                            leave.status === 'Pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' :
                                            'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                                        }`}>
                                            {leave.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Request Form Modal */}
            {showForm && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                >
                    <motion.div
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4"
                    >
                        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Request Leave</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <select
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                                required
                            >
                                <option value="Vacation">Vacation</option>
                                <option value="Sick">Sick</option>
                                <option value="Personal">Personal</option>
                            </select>
                            <input
                                type="date"
                                value={formData.start}
                                onChange={(e) => setFormData({ ...formData, start: e.target.value })}
                                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                                required
                            />
                            <input
                                type="date"
                                value={formData.end}
                                onChange={(e) => setFormData({ ...formData, end: e.target.value })}
                                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                                required
                            />
                            <textarea
                                value={formData.reason}
                                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                                placeholder="Reason (optional)"
                                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                            />
                            <div className="flex space-x-3">
                                <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg">
                                    Submit Request
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-white py-2 rounded-lg"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </motion.div>
    );
}