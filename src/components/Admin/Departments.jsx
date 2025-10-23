import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, AlertCircle, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const Departments = () => {
    // State variables - THIS WAS MISSING!
    const [departments, setDepartments] = useState([
        { id: 1, name: 'Engineering', manager: 'John Doe', employees: 25 },
        { id: 2, name: 'Marketing', manager: 'Jane Smith', employees: 15 },
        { id: 3, name: 'HR', manager: 'Mike Johnson', employees: 8 },
    ]);
    
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingDept, setEditingDept] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        manager: '',
        employees: ''
    });

    // Filter departments based on search
    const filteredDepartments = departments.filter(dep =>
        dep.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dep.manager.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingDept) {
            setDepartments(departments.map(dep =>
                dep.id === editingDept.id
                    ? { ...dep, ...formData }
                    : dep
            ));
            setEditingDept(null);
        } else {
            setDepartments([...departments, { 
                id: Date.now(), 
                ...formData, 
                employees: parseInt(formData.employees) 
            }]);
        }
        setFormData({ name: '', manager: '', employees: '' });
        setShowForm(false);
    };

    // Handle edit
    const handleEdit = (dep) => {
        setEditingDept(dep);
        setFormData({
            name: dep.name,
            manager: dep.manager,
            employees: dep.employees
        });
        setShowForm(true);
    };

    // Handle delete
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this department?')) {
            setDepartments(departments.filter(dep => dep.id !== id));
        }
    };

    useEffect(() => {
        if (editingDept) {
            setShowForm(true);
        }
    }, [editingDept]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Departments</h1>
                <button
                    onClick={() => {
                        setEditingDept(null);
                        setFormData({ name: '', manager: '', employees: '' });
                        setShowForm(true);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition duration-200 shadow-md dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                    <Plus className="h-5 w-5 mr-2" /> Add Department
                </button>
            </div>

            {/* Search */}
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search departments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                />
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>

            {/* Add/Edit Form */}
            {showForm && (
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
                >
                    <form onSubmit={handleSubmit}>
                        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                            {editingDept ? 'Edit Department' : 'Add Department'}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Department Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Manager
                                </label>
                                <input
                                    type="text"
                                    value={formData.manager}
                                    onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Employees
                                </label>
                                <input
                                    type="number"
                                    value={formData.employees}
                                    onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200"
                            >
                                {editingDept ? 'Update' : 'Add'}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setShowForm(false);
                                    setEditingDept(null);
                                    setFormData({ name: '', manager: '', employees: '' });
                                }}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg transition duration-200 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </motion.div>
            )}

            {/* Mobile Cards View */}
            <div className="block lg:hidden space-y-4">
                {filteredDepartments.length > 0 ? (
                    filteredDepartments.map((dep) => (
                        <motion.div
                            key={dep.id}
                            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-semibold text-gray-900 dark:text-white">{dep.name}</h3>
                                <div className="flex space-x-2">
                                    <button 
                                        onClick={() => handleEdit(dep)} 
                                        className="text-blue-600 hover:text-blue-800 p-1 rounded"
                                    >
                                        <Edit className="h-4 w-4" />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(dep.id)} 
                                        className="text-red-600 hover:text-red-800 p-1 rounded"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300">Manager: {dep.manager}</p>
                            <p className="text-gray-600 dark:text-gray-300">{dep.employees} employees</p>
                        </motion.div>
                    ))
                ) : (
                    <motion.div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        <AlertCircle className="h-12 w-12 mx-auto mb-2" />
                        <p>No departments found</p>
                    </motion.div>
                )}
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                <table className="min-w-full bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Manager</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Employees</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredDepartments.length > 0 ? (
                            filteredDepartments.map((dep) => (
                                <tr key={dep.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{dep.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{dep.manager}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{dep.employees}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button 
                                            onClick={() => handleEdit(dep)} 
                                            className="text-blue-600 hover:text-blue-900 mr-3"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(dep.id)} 
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                                    <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                                    No departments found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default Departments;