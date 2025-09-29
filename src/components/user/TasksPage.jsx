import React, { useState, useEffect } from 'react';
import { Briefcase, Plus, Edit, Trash2, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TasksPage() {
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ id: null, title: '', due: '', status: 'Pending' });
    const [currentTask, setCurrentTask] = useState(null);

    useEffect(() => {
        // Mock data
        const mockTasks = [
            { id: 1, title: 'Complete Report', due: '2025-09-05', status: 'Pending' },
            { id: 2, title: 'Team Meeting', due: '2025-09-10', status: 'In Progress' },
        ];
        setTasks(mockTasks);
    }, []);

    const handleAddOrEdit = () => {
        if (currentTask) {
            setTasks(tasks.map(task => task.id === currentTask.id ? { ...formData } : task));
        } else {
            setTasks([...tasks, { ...formData, id: tasks.length + 1 }]);
        }
        closeModal();
    };

    const handleEdit = (task) => {
        setCurrentTask(task);
        setFormData(task);
        setShowModal(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Delete task?')) {
            setTasks(tasks.filter(task => task.id !== id));
        }
    };

    const handleMarkComplete = (id) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, status: 'Completed' } : task));
    };

    const closeModal = () => {
        setShowModal(false);
        setFormData({ id: null, title: '', due: '', status: 'Pending' });
        setCurrentTask(null);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Tasks</h1>
            <ul className="space-y-4">
                {tasks.map(task => (
                    <motion.li
                        key={task.id}
                        className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 flex justify-between items-center"
                        whileHover={{ scale: 1.02 }}
                    >
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">{task.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Due: {task.due}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className={`px-3 py-1 rounded-full text-sm ${task.status === 'Pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' : task.status === 'In Progress' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'}`}>
                                {task.status}
                            </span>
                            <button onClick={() => handleMarkComplete(task.id)} className="text-green-600 hover:text-green-800">
                                <Check className="h-5 w-5" />
                            </button>
                            <button onClick={() => handleEdit(task)} className="text-blue-600 hover:text-blue-800">
                                <Edit className="h-5 w-5" />
                            </button>
                            <button onClick={() => handleDelete(task.id)} className="text-red-600 hover:text-red-800">
                                <Trash2 className="h-5 w-5" />
                            </button>
                        </div>
                    </motion.li>
                ))}
            </ul>
            <div className="mt-8">
                <button onClick={() => setShowModal(true)} className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition shadow-md hover:shadow-lg">
                    <Plus className="h-5 w-5 inline mr-2" /> Add New Task
                </button>
            </div>

            {showModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                >
                    <motion.div
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full"
                    >
                        <div className="flex justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{currentTask ? 'Edit Task' : 'Add Task'}</h2>
                            <button onClick={closeModal} className="text-gray-500 dark:text-gray-400">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <input
                            type="text"
                            placeholder="Title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full p-2 border rounded mb-4 dark:bg-gray-700 dark:text-white"
                        />
                        <input
                            type="date"
                            placeholder="Due Date"
                            value={formData.due}
                            onChange={(e) => setFormData({ ...formData, due: e.target.value })}
                            className="w-full p-2 border rounded mb-4 dark:bg-gray-700 dark:text-white"
                        />
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            className="w-full p-2 border rounded mb-4 dark:bg-gray-700 dark:text-white"
                        >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                        <div className="flex justify-end space-x-2">
                            <button onClick={closeModal} className="bg-gray-300 px-4 py-2 rounded">
                                Cancel
                            </button>
                            <button onClick={handleAddOrEdit} className="bg-green-600 text-white px-4 py-2 rounded">
                                Save
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </motion.div>
    );
}