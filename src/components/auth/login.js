import React, { useState } from "react";
import "../../styles/login.sass";
import axios from "axios";
import face from "../../assets/h3.svg";
import Navbar from "../utilities/Navbar";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { actions } from "../../state/auth_slice";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.isLogged);
  console.log(isLogged);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(loginData);
    axios
      .post("http://localhost:8000/login", {
        email: loginData.email,
        password: loginData.password,
      })
      .then((response) => {
        if (response.data.token) {
          toast.success("Login successful !");
          //Changing the isLogged state in the redux store
          dispatch(actions.setLogin(true));
          //Redirection arroding to user role
          if (response.data.user.role === "admin") {
            setTimeout(() => {
              navigate("/admin");
            }, 2500);
          } else if (response.data.user.role === "agent") {
            setTimeout(() => {
              navigate("/agent");
            }, 2500);
          } else if (response.data.user.role === "host") {
            setTimeout(() => {
              navigate("/host");
            }, 2500);
          } else {
            setTimeout(() => {
              navigate("/");
            }, 3000);
          }
        } else {
          toast.error(response.data.err);
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <Navbar />
      <div className="login">
        <div className="form-group">
          <div className="logo"> Logo</div>
          <h2 className="title">Welcome back </h2>
          <form className="form" onSubmit={handleSubmit}>
            <p>Email Address</p>
            <input
              type="email"
              value={loginData.email}
              className="form-control"
              placeholder="Email Address"
              onChange={(e) => {
                const data = {
                  email: e.target.value,
                  password: loginData.password,
                };
                setLoginData(data);
              }}
              required
            />
            <p>Password</p>
            <div className="pwd-box">
              <input
                type={show ? "text" : "password"}
                value={loginData.password}
                className="form-control"
                placeholder="Password"
                onChange={(e) => {
                  const data = {
                    password: e.target.value,
                    email: loginData.email,
                  };
                  setLoginData(data);
                }}
                required
              />
              {show ? (
                <AiFillEye className="pwd-icon" onClick={handleClick} />
              ) : (
                <AiFillEyeInvisible
                  className="pwd-icon"
                  onClick={handleClick}
                />
              )}
            </div>

            <div className="forget"> Forget Password?</div>
            <button className="btn" type="submit">
              Log in{" "}
            </button>
          </form>
          <div className="devider"></div>
          <Link to="/signupclient">
            <p className="dont">
              Don't have an account? <span>Sign up</span>
            </p>
          </Link>
        </div>
        <div className="illustrations">
          <img src={face} />
        </div>
      </div>
    </>
  );
}

export default Login;
