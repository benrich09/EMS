import React, { useState, useEffect } from 'react';
import { Users, Mail, Phone, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TeamPage() {
    const [teamMembers, setTeamMembers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setTeamMembers([
                { id: 1, name: 'Jane Smith', role: 'Senior Developer', email: 'jane@company.com', phone: '+255 123 456 789' },
                { id: 2, name: 'Mike Johnson', role: 'Product Manager', email: 'mike@company.com', phone: '+255 987 654 321' },
                { id: 3, name: 'Sarah Wilson', role: 'Designer', email: 'sarah@company.com', phone: '+255 456 789 123' },
            ]);
            setLoading(false);
        }, 800);
    }, []);

    const filteredMembers = teamMembers.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.role.toLowerCase().includes(searchTerm.toLowerCase())
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
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Team</h1>
                <div className="relative max-w-md">
                    <input
                        type="text"
                        placeholder="Search team members..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredMembers.map((member) => (
                    <motion.div
                        key={member.id}
                        className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border border-blue-200/50 dark:border-gray-700"
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="flex items-center mb-3">
                            <Users className="h-8 w-8 text-blue-500 mr-3" />
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Role: <span className="font-medium">{member.role}</span></p>
                        <div className="flex items-center text-sm text-gray-700 dark:text-gray-300 mb-2">
                            <Mail className="h-4 w-4 mr-2" /> {member.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                            <Phone className="h-4 w-4 mr-2" /> {member.phone}
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}