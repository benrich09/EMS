import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/Admin/AdminDashboard.jsx';
import Department from "./components/Admin/Department.jsx";
import LeaveManagement from "./components/Admin/LeaveManagement.jsx";
import Employees from "./components/Admin/Employees.jsx";
import Payroll from "./components/Admin/Payroll.jsx";
import Layout from "components/Admin/Layout.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/employees" element={<Employees/>} />
                <Route path="/admin/departments" element={<Department/>} />
                <Route path="/admin/payroll" element={<Payroll/>} />
                <Route path="/admin/leaves" element={<LeaveManagement/>} />
                <Route path="/admin/layout" element={<Layout/>} />
            </Routes>
        </Router>
    );
}

export default App;
