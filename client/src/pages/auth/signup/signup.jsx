import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { server_url } from '../../../constants/config';

function Signup() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userName, setuserName] = useState("")
    const [loading, setLoading] = useState(false)



    const handleSignup = async (e)=>{
        e.preventDefault()
        setLoading(true)
        try {
            const user = await axios.post(`${server_url.server}api/auth/register`,{
                name: userName,
                email: email,
                password: password
            })
          
            console.log("user",user.data);
            if(user.status === 201){
                setLoading(false)
                toast.success(`${user?.data?.message}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });   

                setTimeout(()=>{
                  navigate("/login")
                },2000)
            }
            
        } catch (error) {
            setLoading(false)
            console.log(error.response?.data?.message);
            return toast.error(error?.response?.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            
        }
        
    }
    // setLoading(false)
  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Register</h2>
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label htmlFor="username">
              <i className="fas fa-user"></i> User name
            </label>
            <input
              type="text"
              id="username"
              onChange={(e)=> setuserName(e.target.value)}
              className="form-input"
              placeholder="User name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">
              <i className="fas fa-user"></i> Email
            </label>
            <input
              type="email"
              id="username"
              onChange={(e)=> setEmail(e.target.value)}
              className="form-input"
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              <i className="fas fa-lock"></i> Password
            </label>
            <input
              type="password"
              onChange={(e)=> setPassword(e.target.value)}
              id="password"
              className="form-input"
              placeholder="Password"
            />
          </div>
         
          <button type="submit" className="login-button" >
           {loading ? "loading... " :"signup" }
          </button>
        </form>
        <div className="signup-options">
          <p>Already have an account <Link to="/login">Signin</Link></p>
          <div className="social-buttons">
            <button className="social-button blue"></button>
            <button className="social-button light-blue"></button>
            <button className="social-button red"></button>
            <button className="social-button pink"></button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Signup