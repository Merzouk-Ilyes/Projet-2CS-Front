import React, { useState } from 'react'
import axios from 'axios'
import '../../styles/signup.sass'
import face from '../../assets/h2.png'
import Navbar from '../utilities/Navbar'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { BsFillCloudUploadFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { storage } from '../../config/fbConfig'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'

function SignupHost() {
  const [show, setShow] = React.useState(false)
  const [show2, setShow2] = React.useState(false)
  const [profilePic, setProfilePic] = React.useState(false)
  const [img, setImg] = React.useState('')

  const handleClick = () => setShow(!show)
  const handleClick2 = () => setShow2(!show2)
  let navigate = useNavigate()
  const [signupData, setSignupData] = useState({
    firstname: '',
    lastname: '',
    phonenumber: '',
    email: '',
    password: '',
    confirmpassword: '',
    image: '',
    ville: '',
    street: '',
  })

  

  const uploadFile = async (e) => {
    const storageRef = ref(storage, `/files/pic1s/${profilePic.name}`)
    const uploadTask = uploadBytesResumable(storageRef, profilePic)

    uploadTask.on(
      'state changed',
      (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log(progress)
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImg(url)
        })
      }
    )
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    uploadFile()
      .then((result) => {
        e.preventDefault()
        var pattern = new RegExp('[0][5-7][0-9]*')
        if (!pattern.test(signupData.phonenumber)) {
          toast.error('Your phone number is not valid')
          return
        }
        if (!img) {
          toast.error('Please upload an ID image')
          return
        }
        if (signupData.password === signupData.confirmpassword) {
          axios
            .post('http://localhost:8000/signup', {
              firstname: signupData.firstname,
              lastname: signupData.lastname,
              phonenumber: signupData.phonenumber,
              email: signupData.email,
              password: signupData.password,
              role: 3,
              image: img,
              city: signupData.ville,
              street: e.target.street,
            })
            .then((response) => {
              if (response.data.user) {
                toast.success('Account successfully created')
                setTimeout(() => {
                  navigate('/login')
                }, 2500)
                setTimeout(() => {
                  toast.warning('An email has been sent to verify your account')
                }, 4000)
              } else {
                if (response.data.keyPattern.email === 1) {
                  toast.error('the email is already used')
                }
              }
            })
            .catch((error) => console.log(error))
        } else {
          toast.error('Password and confirmation do not match')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <>
      <Navbar />
      <div className='signup'>
        <div className='illustrations'>
          <img src={face} />
        </div>
        <div className='form-group'>
          <h3 className='title'>Register as Host </h3>
          <form className='form' onSubmit={handleSubmit}>
            <div className='input-grp'>
              <div>
                <p>First name</p>
                <input
                  type='text'
                  className='form-control'
                  placeholder='First name'
                  required
                  value={signupData.firstname}
                  onChange={(e) => {
                    const data = {
                      firstname: e.target.value,
                      lastname: signupData.lastname,
                      phonenumber: signupData.phonenumber,
                      email: signupData.email,
                      password: signupData.password,
                      confirmpassword: signupData.confirmpassword,
                      image: signupData.image,
                    }
                    setSignupData(data)
                  }}
                />
              </div>
              <div>
                <p>Last name</p>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Last name'
                  value={signupData.lastname}
                  onChange={(e) => {
                    const data = {
                      firstname: signupData.firstname,
                      lastname: e.target.value,
                      phonenumber: signupData.phonenumber,
                      email: signupData.email,
                      password: signupData.password,
                      confirmpassword: signupData.confirmpassword,
                      image: signupData.image,
                    }
                    setSignupData(data)
                  }}
                  required
                />
              </div>
            </div>

            <div className='input-grp'>
              <div>
                <p>Phone number</p>
                <input
                  type='number'
                  className='form-control'
                  placeholder='+213'
                  value={signupData.phonenumber}
                  required
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
                    }
                    setSignupData(data)
                  }}
                />
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <div>
                <p>Email Address</p>
                <input
                  type='email'
                  value={signupData.email}
                  className='form-control'
                  placeholder='Email Address'
                  required
                  onChange={(e) => {
                    const data = {
                      firstname: signupData.firstname,
                      lastname: signupData.lastname,
                      phonenumber: signupData.phonenumber,
                      email: e.target.value,
                      password: signupData.password,
                      confirmpassword: signupData.confirmpassword,
                      image: signupData.image,
                    }
                    setSignupData(data)
                  }}
                />
              </div>
            </div>

            <div className='input-grp'>
              <div>
                <p>City</p>
                <input
                  type='text'
                  placeholder='City'
                  className='form-control'
                  value={signupData.ville}
                  required
                  onChange={(e) => {
                    const data = {
                      firstname: signupData.firstname,
                      lastname: signupData.lastname,
                      phonenumber: signupData.phonenumber,
                      email: signupData.email,
                      password: signupData.password,
                      confirmpassword: signupData.confirmpassword,
                      image: signupData.image,
                      ville: e.target.value,
                      street: signupData.street,
                    }
                    setSignupData(data)
                  }}
                />
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <div>
                <p>Street</p>
                <input
                  type='text'
                  value={signupData.street}
                  className='form-control'
                  placeholder='Street'
                  required
                  onChange={(e) => {
                    const data = {
                      firstname: signupData.firstname,
                      lastname: signupData.lastname,
                      phonenumber: signupData.phonenumber,
                      email: signupData.email,
                      password: signupData.password,
                      confirmpassword: signupData.confirmpassword,
                      image: signupData.image,
                      ville: signupData.ville,
                      street: e.target.value,
                    }
                    setSignupData(data)
                  }}
                />
              </div>
            </div>

            <div className='input-grp'>
              <div>
                <p>Password</p>
                <div className='pwd-box'>
                  <input
                    value={signupData.password}
                    type={show ? 'text' : 'password'}
                    className='form-control'
                    placeholder='Password'
                    onChange={(e) => {
                      const data = {
                        firstname: signupData.firstname,
                        lastname: signupData.lastname,
                        phonenumber: signupData.phonenumber,
                        email: signupData.email,
                        password: e.target.value,
                        confirmpassword: signupData.confirmpassword,
                        image: signupData.image,
                      }
                      setSignupData(data)
                    }}
                    required
                  />
                  {show ? (
                    <AiFillEye className='pwd-icon' onClick={handleClick} />
                  ) : (
                    <AiFillEyeInvisible
                      className='pwd-icon'
                      onClick={handleClick}
                    />
                  )}
                </div>
              </div>
              <div>
                <p>Confirm Password</p>
                <div className='pwd-box'>
                  <input
                    type={show2 ? 'text' : 'password'}
                    className='form-control'
                    placeholder='Confirm Password'
                    required
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
                      }
                      setSignupData(data)
                    }}
                  />
                  {show2 ? (
                    <AiFillEye className='pwd-icon' onClick={handleClick2} />
                  ) : (
                    <AiFillEyeInvisible
                      className='pwd-icon'
                      onClick={handleClick2}
                    />
                  )}
                </div>
              </div>
            </div>

            <button
              type='button'
              className='upload-file101'
              onClick={() => {
                document.getElementById('file').click()
              }}
            >
              {' '}
              Upload ID &nbsp;&nbsp;&nbsp; <BsFillCloudUploadFill />{' '}
            </button>
            <input
              type='file'
              id='file'
              name='file'
              value={signupData.image}
              onChange={(e) => {
                setProfilePic(e.target.files[0])
              }}
            />
            <a className='imagename'>{signupData.image}</a>

            <button className='btn' type='submit'>
              Sign up as host
            </button>
          </form>
          <div className='devider'></div>
          <Link to='/login'>
            <p className='dont'>
              Already have an account? <span>Log in </span>
            </p>
          </Link>
        </div>
      </div>
    </>
  )
}
export default SignupHost
