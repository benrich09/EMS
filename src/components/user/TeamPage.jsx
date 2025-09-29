// components/user/TeamPage.jsx (added features: team list, search, details)
import React, { useState, useEffect } from 'react';
import { Users, Search, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TeamPage() {
    const [teamMembers, setTeamMembers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredMembers, setFilteredMembers] = useState([]);

    useEffect(() => {
        // Mock data
        const mockTeam = [
            { id: 1, name: 'John Doe', role: 'Developer', email: 'john@example.com', phone: '123-456-7890' },
            { id: 2, name: 'Jane Smith', role: 'Designer', email: 'jane@example.com', phone: '987-654-3210' },
            // Add more
        ];
        setTeamMembers(mockTeam);
        setFilteredMembers(mockTeam);
    }, []);

    useEffect(() => {
        const filtered = teamMembers.filter(member =>
            member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.role.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredMembers(filtered);
    }, [searchTerm, teamMembers]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Team</h1>
            <div className="mb-6">
                <div className="relative max-w-md">
                    <input
                        type="text"
                        placeholder="Search team members..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 pl-10 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMembers.map(member => (
                    <motion.div
                        key={member.id}
                        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition"
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="flex items-center mb-4">
                            <Users className="h-8 w-8 text-blue-500 mr-4" />
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mb-2">Role: {member.role}</p>
                        <div className="flex items-center text-gray-700 dark:text-gray-300 mb-2">
                            <Mail className="h-5 w-5 mr-2" /> {member.email}
                        </div>
                        <div className="flex items-center text-gray-700 dark:text-gray-300">
                            <Phone className="h-5 w-5 mr-2" /> {member.phone}
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}