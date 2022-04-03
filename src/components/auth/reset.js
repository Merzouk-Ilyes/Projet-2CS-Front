import React from "react";
import "../../styles/login.sass";
import face from "../../assets/q.svg";
import Navbar from "../utilities/Navbar";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
function ResetPwd() {
  const [show, setShow] = React.useState(false);
  const [show2, setShow2] = React.useState(false);
  const handleClick = () => setShow(!show);
  const handleClick2 = () => setShow2(!show2);

  return (
    <>
      <Navbar />
      <div className="login forget">
        <div className="form-group">
          <div className="logo"> Logo</div>

          <h2 className="title">Reset Password </h2>
          <form className="form">
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

            <p>Confirm Password</p>
            <div className="pwd-box">
              <input
                type={show2 ? "text" : "password"}
                className="form-control"
                placeholder="Confirm Password"
                required
              />
              {show2 ? (
                <AiFillEye className="pwd-icon" onClick={handleClick2} />
              ) : (
                <AiFillEyeInvisible
                  className="pwd-icon"
                  onClick={handleClick2}
                />
              )}
            </div>

            <button className="btn" type="submit">
              Reset Password
            </button>
          </form>
          <div className="devider"></div>
          <Link to="/login">
            <p className="dont">
              Want to log in ? <span>Log in</span>
            </p>
          </Link>
        </div>
        <div className="question">
          <img src={face} />
        </div>
      </div>
    </>
  );
}

export default ResetPwd;
