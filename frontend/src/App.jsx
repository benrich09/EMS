import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from "./pages/Login.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx"


function App() {

  return (
    <>
    <BrowserRouter>
        <Routes>

        <Route path="/" element={<Navigate to ="/admin-dashboard"/> }></Route>
        <Route path="/login" element={<Login/> }></Route>
        <Route path="/login" element={<AdminDashboard/> }></Route>

        </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
