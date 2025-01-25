import React, { useEffect, useState } from "react";
// import "./LoginForm.css"; // Import the CSS file
import "./Login.css"
import axios from "axios"
import Cookies from "js-cookie"
import { Link, useNavigate } from "react-router-dom";
import { server_url } from "../../../constants/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async(e) =>{
    e.preventDefault()
    console.log("helll");
    console.log(email, password);
    if(!email || !password){
       return toast.error('All fields are required', {
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
    try {
      const response = await axios.post(`${server_url.server}api/auth/login`, {
        email: email,
        password: password
      });

      console.log(response);
      console.log(response.data?.data?.token);
      Cookies.set("token",response.data?.data?.token);
      Cookies.set("role", response.data.data._doc.role)
      //console.log(token);
      let role = response.data.data._doc.role
      console.log(role);
      if(response.status === 200 && role === "admin"){
        navigate("/admin");

        return
      }

      if(response.status === 200 && role === "user"){
        navigate("/")
      }
      
      // if(response.status === 200){
      //    if(role === "admin"){
      //     navigate("/admin")
      //    }
      //     navigate("/")
      // }
       
      
    } catch (error) {
      console.log(error);
      
    }
    
  }



  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleLogin} className="form-container">
          <div className="form-group">
            <label htmlFor="username">
              <i className="fas fa-user"></i> Type your username
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
              <i className="fas fa-lock"></i> Type your password
            </label>
            <input
              type="password"
              onChange={(e)=> setPassword(e.target.value)}
              id="password"
              className="form-input"
              placeholder="Password"
            />
          </div>
          <div className="form-footer">
            <a href="#" className="forgot-password">
              Forgot password?
            </a>
          </div>
          <button type="submit" className="login-button" >
            LOGIN
          </button>
        </form>
        <div className="signup-options">
          <p>Don't have an account <Link to="/signup">Register</Link></p>
          <div className="social-buttons">
            <button className="social-button blue"></button>
            <button className="social-button light-blue"></button>
            <button className="social-button red"></button>
            <button className="social-button pink"></button>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default LoginForm;
