import React, { useState, useEffect } from 'react';
import { UserRound, Upload } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Profile() {
    const [profile, setProfile] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        position: 'Software Engineer',
        department: 'Engineering',
        phone: '',
        address: '',
        photo: null,
    });

    useEffect(() => {
        // Mock fetch
        setProfile({
            name: 'John Doe',
            email: 'john.doe@example.com',
            position: 'Software Engineer',
            department: 'Engineering',
            phone: '123-456-7890',
            address: '123 Main St',
            photo: null,
        });
    }, []);

    const handleInputChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile({ ...profile, photo: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Profile updated!');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Profile</h1>
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <img
                            src={profile.photo || 'https://via.placeholder.com/150'}
                            alt="Profile"
                            className="h-32 w-32 rounded-full object-cover"
                        />
                        <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer">
                            <Upload className="h-4 w-4 text-white" />
                            <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                        </label>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={profile.name}
                            onChange={handleInputChange}
                            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleInputChange}
                            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Position</label>
                        <input
                            type="text"
                            name="position"
                            value={profile.position}
                            onChange={handleInputChange}
                            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Department</label>
                        <input
                            type="text"
                            name="department"
                            value={profile.department}
                            onChange={handleInputChange}
                            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={profile.phone}
                            onChange={handleInputChange}
                            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={profile.address}
                            onChange={handleInputChange}
                            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                </div>
                <button type="submit" className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg">
                    Save Changes
                </button>
            </form>
        </motion.div>
    );
}