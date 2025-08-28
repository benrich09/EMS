import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function Departments() {
    const [departments, setDepartments] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ id: null, name: '', manager: '', employees: 0 });

    useEffect(() => {
        // Mock data; replace with API fetch
        setDepartments([
            { id: 1, name: 'IT', manager: 'Alice Johnson', employees: 50 },
            { id: 2, name: 'HR', manager: 'Bob Smith', employees: 20 },
        ]);
    }, []);

    const handleAddOrEdit = () => {
        if (formData.id) {
            setDepartments(departments.map(dep => dep.id === formData.id ? { ...formData } : dep));
        } else {
            setDepartments([...departments, { ...formData, id: departments.length + 1 }]);
        }
        setShowForm(false);
        setFormData({ id: null, name: '', manager: '', employees: 0 });
    };

    const handleEdit = (dep) => {
        setFormData(dep);
        setShowForm(true);
    };

    const handleDelete = (id) => {
        setDepartments(departments.filter(dep => dep.id !== id));
    };

    return (
        <div className="container mx-auto py-12 px-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Departments</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
                >
                    <Plus className="h-5 w-5 mr-2" /> Add Department
                </button>
            </div>
            {showForm && (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                        {formData.id ? 'Edit Department' : 'Add Department'}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="p-2 border rounded"
                        />
                        <input
                            type="text"
                            placeholder="Manager"
                            value={formData.manager}
                            onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                            className="p-2 border rounded"
                        />
                        <input
                            type="number"
                            placeholder="Number of Employees"
                            value={formData.employees}
                            onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                            className="p-2 border rounded"
                        />
                    </div>
                    <button
                        onClick={handleAddOrEdit}
                        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
                    >
                        Save
                    </button>
                </div>
            )}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                    <thead>
                    <tr>
                        <th className="py-2 px-4 border-b text-left text-gray-900 dark:text-white">Name</th>
                        <th className="py-2 px-4 border-b text-left text-gray-900 dark:text-white">Manager</th>
                        <th className="py-2 px-4 border-b text-left text-gray-900 dark:text-white">Employees</th>
                        <th className="py-2 px-4 border-b text-left text-gray-900 dark:text-white">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {departments.map((dep) => (
                        <tr key={dep.id}>
                            <td className="py-2 px-4 border-b text-gray-700 dark:text-gray-300">{dep.name}</td>
                            <td className="py-2 px-4 border-b text-gray-700 dark:text-gray-300">{dep.manager}</td>
                            <td className="py-2 px-4 border-b text-gray-700 dark:text-gray-300">{dep.employees}</td>
                            <td className="py-2 px-4 border-b">
                                <button onClick={() => handleEdit(dep)} className="text-blue-600 mr-2">
                                    <Edit className="h-5 w-5" />
                                </button>
                                <button onClick={() => handleDelete(dep.id)} className="text-red-600">
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