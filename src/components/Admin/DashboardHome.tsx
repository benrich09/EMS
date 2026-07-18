import React from 'react';
import { Link } from 'react-router-dom';
import {
    UserRound, Building, Banknote, Check, LogOut, Clock,
    UserPlus, PlayCircle, FolderPlus, CheckCircle2, ArrowUpRight, CalendarDays, Bell,
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid,
} from 'recharts';

/* Compact stat cards in the four system colors: white base + green / blue / red accents */
interface StatCard {
    title: string;
    value: string;
    icon: React.ReactNode;
    accent: 'blue' | 'green' | 'red' | 'neutral';
    path?: string;
}

const accentStyles = {
    blue:    { chip: 'bg-blue-50 text-blue-600',    bar: 'bg-blue-500' },
    green:   { chip: 'bg-green-50 text-green-600',  bar: 'bg-green-500' },
    red:     { chip: 'bg-red-50 text-red-600',      bar: 'bg-red-500' },
    neutral: { chip: 'bg-gray-100 text-gray-600',   bar: 'bg-gray-300' },
};

export default function DashboardHome() {
    const stats: StatCard[] = [
        { title: 'Employees',      value: '150',   icon: <UserRound size={16} />,    accent: 'blue',  path: '/admin/employees' },
        { title: 'Departments',    value: '5',     icon: <Building size={16} />,     accent: 'green', path: '/admin/departments' },
        { title: 'Pending Leaves', value: '10',    icon: <Check size={16} />,        accent: 'red',   path: '/admin/leaves' },
        { title: 'Payroll',        value: '$500K', icon: <Banknote size={16} />,     accent: 'blue',  path: '/admin/payroll' },
        { title: 'New Hires',      value: '8',     icon: <UserPlus size={16} />,     accent: 'green' },
        { title: 'Terminations',   value: '3',     icon: <LogOut size={16} />,       accent: 'red' },
        { title: 'Attendance',     value: '95%',   icon: <CheckCircle2 size={16} />, accent: 'green' },
        { title: 'Overtime',       value: '450h',  icon: <Clock size={16} />,        accent: 'blue' },
    ];

    const quickActions = [
        { name: 'Add employee',   path: '/admin/employees',   icon: <UserPlus size={15} />,     color: 'bg-blue-600 hover:bg-blue-700' },
        { name: 'Run payroll',    path: '/admin/payroll',     icon: <PlayCircle size={15} />,   color: 'bg-green-600 hover:bg-green-700' },
        { name: 'New department', path: '/admin/departments', icon: <FolderPlus size={15} />,   color: 'bg-gray-800 hover:bg-gray-900' },
        { name: 'Approve leaves', path: '/admin/leaves',      icon: <CheckCircle2 size={15} />, color: 'bg-red-600 hover:bg-red-700' },
    ];

    const recentActivities = [
        { text: 'John Doe requested 3 days vacation leave', time: '2h ago', accent: 'bg-red-500' },
        { text: 'August payroll processed successfully',    time: '5h ago', accent: 'bg-green-500' },
        { text: 'New "Marketing" department created',       time: 'Yesterday', accent: 'bg-blue-500' },
        { text: 'Jane Smith promoted to Senior Developer',  time: '2 days ago', accent: 'bg-green-500' },
        { text: 'Overtime tracking feature added',          time: '3 days ago', accent: 'bg-blue-500' },
    ];

    const upcoming = [
        { text: 'Payroll run — June salaries', date: 'Jun 28' },
        { text: 'Interviews — 3 candidates',   date: 'Jun 30' },
        { text: 'Quarterly performance reviews begin', date: 'Jul 02' },
    ];

    const chartData = [
        { name: 'Jan', employees: 120, leaves: 15 },
        { name: 'Feb', employees: 130, leaves: 20 },
        { name: 'Mar', employees: 135, leaves: 18 },
        { name: 'Apr', employees: 140, leaves: 22 },
        { name: 'May', employees: 145, leaves: 25 },
        { name: 'Jun', employees: 150, leaves: 20 },
    ];

    return (
        <div className="space-y-5">
            {/* Header + quick actions */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Overview</h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">A snapshot of your workforce today.</p>
                </div>
                <div className="flex gap-2">
                    {quickActions.map((a) => (
                        <Link key={a.name} to={a.path}
                            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-white shadow-sm transition-colors ${a.color}`}>
                            {a.icon} {a.name}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Primary stats — single bordered row, HRISELINK style */}
            <div className="grid grid-cols-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 divide-x divide-gray-100 dark:divide-gray-700 shadow-sm">
                {stats.slice(0, 4).map((card) => {
                    const st = accentStyles[card.accent];
                    const inner = (
                        <div className="px-5 py-4 h-full">
                            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg mb-2.5 ${st.chip}`}>
                                {card.icon}
                            </span>
                            <p className="text-xl font-bold text-gray-900 dark:text-white leading-tight">{card.value}</p>
                            <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400 mt-0.5">{card.title}</p>
                        </div>
                    );
                    return card.path
                        ? <Link to={card.path} key={card.title} className="block hover:bg-gray-50 dark:hover:bg-gray-700/50 first:rounded-l-xl last:rounded-r-xl transition-colors">{inner}</Link>
                        : <div key={card.title}>{inner}</div>;
                })}
            </div>

            {/* Secondary compact cards */}
            <div className="grid grid-cols-4 gap-3">
                {stats.slice(4).map((card) => {
                    const st = accentStyles[card.accent];
                    const inner = (
                        <div className="relative h-full bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 px-4 py-3 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                            <span className={`absolute left-0 top-0 bottom-0 w-1 ${st.bar}`} />
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{card.value}</p>
                                    <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400">{card.title}</p>
                                </div>
                                <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${st.chip}`}>
                                    {card.icon}
                                </span>
                            </div>
                        </div>
                    );
                    return card.path
                        ? <Link to={card.path} key={card.title} className="block">{inner}</Link>
                        : <div key={card.title}>{inner}</div>;
                })}
            </div>

            <div className="grid grid-cols-5 gap-4">
                {/* Chart */}
                <div className="col-span-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-bold text-gray-900 dark:text-white">Workforce trends</h2>
                        <span className="text-[11px] font-medium text-gray-400">Last 6 months</span>
                    </div>
                    <ResponsiveContainer width="100%" height={230}>
                        <BarChart data={chartData} barSize={14}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148,163,184,0.2)" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                            <Tooltip cursor={{ fill: 'rgba(59,130,246,0.06)' }} contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 12 }} />
                            <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                            <Bar dataKey="employees" fill="#2563eb" radius={[4, 4, 0, 0]} name="Employees" />
                            <Bar dataKey="leaves" fill="#22c55e" radius={[4, 4, 0, 0]} name="Leaves" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Right column: activity + upcoming */}
                <div className="col-span-2 space-y-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                            <Bell size={14} className="text-blue-600" />
                            <h2 className="text-sm font-bold text-gray-900 dark:text-white">Recent activity</h2>
                        </div>
                        <ul className="space-y-0.5">
                            {recentActivities.map((a) => (
                                <li key={a.text} className="flex items-start gap-2.5 px-2 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/60 transition-colors">
                                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${a.accent}`} />
                                    <div className="min-w-0">
                                        <p className="text-xs text-gray-700 dark:text-gray-200 leading-snug">{a.text}</p>
                                        <p className="text-[10px] text-gray-400 mt-0.5">{a.time}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                            <CalendarDays size={14} className="text-green-600" />
                            <h2 className="text-sm font-bold text-gray-900 dark:text-white">Upcoming</h2>
                        </div>
                        <ul className="space-y-2">
                            {upcoming.map((u) => (
                                <li key={u.text} className="flex items-center justify-between gap-3 text-xs">
                                    <span className="text-gray-700 dark:text-gray-200">{u.text}</span>
                                    <span className="shrink-0 font-semibold text-blue-600 bg-blue-50 dark:bg-blue-900/40 rounded-md px-2 py-0.5 text-[10px]">{u.date}</span>
                                </li>
                            ))}
                        </ul>
                        <Link to="/admin/leaves" className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-gray-500 hover:text-blue-600 transition-colors">
                            View leave calendar <ArrowUpRight size={12} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
