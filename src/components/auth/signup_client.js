import React from "react";
import "../../styles/signup.sass";
import face from "../../assets/client.png";
import Navbar from "../utilities/Navbar";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { Link } from "react-router-dom";

function SignupClient() {
  const [show, setShow] = React.useState(false);
  const [show2, setShow2] = React.useState(false);
  const handleClick = () => setShow(!show);
  const handleClick2 = () => setShow2(!show2);
  return (
    <>
      <Navbar />
      <div className="signup">
        <div className="form-group">
          <h3 className="title">Register as  Client </h3>
          <form className="form">
            <div className="input-grp">
              <div>
                <p>First name</p>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First name"
                  required
                />
              </div>
              <div>
                <p>Last name</p>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                  required
                />
              </div>
            </div>

            <div className="input-grp">
              <div>
                <p>Phone number</p>
                <input
                  type="number"
                  className="form-control"
                  placeholder="+213"
                  required
                />
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <div>
                <p>Email Address</p>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email Address"
                  required
                />
              </div>
            </div>
            <div className="input-grp" >
              <div>
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
              </div>
              <div>
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
              </div>
            </div>

            <button
              type="button"
              className="upload-file"
              onClick={() => {
                document.getElementById("file").click();
              }}
            >
              {" "}
              Upload ID &nbsp;&nbsp;&nbsp; <BsFillCloudUploadFill />{" "}
            </button>
            <input type="file" id="file" name="file" />

            <button className="btn" type="submit">
              Sign up as client
            </button>
          </form>
          <div className="devider"></div>
          <Link to="/login">
            <p className="dont">
              Already have an account? <span>Log in </span>
            </p>
          </Link>
          <Link to="/signuphost">
            <p className="dont">
              Want to be a host? <span>Sign up as host</span>
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

export default SignupClient;
