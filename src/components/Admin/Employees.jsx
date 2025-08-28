import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function Employees() {
    const [employees, setEmployees] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ id: null, name: '', position: '', department: '', salary: '' });

    useEffect(() => {
        // Mock data; replace with API fetch
        setEmployees([
            { id: 1, name: 'John Doe', position: 'Developer', department: 'IT', salary: 80000 },
            { id: 2, name: 'Jane Smith', position: 'Designer', department: 'Creative', salary: 70000 },
        ]);
    }, []);

    const handleAddOrEdit = () => {
        if (formData.id) {
            // Edit
            setEmployees(employees.map(emp => emp.id === formData.id ? { ...formData } : emp));
        } else {
            // Add
            setEmployees([...employees, { ...formData, id: employees.length + 1 }]);
        }
        setShowForm(false);
        setFormData({ id: null, name: '', position: '', department: '', salary: '' });
    };

    const handleEdit = (emp) => {
        setFormData(emp);
        setShowForm(true);
    };

    const handleDelete = (id) => {
        setEmployees(employees.filter(emp => emp.id !== id));
    };

    return (
        <div className="container mx-auto py-12 px-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Employees</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
                >
                    <Plus className="h-5 w-5 mr-2" /> Add Employee
                </button>
            </div>
            {showForm && (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
                    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                        {formData.id ? 'Edit Employee' : 'Add Employee'}
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
                            placeholder="Position"
                            value={formData.position}
                            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                            className="p-2 border rounded"
                        />
                        <input
                            type="text"
                            placeholder="Department"
                            value={formData.department}
                            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                            className="p-2 border rounded"
                        />
                        <input
                            type="number"
                            placeholder="Salary"
                            value={formData.salary}
                            onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
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
                        <th className="py-2 px-4 border-b text-left text-gray-900 dark:text-white">Position</th>
                        <th className="py-2 px-4 border-b text-left text-gray-900 dark:text-white">Department</th>
                        <th className="py-2 px-4 border-b text-left text-gray-900 dark:text-white">Salary</th>
                        <th className="py-2 px-4 border-b text-left text-gray-900 dark:text-white">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {employees.map((emp) => (
                        <tr key={emp.id}>
                            <td className="py-2 px-4 border-b text-gray-700 dark:text-gray-300">{emp.name}</td>
                            <td className="py-2 px-4 border-b text-gray-700 dark:text-gray-300">{emp.position}</td>
                            <td className="py-2 px-4 border-b text-gray-700 dark:text-gray-300">{emp.department}</td>
                            <td className="py-2 px-4 border-b text-gray-700 dark:text-gray-300">${emp.salary}</td>
                            <td className="py-2 px-4 border-b">
                                <button onClick={() => handleEdit(emp)} className="text-blue-600 mr-2">
                                    <Edit className="h-5 w-5" />
                                </button>
                                <button onClick={() => handleDelete(emp.id)} className="text-red-600">
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