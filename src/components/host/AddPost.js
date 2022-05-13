import React from 'react'


function AddPost() {
  return (
    <>
   
    <div className="signup">
      <div className="form-group">
        <h3 className="title">Register as Client </h3>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-grp">
            <div>
              <p>First name</p>
              <input
                type="text"
                value={signupData.firstname}
                className="form-control"
                placeholder="First name"
                onChange={(e) => {
                  const data =  {
                    firstname: e.target.value,
                    lastname: signupData.lastname,
                    phonenumber: signupData.phonenumber,
                    email: signupData.email,
                    password: signupData.password,
                    confirmpassword: signupData.confirmpassword,
                    image: signupData.image,
                  };
                  setSignupData(data);
                }}
                required
              />
            </div>
            <div>
              <p>Last name</p>
              <input
                type="text"
                value={signupData.lastname}
                className="form-control"
                placeholder="Last name"
                onChange={(e) => {
                  const data = {
                    firstname: signupData.firstname,
                    lastname: e.target.value,
                    phonenumber: signupData.phonenumber,
                    email: signupData.email,
                    password: signupData.password,
                    confirmpassword: signupData.confirmpassword,
                    image: signupData.image,
                  };
                  setSignupData(data);
                }}
                required
              />
            </div>
          </div>

          <div className="input-grp">
            <div>
              <p>Phone number</p>
              <input
                type="tel"
                value={signupData.phonenumber}
                className="form-control"
                placeholder="+213"
                maxLength={10}
                minLength={10}
                onChange={(e) => {
                  const data = {
                    firstname: signupData.firstname,
                    lastname: signupData.lastname,
                    phonenumber: e.target.value,
                    email: signupData.email,
                    password: signupData.password,
                    confirmpassword: signupData.confirmpassword,
                    image: signupData.image,
                  };
                  setSignupData(data);
                }}
                required
              />
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div>
              <p>Email Address</p>
              <input
                type="email"
                value={signupData.email}
                className="form-control"
                placeholder="Email Address"
                onChange={(e) => {
                  const data = {
                    firstname: signupData.firstname,
                    lastname: signupData.lastname,
                    phonenumber: signupData.phonenumber,
                    email: e.target.value,
                    password: signupData.password,
                    confirmpassword: signupData.confirmpassword,
                    image: signupData.image,
                  };
                  setSignupData(data);
                }}
                required
              />
            </div>
          </div>
          <div className="input-grp">
            <div>
              <p>Password</p>
              <div className="pwd-box">
                <input
                  type={show ? "text" : "password"}
                  value={signupData.password}
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) => {
                    const data = {
                      firstname: signupData.firstname,
                      lastname: signupData.lastname,
                      phonenumber: signupData.phonenumber,
                      email: signupData.email,
                      password: e.target.value,
                      confirmpassword: signupData.confirmpassword,
                      image: signupData.image,
                    };
                    setSignupData(data);
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
            </div>
            <div>
              <p>Confirm Password</p>
              <div className="pwd-box">
                <input
                  type={show2 ? "text" : "password"}
                  className="form-control"
                  placeholder="Confirm Password"
                  value={signupData.confirmpassword}
                  onChange={(e) => {
                    const data = {
                      firstname: signupData.firstname,
                      lastname: signupData.lastname,
                      phonenumber: signupData.phonenumber,
                      email: signupData.email,
                      password: signupData.password,
                      confirmpassword: e.target.value,
                      image: signupData.image,
                    };
                    setSignupData(data);
                  }}
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
          <input
            type="file"
            id="file"
            name="file"
            value={signupData.image}
            onChange={(e) => {
              const data = {
                firstname: signupData.firstname,
                lastname: signupData.lastname,
                phonenumber: signupData.phonenumber,
                email: signupData.email,
                password: signupData.password,
                confirmpassword: signupData.confirmpassword,
                image: e.target.value,
              };
              setSignupData(data);
            }}
          />

          <a className="imagename">{signupData.image}</a>

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
  )
}

export default AddPost