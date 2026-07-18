// HRISELINK-style employee management: summary cards, searchable/sortable
// table with avatars and status pills, CSV export, add/edit/delete modal.
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, X, Download, Users, UserCheck, UserMinus, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

type Status = 'Active' | 'Inactive' | 'Onboarding';

interface Employee {
    id: number;
    name: string;
    email: string;
    employeeId: string;
    position: string;
    department: string;
    salary: string;
    hireDate: string;
    status: Status;
}

const seedEmployees: Employee[] = [
    { id: 1, name: 'Randy Madsen',    email: 'randy@example.com',   employeeId: 'A01DSGN193', position: 'UI Designer',        department: 'Design',      salary: '1200000', hireDate: '2022-08-11', status: 'Active' },
    { id: 2, name: 'Maria Rosser',    email: 'maria@example.com',   employeeId: 'A02DSGN196', position: 'UX Researcher',      department: 'Design',      salary: '1150000', hireDate: '2021-06-25', status: 'Inactive' },
    { id: 3, name: 'Cheyenne Bothman',email: 'cheyenne@example.com',employeeId: 'A05DEVP381', position: 'iOS Developer',      department: 'IT',          salary: '1500000', hireDate: '2025-02-20', status: 'Onboarding' },
    { id: 4, name: 'Alfredo Curtis',  email: 'alfredo@example.com', employeeId: 'A04DEVP312', position: 'Android Developer',  department: 'IT',          salary: '1500000', hireDate: '2024-05-14', status: 'Active' },
    { id: 5, name: 'Ryan Lewis',      email: 'ryan@example.com',    employeeId: 'A03DEVP273', position: 'Back-End Developer', department: 'IT',          salary: '1600000', hireDate: '2024-07-31', status: 'Active' },
    { id: 6, name: 'Giana Botosh',    email: 'giana@example.com',   employeeId: 'A02MRKT028', position: 'Digital Marketing',  department: 'Marketing',   salary: '900000',  hireDate: '2022-12-04', status: 'Inactive' },
    { id: 7, name: 'Rayna Baptista',  email: 'rayna@example.com',   employeeId: 'A01MNGR019', position: 'Project Manager',    department: 'HR',          salary: '1800000', hireDate: '2022-01-09', status: 'Active' },
    { id: 8, name: 'Kaiya Wilson',    email: 'kaiya@example.com',   employeeId: 'A03DSGN083', position: 'Graphic Designer',   department: 'Creative',    salary: '950000',  hireDate: '2024-10-18', status: 'Active' },
    { id: 9, name: 'Ahmad Workman',   email: 'ahmad@example.com',   employeeId: 'A01MRKT012', position: 'Sales Marketing',    department: 'Marketing',   salary: '880000',  hireDate: '2025-01-09', status: 'Onboarding' },
];

const statusStyles: Record<Status, string> = {
    Active:     'bg-green-50 text-green-700 border border-green-200',
    Inactive:   'bg-red-50 text-red-600 border border-red-200',
    Onboarding: 'bg-orange-50 text-orange-600 border border-orange-200',
};

const avatarColors = ['bg-blue-600', 'bg-green-600', 'bg-red-500', 'bg-indigo-600', 'bg-teal-600', 'bg-orange-500'];

const emptyForm = { id: null as number | null, name: '', email: '', employeeId: '', position: '', department: '', salary: '', hireDate: '', status: 'Active' as Status };

export default function Employees() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState(emptyForm);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: keyof Employee; direction: 'asc' | 'desc' }>({ key: 'name', direction: 'asc' });

    const departments = ['IT', 'Creative', 'HR', 'Finance', 'Marketing', 'Design'];
    const statuses: Status[] = ['Active', 'Inactive', 'Onboarding'];

    useEffect(() => {
        try {
            const stored = JSON.parse(localStorage.getItem('employees') || 'null');
            setEmployees(Array.isArray(stored) && stored.length ? stored : seedEmployees);
        } catch {
            setEmployees(seedEmployees);
        }
    }, []);

    useEffect(() => {
        if (employees.length) localStorage.setItem('employees', JSON.stringify(employees));
    }, [employees]);

    const filtered = employees
        .filter((e) =>
            e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            e.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            const dir = sortConfig.direction === 'asc' ? 1 : -1;
            const av = sortConfig.key === 'salary' ? parseFloat(a.salary) : a[sortConfig.key];
            const bv = sortConfig.key === 'salary' ? parseFloat(b.salary) : b[sortConfig.key];
            return av! < bv! ? -dir : av! > bv! ? dir : 0;
        });

    const counts = {
        total: employees.length,
        active: employees.filter((e) => e.status === 'Active').length,
        inactive: employees.filter((e) => e.status === 'Inactive').length,
        onboarding: employees.filter((e) => e.status === 'Onboarding').length,
    };

    const summary = [
        { label: 'Total employees',      value: counts.total,      delta: '+4',  up: true,  icon: Users },
        { label: 'Active employees',     value: counts.active,     delta: '+2',  up: true,  icon: UserCheck },
        { label: 'Inactive employees',   value: counts.inactive,   delta: '-1',  up: false, icon: UserMinus },
        { label: 'Onboarding employees', value: counts.onboarding, delta: '+2',  up: true,  icon: UserPlus },
    ];

    const requestSort = (key: keyof Employee) =>
        setSortConfig((c) => ({ key, direction: c.key === key && c.direction === 'asc' ? 'desc' : 'asc' }));

    const sortIcon = (key: keyof Employee) =>
        sortConfig.key !== key ? '' : sortConfig.direction === 'asc' ? ' ↑' : ' ↓';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.id != null) {
            setEmployees(employees.map((emp) => (emp.id === formData.id ? { ...(formData as Employee) } : emp)));
        } else {
            const nextId = Math.max(0, ...employees.map((e2) => e2.id)) + 1;
            const empId = formData.employeeId || `A0${nextId}STAF${String(100 + nextId)}`;
            setEmployees([...employees, { ...(formData as Omit<Employee, 'id' | 'employeeId'>), id: nextId, employeeId: empId } as Employee]);
        }
        closeModal();
    };

    const handleEdit = (emp: Employee) => { setFormData(emp); setShowModal(true); };
    const handleDelete = (id: number) => {
        if (window.confirm('Delete this employee?')) setEmployees(employees.filter((e) => e.id !== id));
    };
    const closeModal = () => { setShowModal(false); setFormData(emptyForm); };

    const exportCSV = () => {
        const header = 'Name,Email,Employee ID,Job title,Department,Salary,Join date,Status';
        const rows = employees.map((e) =>
            [e.name, e.email, e.employeeId, e.position, e.department, e.salary, e.hireDate, e.status].join(','));
        const blob = new Blob([[header, ...rows].join('\n')], { type: 'text/csv' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'employees.csv';
        a.click();
        URL.revokeObjectURL(a.href);
    };

    const inputClass = 'w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500';

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Employee</h1>
                <div className="flex gap-2">
                    <button onClick={exportCSV}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                        <Download size={15} /> Export CSV
                    </button>
                    <button onClick={() => setShowModal(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-gray-900 text-white hover:bg-gray-800 transition-colors shadow-sm">
                        <Plus size={15} /> Add new
                    </button>
                </div>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-4 gap-3">
                {summary.map(({ label, value, delta, up, icon: Icon }) => (
                    <div key={label} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-3.5 shadow-sm">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-gray-200 text-gray-500 mb-2.5">
                            <Icon size={15} />
                        </span>
                        <div className="flex items-baseline gap-2">
                            <p className="text-xl font-bold text-gray-900 dark:text-white">{value.toLocaleString()}</p>
                            <span className={`text-xs font-semibold ${up ? 'text-green-600' : 'text-red-500'}`}>{delta}</span>
                        </div>
                        <p className="text-[11px] font-medium text-gray-500 mt-0.5">{label}</p>
                    </div>
                ))}
            </div>

            {/* Table card */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                    <div className="relative w-72 max-w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search name, email or ID…"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors"
                        />
                    </div>
                    <p className="text-xs text-gray-400 shrink-0">{filtered.length} of {employees.length} records</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-gray-800 text-left text-[11px] uppercase tracking-wider text-gray-500">
                                <th className="py-3 px-4 font-semibold cursor-pointer select-none" onClick={() => requestSort('name')}>Name of employee{sortIcon('name')}</th>
                                <th className="py-3 px-4 font-semibold">Employee ID</th>
                                <th className="py-3 px-4 font-semibold cursor-pointer select-none" onClick={() => requestSort('position')}>Job title{sortIcon('position')}</th>
                                <th className="py-3 px-4 font-semibold cursor-pointer select-none" onClick={() => requestSort('department')}>Department{sortIcon('department')}</th>
                                <th className="py-3 px-4 font-semibold cursor-pointer select-none" onClick={() => requestSort('salary')}>Salary{sortIcon('salary')}</th>
                                <th className="py-3 px-4 font-semibold cursor-pointer select-none" onClick={() => requestSort('hireDate')}>Join date{sortIcon('hireDate')}</th>
                                <th className="py-3 px-4 font-semibold">Status</th>
                                <th className="py-3 px-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {filtered.map((emp, i) => (
                                <tr key={emp.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-3">
                                            <span className={`w-8 h-8 rounded-full ${avatarColors[i % avatarColors.length]} text-white text-xs font-bold flex items-center justify-center shrink-0`}>
                                                {emp.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                                            </span>
                                            <div className="min-w-0">
                                                <p className="font-semibold text-gray-900 dark:text-white truncate">{emp.name}</p>
                                                <p className="text-xs text-gray-400 truncate">{emp.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 font-mono text-xs text-gray-600 dark:text-gray-300 underline underline-offset-2 decoration-gray-300">{emp.employeeId}</td>
                                    <td className="py-3 px-4 text-gray-700 dark:text-gray-200">{emp.position}</td>
                                    <td className="py-3 px-4 text-gray-500">{emp.department} Team</td>
                                    <td className="py-3 px-4 text-gray-700 dark:text-gray-200">{Number(emp.salary).toLocaleString()}</td>
                                    <td className="py-3 px-4 text-gray-500">{new Date(emp.hireDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</td>
                                    <td className="py-3 px-4">
                                        <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-semibold ${statusStyles[emp.status]}`}>
                                            {emp.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex justify-end gap-1">
                                            <button onClick={() => handleEdit(emp)} className="p-1.5 rounded-md text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" aria-label={`Edit ${emp.name}`}>
                                                <Edit size={15} />
                                            </button>
                                            <button onClick={() => handleDelete(emp.id)} className="p-1.5 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors" aria-label={`Delete ${emp.name}`}>
                                                <Trash2 size={15} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && (
                                <tr><td colSpan={8} className="py-12 text-center text-gray-400 text-sm">No employees match your search.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add / edit modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-200 dark:border-gray-800"
                    >
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                            <h2 className="font-bold text-gray-900 dark:text-white">{formData.id != null ? 'Edit employee' : 'Add employee'}</h2>
                            <button onClick={closeModal} className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors" aria-label="Close">
                                <X size={17} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Full name</label>
                                <input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputClass} placeholder="Jane Doe" />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email</label>
                                <input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputClass} placeholder="jane@example.com" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Job title</label>
                                <input required value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} className={inputClass} placeholder="UI Designer" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Department</label>
                                <select required value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} className={inputClass}>
                                    <option value="">Select…</option>
                                    {departments.map((d) => <option key={d} value={d}>{d}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Salary</label>
                                <input required type="number" value={formData.salary} onChange={(e) => setFormData({ ...formData, salary: e.target.value })} className={inputClass} placeholder="1200000" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Join date</label>
                                <input required type="date" value={formData.hireDate} onChange={(e) => setFormData({ ...formData, hireDate: e.target.value })} className={inputClass} />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Status</label>
                                <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value as Status })} className={inputClass}>
                                    {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div className="col-span-2 flex justify-end gap-2 pt-2">
                                <button type="button" onClick={closeModal} className="px-4 py-2 rounded-lg text-sm font-semibold bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">Cancel</button>
                                <button type="submit" className="px-4 py-2 rounded-lg text-sm font-semibold bg-gray-900 text-white hover:bg-gray-800 transition-colors">
                                    {formData.id != null ? 'Save changes' : 'Add employee'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </motion.div>
    );
}
