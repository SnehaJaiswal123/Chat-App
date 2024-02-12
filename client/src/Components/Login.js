import { Backdrop, Button, CircularProgress } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Navigate, json, useNavigate } from "react-router-dom";
import React from "react";

import axios from "axios";

function Login() {
  const [signup, setSignup] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);

  const [loginStatus, setLoginStatus] = useState({ msg: " ", key: " " });
  const [signupStatus, setSignupStatus] = useState({ msg: " ", key: " " });

  const navigate = useNavigate();

  function login() {
    setSignup((prev) => !prev);
  }

  async function loginhandler(e) {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        {
          password,
          email,
        },
        {
          withCredentials: true,
        }
      );

      setLoginStatus({ msg: "Success", key: Math.random() });
      if (response.data.Success) navigate("/app");
      setLoading(false);
      localStorage.setItem("token", JSON.stringify(response.data.token));
    } catch (err) {
      setLoginStatus({
        msg: "Invalid Username or Password",
        key: Math.random(),
      });
      console.log(err);
      if (err.response.status >= 400) {
        alert(err.response.data.message);
      } else {
        alert("Internal server error");
      }
      setLoading(false);
    }
  }

  async function signuphandler(e) {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await axios.post(
        "http://localhost:5000/signup",
        {
          email,
          password,
          userName,
        },
        config,
        {
          withCredentials: true,
        }
      );
      if (response.data.Success){
      setSignupStatus({ msg: "Success", key: Math.random() })
      localStorage.setItem("token", JSON.stringify(response.data.token));
      navigate("/app");
      setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setSignupStatus({ msg: "Invalid Data", key: Math.random() });
      if (err.response.status >= 400) {
        alert(err.response.data.message);
      } else {
        alert("Internal server error");
      }
      setLoading(false);
    }
  }

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className="login">
        <div className="login-logo">
          <img
            src="https://mailmeteor.com/logos/assets/PNG/Google_Chat_Logo_512px.png"
            alt="logo"
          />
        </div>
        <div style={{ display: signup ? "none" : "" }} className="login-page">
          <p className="login-text">Login to your account</p>
          <TextField
            id="standard-basic"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            variant="standard"
          />
          <TextField
            id="standard-basic"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            variant="standard"
          />
          <Button onClick={loginhandler} variant="contained">
            Login
          </Button>
          <span>Don't have an account?</span>
          <a onClick={login}>Signup</a>
        </div>

        <div style={{ display: signup ? "" : "none" }} className="login-page">
          <p className="login-text">Signup to your account</p>
          <TextField
            id="standard-basic"
            label="Username"
            onChange={(e) => setUserName(e.target.value)}
            variant="standard"
          />
          <TextField
            id="standard-basic"
            label="email"
            onChange={(e) => setEmail(e.target.value)}
            variant="standard"
          />
          <TextField
            id="standard-basic"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            variant="standard"
          />
          <Button onClick={signuphandler} variant="contained">
            Signup
          </Button>
          <span>Already a user?</span>
          <a onClick={login}>Login</a>
        </div>
      </div>
    </>
  );
}
export default Login;
