import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import LoginForm from './pages/auth/login/Login';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import Home from './pages/home/Home';
import Cookies from "js-cookie"
import Signup from './pages/auth/signup/signup';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Check if token and role cookies exist
    const token = Cookies.get("token");
    const role = Cookies.get("role");

    if (token) {
      if (role === "admin") {
        navigate("/admin"); // Redirect to admin dashboard
      } else if (role === "user") {
        navigate("/"); // Redirect to home
      }
    }
  }, [navigate]); // Add navigate as dependency to ensure re-run on navigation




  return (
    
     <Routes>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<LoginForm/>}/>

      <Route path='/admin' element={<AdminDashboard/>}/>
      <Route path='/' element={<Home/>}/>

     </Routes>
   
  );
};

export default App;



// {/* <Router>
//       <Routes>
//         {/* Public Routes (Login page) */}
//         <Route path="/login" element={<LoginPage />} />
        
//         {/* Admin Routes */}
//         <Route path="/admin/dashboard" element={<AdminDashboard />} />
//         <Route path="/admin/user-management" element={<UserManagement />} />
//         <Route path="/admin/reports" element={<Reports />} />
//         <Route path="/admin/beneficiary-history/:cnic" element={<BeneficiaryHistory />} />

//         {/* Receptionist Routes */}
//         <Route path="/receptionist/register-beneficiary" element={<RegisterBeneficiary />} />

//         {/* Department Staff Routes */}
//         <Route path="/department/beneficiary/:tokenId" element={<BeneficiaryProfile />} />
//         <Route path="/department/assistance/:tokenId" element={<AssistanceStatus />} />

//         {/* Beneficiary Routes */}
//         <Route path="/beneficiary/dashboard" element={<BeneficiaryDashboard />} />
//       </Routes>
//     </Router> */}