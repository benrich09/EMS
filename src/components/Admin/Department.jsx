import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

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
        <div className="container mx-auto py-12 px-4 max-w-7xl">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Departments</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition duration-200"
                >
                    <Plus className="h-5 w-5 mr-2" /> Add Department
                </button>
            </div>
            {showForm && (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                        {formData.id ? 'Edit Department' : 'Add Department'}
                    </h2>
                    {error && (
                        <div className="mb-4 text-red-600 dark:text-red-400 font-medium">{error}</div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                            type="text"
                            placeholder="Department Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition duration-200"
                        />
                        <input
                            type="text"
                            placeholder="Manager Name"
                            value={formData.manager}
                            onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition duration-200"
                        />
                        <input
                            type="number"
                            placeholder="Number of Employees"
                            value={formData.employees}
                            onChange={(e) => setFormData({ ...formData, employees: parseInt(e.target.value) || 0 })}
                            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition duration-200"
                            min="0"
                        />
                    </div>
                    <div className="mt-6 flex space-x-3">
                        <button
                            onClick={handleAddOrEdit}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200"
                        >
                            Save
                        </button>
                        <button
                            onClick={handleCancel}
                            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
            <div className="overflow-x-auto rounded-lg shadow-md">
                <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <thead>
                    <tr>
                        <th className="py-3 px-6 border-b text-left text-gray-900 dark:text-white font-semibold">Name</th>
                        <th className="py-3 px-6 border-b text-left text-gray-900 dark:text-white font-semibold">Manager</th>
                        <th className="py-3 px-6 border-b text-left text-gray-900 dark:text-white font-semibold">Employees</th>
                        <th className="py-3 px-6 border-b text-left text-gray-900 dark:text-white font-semibold">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {departments.map((dep) => (
                        <tr key={dep.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150">
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
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Departments;