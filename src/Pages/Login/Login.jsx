import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../Redux/ApiCall";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LoginSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Please fill all the fields");
    }
    login(dispatch, { username, password });
    toast.success("Login Successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "colored",
    });
    setTimeout(() => navigate("/"), 1500);
  };

  return (
    <>
      <div className="login">
        <span className="LoginTitle">Login</span>
        <form className="loginForm" onSubmit={LoginSubmit}>
          <label>Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className="loginInput"
            placeholder="Enter Username..."
          />
          <label>Passsword</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="loginInput"
            placeholder="Enter Password..."
          />
          <button type="submit" className="loginBtn">
            Login
          </button>
        </form>
        <Link className="link" to={"/register"}>
          <button className="RegisterBtn">Register Account</button>
        </Link>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
