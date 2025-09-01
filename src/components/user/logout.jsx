import React, { useState, useEffect } from 'react';

export default function LogoutPage() {
    useEffect(() => {
        // Mock logout; replace with actual logic
        alert('Logging out...');
        // Redirect to login or home
    }, []);

    return (
        <main className="ml-64 w-full pt-20 px-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-8">Logging Out</h1>
            <p className="text-gray-700">You have been logged out.</p>
        </main>
    );
}