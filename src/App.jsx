import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminLayout from './components/Admin/AdminLayout.jsx';
import DashboardHome from './components/Admin/DashboardHome.jsx';
import Departments from './components/Admin/Departments.jsx';
import LeaveManagement from './components/Admin/LeaveManagement.jsx';
import Employees from './components/Admin/Employees.jsx';
import Payroll from './components/Admin/Payroll.jsx';
import UserLayout from './components/user/UserLayout.jsx';
import UserHome from './components/user/UserHome.jsx';
import PayInfo from './components/user/PayInfo.jsx';
import Profile from './components/user/Profile.jsx';
import TeamPage from './components/user/TeamPage.jsx';
import TasksPage from './components/user/TasksPage.jsx';
import Logout from './components/user/Logout.jsx';
import Settings from "./components/user/Settings.jsx";

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
                    <Route path="setting" element={<Settings />} />
                    <Route path="logout" element={<Logout />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;