import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, Edit, Trash2, PlusCircle } from 'lucide-react';

function LeaveManagement() {
    const [leaves, setLeaves] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentLeave, setCurrentLeave] = useState(null);
    const [formData, setFormData] = useState({
        employee: '',
        type: 'Vacation',
        start: '',
        end: '',
        status: 'Pending'
    });

    useEffect(() => {
        // Mock data; replace with API fetch in production
        setLeaves([
            { id: 1, employee: 'John Doe', type: 'Vacation', start: '2025-09-01', end: '2025-09-05', status: 'Pending' },
            { id: 2, employee: 'Jane Smith', type: 'Sick', start: '2025-08-25', end: '2025-08-27', status: 'Approved' },
        ]);
    }, []);

    const handleApprove = (id) => {
        setLeaves(leaves.map(leave => leave.id === id ? { ...leave, status: 'Approved' } : leave));
    };

    const handleReject = (id) => {
        setLeaves(leaves.map(leave => leave.id === id ? { ...leave, status: 'Rejected' } : leave));
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this leave request?')) {
            setLeaves(leaves.filter(leave => leave.id !== id));
        }
    };

    const handleEdit = (leave) => {
        setCurrentLeave(leave);
        setFormData({ ...leave });
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setCurrentLeave(null);
        setFormData({
            employee: '',
            type: 'Vacation',
            start: '',
            end: '',
            status: 'Pending'
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentLeave) {
            // Update existing leave
            setLeaves(leaves.map(leave => leave.id === currentLeave.id ? { ...formData, id: leave.id } : leave));
        } else {
            // Add new leave
            setLeaves([...leaves, { ...formData, id: leaves.length + 1 }]);
        }
        setIsModalOpen(false);
        setFormData({ employee: '', type: 'Vacation', start: '', end: '', status: 'Pending' });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="container mx-auto py-12 px-4 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Leave Management Admin</h1>
                <button
                    onClick={handleAdd}
                    className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    <PlusCircle className="h-5 w-5 mr-2" /> Add Leave
                </button>
            </div>

            {/* Leave Table */}
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="min-w-full bg-white border border-gray-100">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="py-3 px-6 text-left text-gray-900 font-semibold">Employee</th>
                        <th className="py-3 px-6 text-left text-gray-900 font-semibold">Type</th>
                        <th className="py-3 px-6 text-left text-gray-900 font-semibold">Start Date</th>
                        <th className="py-3 px-6 text-left text-gray-900 font-semibold">End Date</th>
                        <th className="py-3 px-6 text-left text-gray-900 font-semibold">Status</th>
                        <th className="py-3 px-6 text-left text-gray-900 font-semibold">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {leaves.map((leave) => (
                        <tr key={leave.id} className="hover:bg-gray-50">
                            <td className="py-3 px-6 text-gray-700">{leave.employee}</td>
                            <td className="py-3 px-6 text-gray-700">{leave.type}</td>
                            <td className="py-3 px-6 text-gray-700">{leave.start}</td>
                            <td className="py-3 px-6 text-gray-700">{leave.end}</td>
                            <td className="py-3 px-6 text-gray-700 flex items-center">
                                {leave.status === 'Approved' && <CheckCircle className="text-green-600 h-5 w-5 mr-2" />}
                                {leave.status === 'Rejected' && <XCircle className="text-red-600 h-5 w-5 mr-2" />}
                                {leave.status === 'Pending' && <Clock className="text-yellow-600 h-5 w-5 mr-2" />}
                                {leave.status}
                            </td>
                            <td className="py-3 px-6">
                                {leave.status === 'Pending' && (
                                    <>
                                        <button
                                            onClick={() => handleApprove(leave.id)}
                                            className="text-green-600 hover:text-green-800 mr-3"
                                            title="Approve"
                                        >
                                            <CheckCircle className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => handleReject(leave.id)}
                                            className="text-red-600 hover:text-red-800 mr-3"
                                            title="Reject"
                                        >
                                            <XCircle className="h-5 w-5" />
                                        </button>
                                    </>
                                )}
                                <button
                                    onClick={() => handleEdit(leave.id)}
                                    className="text-blue-600 hover:text-blue-800 mr-3"
                                    title="Edit"
                                >
                                    <Edit className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => handleDelete(leave.id)}
                                    className="text-red-600 hover:text-red-800"
                                    title="Delete"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for Add/Edit Leave */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4">{currentLeave ? 'Edit Leave' : 'Add Leave'}</h2>
                        <div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold mb-1">Employee</label>
                                <input
                                    type="text"
                                    name="employee"
                                    value={formData.employee}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold mb-1">Leave Type</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                >
                                    <option value="Vacation">Vacation</option>
                                    <option value="Sick">Sick</option>
                                    <option value="Personal">Personal</option>
                                    <option value="Maternity">Maternity</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold mb-1">Start Date</label>
                                <input
                                    type="date"
                                    name="start"
                                    value={formData.start}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold mb-1">End Date</label>
                                <input
                                    type="date"
                                    name="end"
                                    value={formData.end}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    {currentLeave ? 'Update' : 'Add'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LeaveManagement;