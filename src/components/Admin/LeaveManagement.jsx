import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, Edit, Trash2, PlusCircle, Search } from 'lucide-react';
import { motion } from 'framer-motion';

function LeaveManagement() {
    const [leaves, setLeaves] = useState([]);
    const [filteredLeaves, setFilteredLeaves] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentLeave, setCurrentLeave] = useState(null);
    const [formData, setFormData] = useState({
        employee: '',
        type: 'Vacation',
        start: '',
        end: '',
        status: 'Pending'
    });
    const [error, setError] = useState('');

    useEffect(() => {
        // Mock data; replace with API fetch in production
        const mockLeaves = [
            { id: 1, employee: 'John Doe', type: 'Vacation', start: '2025-09-01', end: '2025-09-05', status: 'Pending' },
            { id: 2, employee: 'Jane Smith', type: 'Sick', start: '2025-08-25', end: '2025-08-27', status: 'Approved' },
        ];
        setLeaves(mockLeaves);
        setFilteredLeaves(mockLeaves);
    }, []);

    useEffect(() => {
        const filtered = leaves.filter(leave =>
            leave.employee.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredLeaves(filtered);
    }, [searchTerm, leaves]);

    const handleApprove = (id) => {
        setLeaves(prevLeaves => prevLeaves.map(leave =>
            leave.id === id ? { ...leave, status: 'Approved' } : leave
        ));
    };

    const handleReject = (id) => {
        setLeaves(prevLeaves => prevLeaves.map(leave =>
            leave.id === id ? { ...leave, status: 'Rejected' } : leave
        ));
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this leave request?')) {
            setLeaves(prevLeaves => prevLeaves.filter(leave => leave.id !== id));
        }
    };

    const handleEdit = (leave) => {
        setCurrentLeave(leave);
        setFormData({ ...leave });
        setIsModalOpen(true);
        setError('');
    };

    const handleAdd = () => {
        setCurrentLeave(null);
        setFormData({
            employee: '',
            type: 'Vacation',
            start: '',
            end: '',
            status: 'Pending'
        });
        setIsModalOpen(true);
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.start && formData.end && new Date(formData.end) < new Date(formData.start)) {
            setError('End date cannot be before start date');
            return;
        }
        if (currentLeave) {
            setLeaves(prevLeaves => prevLeaves.map(leave =>
                leave.id === currentLeave.id ? { ...formData, id: leave.id } : leave
            ));
        } else {
            setLeaves(prevLeaves => [...prevLeaves, { ...formData, id: prevLeaves.length + 1 }]);
        }
        setIsModalOpen(false);
        setError('');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError('');
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            <div className="container mx-auto py-12 px-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Leave Management Admin</h1>
                    <button
                        onClick={handleAdd}
                        className="flex items-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition shadow-md"
                    >
                        <PlusCircle className="h-5 w-5 mr-2" /> Add Leave
                    </button>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                    <div className="relative max-w-md">
                        <input
                            type="text"
                            placeholder="Search by employee..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400"
                        />
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                    </div>
                </div>

                {/* Leave Table */}
                <div className="overflow-x-auto shadow-lg rounded-lg">
                    <table className="min-w-full border border-gray-300 dark:border-gray-600 divide-y divide-gray-200 dark:divide-gray-600">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                            <th className="py-3 px-6 text-left font-semibold text-gray-900 dark:text-white">Employee</th>
                            <th className="py-3 px-6 text-left font-semibold text-gray-900 dark:text-white">Type</th>
                            <th className="py-3 px-6 text-left font-semibold text-gray-900 dark:text-white">Start Date</th>
                            <th className="py-3 px-6 text-left font-semibold text-gray-900 dark:text-white">End Date</th>
                            <th className="py-3 px-6 text-left font-semibold text-gray-900 dark:text-white">Status</th>
                            <th className="py-3 px-6 text-left font-semibold text-gray-900 dark:text-white">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
                        {filteredLeaves.map((leave) => (
                            <motion.tr
                                key={leave.id}
                                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <td className="py-3 px-6 text-gray-900 dark:text-gray-300">{leave.employee}</td>
                                <td className="py-3 px-6 text-gray-900 dark:text-gray-300">{leave.type}</td>
                                <td className="py-3 px-6 text-gray-900 dark:text-gray-300">{leave.start}</td>
                                <td className="py-3 px-6 text-gray-900 dark:text-gray-300">{leave.end}</td>
                                <td className="py-3 px-6 text-gray-900 dark:text-gray-300 flex items-center">
                                    {leave.status === 'Approved' && <CheckCircle className="text-green-500 h-5 w-5 mr-2" />}
                                    {leave.status === 'Rejected' && <XCircle className="text-red-500 h-5 w-5 mr-2" />}
                                    {leave.status === 'Pending' && <Clock className="text-yellow-500 h-5 w-5 mr-2" />}
                                    <span className="capitalize">{leave.status}</span>
                                </td>
                                <td className="py-3 px-6">
                                    {leave.status === 'Pending' && (
                                        <>
                                            <button
                                                onClick={() => handleApprove(leave.id)}
                                                className="text-green-500 hover:text-green-400 dark:text-green-400 dark:hover:text-green-300 mr-3"
                                                title="Approve"
                                            >
                                                <CheckCircle className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() => handleReject(leave.id)}
                                                className="text-red-500 hover:text-red-400 dark:text-red-400 dark:hover:text-red-300 mr-3"
                                                title="Reject"
                                            >
                                                <XCircle className="h-5 w-5" />
                                            </button>
                                        </>
                                    )}
                                    <button
                                        onClick={() => handleEdit(leave)}
                                        className="text-blue-500 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                                        title="Edit"
                                    >
                                        <Edit className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(leave.id)}
                                        className="text-red-500 hover:text-red-400 dark:text-red-400 dark:hover:text-red-300"
                                        title="Delete"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* Modal for Add/Edit Leave */}
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 bg-black bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-75 flex items-center justify-center z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-xl"
                        >
                            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                                {currentLeave ? 'Edit Leave' : 'Add Leave'}
                            </h2>
                            {error && (
                                <p className="text-red-500 dark:text-red-400 mb-4 bg-red-50 dark:bg-red-900/20 p-2 rounded">
                                    {error}
                                </p>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
                                        Employee
                                    </label>
                                    <input
                                        type="text"
                                        name="employee"
                                        value={formData.employee}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
                                        Leave Type
                                    </label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400"
                                    >
                                        <option value="Vacation">Vacation</option>
                                        <option value="Sick">Sick</option>
                                        <option value="Personal">Personal</option>
                                        <option value="Maternity">Maternity</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
                                        Start Date
                                    </label>
                                    <input
                                        type="date"
                                        name="start"
                                        value={formData.start}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
                                        End Date
                                    </label>
                                    <input
                                        type="date"
                                        name="end"
                                        value={formData.end}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400"
                                        required
                                    />
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-lg shadow-md text-gray-700 dark:text-gray-100 transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg shadow-md transition"
                                    >
                                        {currentLeave ? 'Update' : 'Add'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}

export default LeaveManagement;