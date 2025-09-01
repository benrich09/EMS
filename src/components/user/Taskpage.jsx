import React, { useState, useEffect } from 'react';

export default function TasksPage() {
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Complete Report', due: '2025-09-05', status: 'Pending' },
        { id: 2, title: 'Team Meeting', due: '2025-09-10', status: 'In Progress' },
    ]);

    return (
        <main className="ml-64 w-full pt-20 px-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-8">Tasks</h1>
            <ul className="space-y-4">
                {tasks.map(task => (
                    <li key={task.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between">
                        <div>
                            <h3 className="font-semibold">{task.title}</h3>
                            <p className="text-sm text-gray-600">Due: {task.due}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm ${task.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>
                            {task.status}
                        </span>
                    </li>
                ))}
            </ul>
            {/* Add interaction: Add new task */}
            <div className="mt-8">
                <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition">
                    Add New Task
                </button>
            </div>
        </main>
    );
}

