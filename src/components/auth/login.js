import React from "react";
import "../../styles/login.sass";
import axios from "axios";
import face from "../../assets/h3.svg";
import Navbar from "../utilities/Navbar";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import {Link}  from "react-router-dom"
function Login() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);


  const hendelSabmit =(e)=>{ 
    e.preventDefault();
  
    axios.post('http://localhost:8000/login', {
      data : {email:"abir@mail.dz",
      password:"dd"}
    }, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
    })
    .then(response=> { 
      console.log(response)
      
    })
    .catch(error => {
        console.log(error.response.data.err)
    });
  }
  return (

    <>
      <Navbar />
      <div className="login">
        <div className="form-group">
          <div className="logo"> Logo</div>
          <h2 className="title">Welcome back </h2>
          <form className="form">
            <p>Email Address</p>
            <input
              type="email"
              className="form-control"
              placeholder="Email Address"
              required
            />
            <p>Password</p>
            <div className="pwd-box">
              <input
                type={show ? "text" : "password"}
                className="form-control"
                placeholder="Password"
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
            <button className="btn" onClick={hendelSabmit} type="submit">
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
