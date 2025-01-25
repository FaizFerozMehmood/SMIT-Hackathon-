import React from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie"

function AdminDashboard() {
  const navigate = useNavigate()
  const logoutHandle = ()=>{
     Cookies.remove("role");
     Cookies.remove("token")
     navigate("/login")
     
  }
  return (
    <div>
      <div>
        Dashboard
      </div>
      <button onClick={logoutHandle}>Logout</button>
    </div>
  )
}

export default AdminDashboard