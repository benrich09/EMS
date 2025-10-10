// components/Admin/Employees.jsx (enhanced, added sorting, search, modal animations)
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, X, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Employees() {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ id: null, name: '', email: '', position: '', department: '', salary: '', hireDate: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const departments = ['IT', 'Creative', 'HR', 'Finance', 'Marketing'];

    useEffect(() => {
        try {
            const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
            setEmployees(storedEmployees);
            setFilteredEmployees(storedEmployees);
        } catch (err) {
            setError('Failed to load data from storage.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('employees', JSON.stringify(employees));
        applyFiltersAndSort();
    }, [employees]);

    useEffect(() => {
        applyFiltersAndSort();
    }, [searchTerm, sortConfig]);

    const applyFiltersAndSort = () => {
        let filtered = employees.filter(emp =>
            emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.email.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (sortConfig.key) {
            filtered.sort((a, b) => {
                let aValue = a[sortConfig.key];
                let bValue = b[sortConfig.key];

                if (sortConfig.key === 'salary') {
                    aValue = parseFloat(aValue);
                    bValue = parseFloat(bValue);
                } else if (sortConfig.key === 'hireDate') {
                    aValue = new Date(aValue);
                    bValue = new Date(bValue);
                }

                if (aValue < bValue) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }

        setFilteredEmployees(filtered);
    };

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const handleAddOrEdit = () => {
        if (!formData.name || !formData.email || !formData.position || !formData.department || !formData.salary || !formData.hireDate) {
            alert('Please fill all fields.');
            return;
        }

        if (formData.id) {
            setEmployees(employees.map(emp => emp.id === formData.id ? { ...formData } : emp));
        } else {
            setEmployees([...employees, { ...formData, id: Date.now() }]);
        }
        closeModal();
    };

    const handleEdit = (emp) => {
        setFormData(emp);
        setShowModal(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            setEmployees(employees.filter(emp => emp.id !== id));
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setFormData({ id: null, name: '', email: '', position: '', department: '', salary: '', hireDate: '' });
    };

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return null;
        return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
    };

    if (loading) {
        return <div className="text-center py-12">Loading......</div>;
    }

    if (error) {
        return <div className="text-center py-12 text-red-600">{error}</div>;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="container mx-auto py-12 px-4"
        >
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Employees</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center shadow-md hover:shadow-lg transition"
                >
                    <Plus className="h-5 w-5 mr-2" /> Add Employee
                </button>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 pl-10 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
            </div>

            {/* Employees Table */}
            <div className="overflow-x-auto rounded-lg shadow-md">
                <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th
                            className="py-3 px-4 text-left text-gray-900 dark:text-white cursor-pointer"
                            onClick={() => requestSort('name')}
                        >
                            Name{getSortIcon('name')}
                        </th>
                        <th className="py-3 px-4 text-left text-gray-900 dark:text-white">Email</th>
                        <th className="py-3 px-4 text-left text-gray-900 dark:text-white">Position</th>
                        <th className="py-3 px-4 text-left text-gray-900 dark:text-white">Department</th>
                        <th
                            className="py-3 px-4 text-left text-gray-900 dark:text-white cursor-pointer"
                            onClick={() => requestSort('salary')}
                        >
                            Salary{getSortIcon('salary')}
                        </th>
                        <th
                            className="py-3 px-4 text-left text-gray-900 dark:text-white cursor-pointer"
                            onClick={() => requestSort('hireDate')}
                        >
                            Hire Date{getSortIcon('hireDate')}
                        </th>
                        <th className="py-3 px-4 text-left text-gray-900 dark:text-white">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredEmployees.map((emp) => (
                        <motion.tr
                            key={emp.id}
                            className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{emp.name}</td>
                            <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{emp.email}</td>
                            <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{emp.position}</td>
                            <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{emp.department}</td>
                            <td className="py-3 px-4 text-gray-700 dark:text-gray-300">${Number(emp.salary).toLocaleString()}</td>
                            <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                                {new Date(emp.hireDate).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4">
                                <button onClick={() => handleEdit(emp)} className="text-blue-600 hover:text-blue-800 mr-3">
                                    <Edit className="h-5 w-5" />
                                </button>
                                <button onClick={() => handleDelete(emp.id)} className="text-red-600 hover:text-red-800">
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            </td>
                        </motion.tr>
                    ))}
                    {filteredEmployees.length === 0 && (
                        <tr>
                            <td colSpan="7" className="py-3 px-4 text-center text-gray-500 dark:text-gray-400">
                                No employees found.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {/* Modal for Add/Edit */}
            {showModal && (
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
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {formData.id ? 'Edit Employee' : 'Add Employee'}
                            </h2>
                            <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <input
                                type="text"
                                placeholder="Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                            />
                            <input
                                type="text"
                                placeholder="Position"
                                value={formData.position}
                                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                className="p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                            />
                            <select
                                value={formData.department}
                                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                className="p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                            >
                                <option value="">Select Department</option>
                                {departments.map((dept) => (
                                    <option key={dept} value={dept}>{dept}</option>
                                ))}
                            </select>
                            <input
                                type="number"
                                placeholder="Salary"
                                value={formData.salary}
                                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                                className="p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                            />
                            <input
                                type="date"
                                placeholder="Hire Date"
                                value={formData.hireDate}
                                onChange={(e) => setFormData({ ...formData, hireDate: e.target.value })}
                                className="p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                            />
                        </div>
                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                onClick={closeModal}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 shadow-md"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddOrEdit}
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 shadow-md"
                            >
                                Save
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </motion.div>
    );
}