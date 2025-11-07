import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";
import background from "./assets/login.jpg";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const notifysuccess = () => {
    toast.success('Login Successfull!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Zoom,
    });
  };

  const notifyfailure = () => {
    toast.error('Incorrect Credentials', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Zoom,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if ((username === "center@1" && password === "pass1") || (username === "center@2" && password === "pass2")|| (username === "center@3" && password === "pass3")) {
      console.log("bhai");
      notifysuccess()
      navigate("dashboard");
    } else {
        notifyfailure()
        console.log("helllo");
      setError("Invalid username or passworddd");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "10px",
          padding: "30px",
          width: "80%",
          maxWidth: "350px",
          height:"auto",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{
            width: "150px",
            height: "auto",
            marginBottom: "20px",
          }}
        />
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "15px" }}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                fontSize: "16px",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                fontSize: "16px",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#1e620a",
              color: "white",
              fontSize: "16px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Sign In
          </button>
          {error && (
            <p
              style={{
                color: "red",
                fontSize: "14px",
                marginTop: "10px",
              }}
            >
              {error}
            </p>
          )}
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default LoginPage;
