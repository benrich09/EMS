import React, { useState } from 'react';
import { UserRound, Mail, Lock, Bell, Save } from 'lucide-react';

export default function Settings() {
    const [userData, setUserData] = useState({
        fullName: 'John Doe',
        email: 'john.doe@company.com',
        password: '',
        confirmPassword: '',
        notifications: true,
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUserData({
            ...userData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userData.password !== userData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        // Simulate saving settings (e.g., API call)
        console.log('Saving settings:', userData);
        alert('Settings saved successfully!');
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Settings className="w-6 h-6 mr-2 text-blue-500" />
                Account Settings
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Profile Information */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Profile Information</h2>
                    <div>
                        <label htmlFor="fullName" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            <UserRound className="w-4 h-4 mr-2" />
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={userData.fullName}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your full name"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            <Mail className="w-4 h-4 mr-2" />
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={userData.email}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>
                </div>

                {/* Password Change */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Change Password</h2>
                    <div>
                        <label htmlFor="password" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            <Lock className="w-4 h-4 mr-2" />
                            New Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={userData.password}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter new password"
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            <Lock className="w-4 h-4 mr-2" />
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={userData.confirmPassword}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Confirm new password"
                        />
                    </div>
                </div>

                {/* Notification Preferences */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Notification Preferences</h2>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="notifications"
                            name="notifications"
                            checked={userData.notifications}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
                        />
                        <label htmlFor="notifications" className="flex items-center ml-2 text-sm text-gray-700 dark:text-gray-300">
                            <Bell className="w-4 h-4 mr-2" />
                            Receive email notifications
                        </label>
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
                    >
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}