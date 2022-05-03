import React, { useState } from 'react'
import '../../styles/login.sass'
import axios from 'axios'
import face from '../../assets/q.svg'
import { Link } from 'react-router-dom'
import Navbar from '../utilities/Navbar'
import { toast } from 'react-toastify'

function ForgetPassword() {
  const [loginData, setLoginData] = useState({
    email: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post('http://localhost:8000/forgetpass', {
        email: loginData.email,
      })
      .then((response) => {
        if (response.data.message) {
          toast.success(response.data.message)
        } else {
          toast.error(response.data.err)
        }
      })
      .catch((error) => console.log(error))
  }
  return (
    <>
      <Navbar />
      <div className='login forget'>
        <div className='form-group'>
          <div className='logo'> Logo</div>

          <h2 className='title'>Reset Password </h2>
          <form className='form' onSubmit={handleSubmit}>
            <p>Your email</p>
            <input
              type='email'
              className='form-control'
              placeholder='Email Address'
              onChange={(e) => {
                const data = {
                  email: e.target.value,
                }
                setLoginData(data)
              }}
              required
            />

            <button className='btn' type='submit'>
              Get the reset link
            </button>
          </form>
          <div className='devider'></div>
          <Link to='/login'>
            <p className='dont'>
              Want to log in ? <span>Log in</span>
            </p>
          </Link>
        </div>
        <div className='question'>
          <img src={face} />
        </div>
      </div>
    </>
  )
}

export default ForgetPassword
