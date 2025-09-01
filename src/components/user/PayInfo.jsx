import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { UserRound, Calendar, Home, LogOut, Bell, Settings, Briefcase, FileText, Users, Clock } from 'lucide-react';
export default function PayInfo() {
    const [payInfo, setPayInfo] = useState({
        salary: 75000,
        lastPay: 'August 31, 2025',
        nextPay: 'September 15, 2025',
        deductions: 1200,
    });

    useEffect(() => {
        // Mock fetch; replace with API
        const fetchPayInfo = async () => {
            setPayInfo({
                salary: 75000,
                lastPay: 'August 31, 2025',
                nextPay: 'September 15, 2025',
                deductions: 1200,
            });
        };
        fetchPayInfo();
    }, []);

    return (
        <main className="ml-64 w-full pt-20 px-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-8">Pay Information</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StatCard icon={FileText} title="Annual Salary" value={`$${payInfo.salary}`} color="blue" />
                <StatCard icon={Calendar} title="Last Pay Date" value={payInfo.lastPay} color="green" />
                <StatCard icon={Calendar} title="Next Pay Date" value={payInfo.nextPay} color="purple" />
                <StatCard icon={FileText} title="Monthly Deductions" value={`$${payInfo.deductions}`} color="orange" />
            </div>
            {/* Add interaction: Download pay stub */}
            <div className="mt-8">
                <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
                    Download Latest Pay Stub
                </button>
            </div>
        </main>
    );
}

