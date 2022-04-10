import React from 'react'
import '../../styles/login.sass'
import face from '../../assets/q.svg'
import Navbar from '../utilities/Navbar'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { Link } from 'react-router-dom'
function ForgetPassword() {
  const [show, setShow] = React.useState(false)
  const [show2, setShow2] = React.useState(false)
  const handleClick = () => setShow(!show)
  const handleClick2 = () => setShow2(!show2)

  return (
    <>
      <Navbar />
      <div className='login forget'>
        <div className='form-group'>
          <div className='logo'> Logo</div>

          <h2 className='title'>Reset Password </h2>
          <form className='form'>
            <p>Your email</p>
            <input
              type='email'
              className='form-control'
              placeholder='Email Address'
              required
            />

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

export default ForgetPassword
