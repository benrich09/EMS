import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminLayout from './components/Admin/AdminLayout.tsx';
import DashboardHome from './components/Admin/DashboardHome.tsx';
import Departments from './components/Admin/Departments.tsx';
import LeaveManagement from './components/Admin/LeaveManagement.tsx';
import Employees from './components/Admin/Employees.tsx';
import Payroll from './components/Admin/Payroll.tsx';
import UserLayout from './components/user/UserLayout.tsx';
import UserHome from './components/user/UserHome.tsx';
import PayInfo from './components/user/PayInfo.tsx';
import Profile from './components/user/Profile.tsx';
import TeamPage from './components/user/TeamPage.tsx';
import TasksPage from './components/user/TasksPage.tsx';
import Logout from './components/user/Logout.tsx';
import Settings from "./components/user/Settings.tsx";
import UserLeaves from './components/user/Leaves.tsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<DashboardHome />} />
                    <Route path="employees" element={<Employees />} />
                    <Route path="departments" element={<Departments />} />
                    <Route path="payroll" element={<Payroll />} />
                    <Route path="leaves" element={<LeaveManagement />} />
                </Route>
                <Route path="/dashboard" element={<UserLayout />}>
                    <Route index element={<UserHome />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="payinfo" element={<PayInfo />} />
                    <Route path="teampage" element={<TeamPage />} />
                    <Route path="taskpage" element={<TasksPage />} />
                    <Route path="leaves" element={<UserLeaves />} />
                    <Route path="setting" element={<Settings />} />
                    <Route path="logout" element={<Logout />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;