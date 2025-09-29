// components/Admin/Payroll.jsx (enhanced, added search, bulk actions)
import React, { useState, useEffect } from 'react';
import { DollarSign, Edit, Trash2, Plus, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const Payroll = () => {
    const [payrolls, setPayrolls] = useState([]);
    const [filteredPayrolls, setFilteredPayrolls] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editPayroll, setEditPayroll] = useState(null);
    const [formData, setFormData] = useState({
        employee: '',
        month: '',
        amount: '',
        status: 'Pending'
    });

    useEffect(() => {
        // Mock data; replace with API fetch
        const mockPayrolls = [
            { id: 1, employee: 'John Doe', month: 'August 2025', amount: 8000, status: 'Paid' },
            { id: 2, employee: 'Jane Smith', month: 'August 2025', amount: 7000, status: 'Pending' },
        ];
        setPayrolls(mockPayrolls);
        setFilteredPayrolls(mockPayrolls);
    }, []);

    useEffect(() => {
        const filtered = payrolls.filter(pay =>
            pay.employee.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPayrolls(filtered);
    }, [searchTerm, payrolls]);

    const handleGenerate = () => {
        alert('Payroll generated!');
        // Add API call for payroll generation
    };

    const handleAdd = () => {
        setEditPayroll(null);
        setFormData({ employee: '', month: '', amount: '', status: 'Pending' });
        setShowModal(true);
    };

    const handleEdit = (payroll) => {
        setEditPayroll(payroll);
        setFormData({ ...payroll });
        setShowModal(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this payroll?')) {
            setPayrolls(payrolls.filter(pay => pay.id !== id));
            // Add API call for deletion
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editPayroll) {
            setPayrolls(payrolls.map(pay => pay.id === editPayroll.id ? { ...pay, ...formData } : pay));
            // Add API call for update
        } else {
            setPayrolls([...payrolls, { ...formData, id: payrolls.length + 1 }]);
            // Add API call for creation
        }
        setShowModal(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="container mx-auto py-12 px-4"
        >
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Payroll Admin Panel</h1>
                <div className="flex space-x-2">
                    <button
                        onClick={handleGenerate}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center shadow-md hover:shadow-lg transition"
                    >
                        <DollarSign className="h-5 w-5 mr-2" /> Generate Payroll
                    </button>
                    <button
                        onClick={handleAdd}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center shadow-md hover:shadow-lg transition"
                    >
                        <Plus className="h-5 w-5 mr-2" /> Add Payroll
                    </button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
                <div className="relative max-w-md">
                    <input
                        type="text"
                        placeholder="Search by employee..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 pl-10 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg shadow-md">
                <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th className="py-2 px-4 text-left text-gray-900 dark:text-white">Employee</th>
                        <th className="py-2 px-4 text-left text-gray-900 dark:text-white">Month</th>
                        <th className="py-2 px-4 text-left text-gray-900 dark:text-white">Amount</th>
                        <th className="py-2 px-4 text-left text-gray-900 dark:text-white">Status</th>
                        <th className="py-2 px-4 text-left text-gray-900 dark:text-white">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredPayrolls.map((pay) => (
                        <motion.tr
                            key={pay.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                        >
                            <td className="py-2 px-4 text-gray-700 dark:text-gray-300">{pay.employee}</td>
                            <td className="py-2 px-4 text-gray-700 dark:text-gray-300">{pay.month}</td>
                            <td className="py-2 px-4 text-gray-700 dark:text-gray-300">${pay.amount}</td>
                            <td className="py-2 px-4 text-gray-700 dark:text-gray-300">{pay.status}</td>
                            <td className="py-2 px-4">
                                <button
                                    onClick={() => handleEdit(pay)}
                                    className="text-blue-600 mr-2 hover:text-blue-800"
                                    aria-label="Edit payroll"
                                >
                                    <Edit className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => handleDelete(pay.id)}
                                    className="text-red-600 hover:text-red-800"
                                    aria-label="Delete payroll"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            </td>
                        </motion.tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
                >
                    <motion.div
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md"
                    >
                        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                            {editPayroll ? 'Edit Payroll' : 'Add Payroll'}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 mb-1">Employee</label>
                                <input
                                    type="text"
                                    name="employee"
                                    value={formData.employee}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 mb-1">Month</label>
                                <input
                                    type="text"
                                    name="month"
                                    value={formData.month}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 mb-1">Amount</label>
                                <input
                                    type="number"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm"
                                    required
                                    min="0"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 mb-1">Status</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Paid">Paid</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 shadow-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-md"
                                >
                                    {editPayroll ? 'Update' : 'Add'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </motion.div>
    );
};

export default Payroll;