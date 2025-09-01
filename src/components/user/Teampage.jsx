import React, { useState, useEffect } from 'react';
import {Link, useLocation} from "react-router-dom";
import {Bell, Briefcase, Calendar, Home, LogOut, Settings, UserRound, Users} from "lucide-react";

export default function TeamPage() {

    return (
        <main className="ml-64 w-full pt-20 px-8 bg-gray-50 min-h-screen">

            <h1 className="text-3xl font-bold mb-8">Team</h1>
            <p className="text-gray-700">View and manage your team members here. (Implementation pending)</p>
        </main>
    );
}