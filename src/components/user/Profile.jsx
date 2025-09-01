import React, { useState, useEffect } from 'react';

export default function Profile() {

    const [profile, setProfile] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        position: 'Software Engineer',
        department: 'Engineering',
    });

    useEffect(() => {
        // Mock fetch; replace with API
        const fetchProfile = async () => {
            setProfile({
                name: 'John Doe',
                email: 'john.doe@example.com',
                position: 'Software Engineer',
                department: 'Engineering',
            });
        };
        fetchProfile();
    }, []);

    const handleInputChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock save; replace with API call
        alert('Profile updated!');
    };

    return (
        <main className="ml-64 w-full pt-20 px-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-8">Profile</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={profile.name}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Position</label>
                        <input
                            type="text"
                            name="position"
                            value={profile.position}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Department</label>
                        <input
                            type="text"
                            name="department"
                            value={profile.department}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>
                </div>
                <button type="submit" className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                    Save Changes
                </button>
            </form>
        </main>
    );
}
