import React, { useState, useEffect } from 'react';
import { Check, Edit, Trash2, Plus, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TaskPage() {
    const [tasks, setTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setTasks([
                { id: 1, title: 'Website Redesign', due: 'Oct 25, 2025', status: 'Pending' },
                { id: 2, title: 'Quarterly Report', due: 'Oct 20, 2025', status: 'In Progress' },
                { id: 3, title: 'Client Meeting', due: 'Oct 18, 2025', status: 'Completed' },
            ]);
            setLoading(false);
        }, 800);
    }, []);

    const handleMarkComplete = (id) => {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, status: 'Completed' } : task
        ));
    };

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Tasks</h1>
                <div className="relative max-w-md">
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
            </div>

            <div className="space-y-4">
                {filteredTasks.map((task) => (
                    <motion.div
                        key={task.id}
                        className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-blue-200/50 dark:border-gray-700"
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{task.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Due: {task.due}</p>
                            </div>
                            <div className="flex items-center space-x-2 ml-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    task.status === 'Completed' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                                    task.status === 'In Progress' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' :
                                    'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                                }`}>
                                    {task.status}
                                </span>
                                {task.status !== 'Completed' && (
                                    <button 
                                        onClick={() => handleMarkComplete(task.id)}
                                        className="p-1 text-green-600 hover:text-green-800"
                                    >
                                        <Check className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}