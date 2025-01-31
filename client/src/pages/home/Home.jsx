import React, { useEffect } from 'react'
import Cookies from "js-cookie"
import { useNavigate } from 'react-router-dom';
function Home() {
  const navigate = useNavigate()
  const logoutHandle = ()=>{
     Cookies.remove("role");
     Cookies.remove("token")
     navigate("/login")
     
  }

  useEffect(()=>{
    const role = Cookies.get("role");

    if(role !== "user"){
      navigate("/login")
    }
  },[])
  return (
    <div>
      <div>
        Home
      </div>
      <button onClick={logoutHandle}>Logout</button>
    </div>
  )
}

export default Home