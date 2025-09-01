import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './components/user/UserDashboard.jsx';
import AdminDashboard from './components/Admin/AdminDashboard.jsx';
import Department from "./components/Admin/Department.jsx";
import LeaveManagement from "./components/Admin/LeaveManagement.jsx";
import Employees from "./components/Admin/Employees.jsx";
import Payroll from "./components/Admin/Payroll.jsx";
import PayInfo from "./components/user/PayInfo.jsx"
import Profile from "./components/user/Profile.jsx"
import TeamPage  from "./components/user/Teampage.jsx";
import TasksPage  from "./components/user/Taskpage.jsx";
import Logout from "./components/user/logout.jsx"
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/employees" element={<Employees />} />
                <Route path="/admin/departments" element={<Department />} />
                <Route path="/admin/payroll" element={<Payroll />} />
                <Route path="/admin/leaves" element={<LeaveManagement />} />
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/dashboard/profile" element={<Profile />} />
                <Route path="/dashboard/payinfo" element={<PayInfo />} />
                <Route path="/dashboard/teampage" element={<TeamPage />} />
                <Route path="/dashboard/taskpage" element={<TasksPage />} />
                <Route path="/dashboard/logout" element={<Logout />} />
            </Routes>
        </Router>
    );
}

export default App;
