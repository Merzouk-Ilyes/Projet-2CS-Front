import React, { useState } from 'react'
import '../../styles/login.sass'
import face from '../../assets/q.svg'
import Navbar from '../utilities/Navbar'
import axios from 'axios'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function ResetPwd() {
  const [show, setShow] = React.useState(false)
  const [show2, setShow2] = React.useState(false)
  const handleClick = () => setShow(!show)
  const handleClick2 = () => setShow2(!show2)
  let navigate = useNavigate()

  const [resetData, setResetData] = useState({
    password: '',
    password2: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const queryParams = new URLSearchParams(window.location.search)
    const id = queryParams.get('id')
    const token = queryParams.get('token')

    if (resetData.password !== resetData.password2) {
      toast.error('confirm your password correctly')
      return
    }

    axios
      .post(`http://localhost:8000/resetpass/${id}/${token}`, {
        password: resetData.password,
      })
      .then((response) => {
        if (response.data.message) {
          toast.success(response.data.message)
          setTimeout(() => {
            navigate('/login')
          }, 2500)
        } else {
          toast.error('there was an error')
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
            <p>Password</p>
            <div className='pwd-box'>
              <input
                value={resetData.password}
                onChange={(e) => {
                  const data = {
                    password: e.target.value,
                    password2: resetData.password2,
                  }
                  setResetData(data)
                }}
                type={show ? 'text' : 'password'}
                className='form-control'
                placeholder='Password'
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

            <p>Confirm Password</p>
            <div className='pwd-box'>
              <input
                value={resetData.password2}
                onChange={(e) => {
                  const data = {
                    password2: e.target.value,
                    password: resetData.password,
                  }
                  setResetData(data)
                }}
                type={show2 ? 'text' : 'password'}
                className='form-control'
                placeholder='Confirm Password'
                required
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

            <button className='btn' type='submit'>
              Reset Password
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

export default ResetPwd
