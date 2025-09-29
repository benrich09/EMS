// components/Admin/Departments.jsx (enhanced attractiveness, added animations, more responsive)
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion'; // Added for animations

const Departments = () => {
    const [departments, setDepartments] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ id: null, name: '', manager: '', employees: 0 });
    const [error, setError] = useState('');

    useEffect(() => {
        // Mock data; replace with API fetch in production
        setDepartments([
            { id: 1, name: 'IT', manager: 'Alice Johnson', employees: 50 },
            { id: 2, name: 'HR', manager: 'Bob Smith', employees: 20 },
        ]);
    }, []);

    const handleAddOrEdit = () => {
        // Validation
        if (!formData.name.trim() || !formData.manager.trim() || formData.employees < 0) {
            setError('Please fill in all fields correctly. Number of employees cannot be negative.');
            return;
        }

        if (formData.id) {
            setDepartments(departments.map(dep => dep.id === formData.id ? { ...formData } : dep));
        } else {
            setDepartments([...departments, { ...formData, id: Date.now() }]);
        }
        setShowForm(false);
        setFormData({ id: null, name: '', manager: '', employees: 0 });
        setError('');
    };

    const handleEdit = (dep) => {
        setFormData(dep);
        setShowForm(true);
        setError('');
    };

    const handleDelete = (id) => {
        setDepartments(departments.filter(dep => dep.id !== id));
    };

    const handleCancel = () => {
        setShowForm(false);
        setFormData({ id: null, name: '', manager: '', employees: 0 });
        setError('');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto py-12 px-4 max-w-7xl"
        >
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Departments</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg"
                >
                    <Plus className="h-5 w-5 mr-2" /> Add Department
                </button>
            </div>
            {showForm && (
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-8"
                >
                    <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                        {formData.id ? 'Edit Department' : 'Add Department'}
                    </h2>
                    {error && (
                        <div className="mb-4 text-red-600 dark:text-red-400 font-medium flex items-center">
                            <AlertCircle className="h-5 w-5 mr-2" /> {error}
                        </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                            type="text"
                            placeholder="Department Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition duration-200 shadow-sm"
                        />
                        <input
                            type="text"
                            placeholder="Manager Name"
                            value={formData.manager}
                            onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition duration-200 shadow-sm"
                        />
                        <input
                            type="number"
                            placeholder="Number of Employees"
                            value={formData.employees}
                            onChange={(e) => setFormData({ ...formData, employees: parseInt(e.target.value) || 0 })}
                            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition duration-200 shadow-sm"
                            min="0"
                        />
                    </div>
                    <div className="mt-6 flex space-x-3">
                        <button
                            onClick={handleAddOrEdit}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200 shadow-md hover:shadow-lg"
                        >
                            Save
                        </button>
                        <button
                            onClick={handleCancel}
                            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200 shadow-md hover:shadow-lg"
                        >
                            Cancel
                        </button>
                    </div>
                </motion.div>
            )}
            <div className="overflow-x-auto rounded-lg shadow-md">
                <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th className="py-3 px-6 text-left text-gray-900 dark:text-white font-semibold">Name</th>
                        <th className="py-3 px-6 text-left text-gray-900 dark:text-white font-semibold">Manager</th>
                        <th className="py-3 px-6 text-left text-gray-900 dark:text-white font-semibold">Employees</th>
                        <th className="py-3 px-6 text-left text-gray-900 dark:text-white font-semibold">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {departments.map((dep) => (
                        <motion.tr
                            key={dep.id}
                            className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: dep.id * 0.1 }}
                        >
                            <td className="py-3 px-6 border-b text-gray-700 dark:text-gray-300">{dep.name}</td>
                            <td className="py-3 px-6 border-b text-gray-700 dark:text-gray-300">{dep.manager}</td>
                            <td className="py-3 px-6 border-b text-gray-700 dark:text-gray-300">{dep.employees}</td>
                            <td className="py-3 px-6 border-b">
                                <button
                                    onClick={() => handleEdit(dep)}
                                    className="text-blue-600 hover:text-blue-800 mr-4 transition duration-150"
                                    title="Edit Department"
                                >
                                    <Edit className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => handleDelete(dep.id)}
                                    className="text-red-600 hover:text-red-800 transition duration-150"
                                    title="Delete Department"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            </td>
                        </motion.tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default Departments;