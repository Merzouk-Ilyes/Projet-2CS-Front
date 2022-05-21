import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Admin from './components/admin/adminHome'

import Login from './components/auth/login'
import SignupHost from './components/auth/signup_host'
import SignupClient from './components/auth/signup_client'
import { ChakraProvider } from '@chakra-ui/react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ResetPwd from './components/auth/reset'
import { store } from './state/store'
import { Provider } from 'react-redux'
import Search from './components/products/search'
import Details from './components/products/details'
import About from './components/about'
import ForgetPassword from './components/auth/forget'
import AgentHome from './components/agent/agentHome'
import 'react-toastify/dist/ReactToastify.css'

import Home from './components/host/hostHome'
import Reservations from './components/host/reservations'

import Posts from './components/host/dashboardCopoments/Posts'
import SeePosts from './components/host/dashboardCopoments/Dashboard'
import './App.sass'
import AdminPosts from './components/admin/adminPosts'

ReactDOM.render(
  <Provider store={store}>
    <ChakraProvider>
      <ToastContainer
        position='top-center'
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <BrowserRouter>
        <Routes>
          {/* <Route path='/' element={<App />} /> */}
          <Route path='/' element={<Search />} />
          <Route path='about' element={<About />} />
          <Route path='/details' element={<Details />} />

          <Route path='login' element={<Login />} />
          <Route path='signuphost' element={<SignupHost />} />
          <Route path='signupclient' element={<SignupClient />} />
          <Route path='reset' element={<ResetPwd />} />
          <Route path='forget' element={<ForgetPassword />} />
          <Route path='admin'>
            <Route path='' element={<Admin />} />
            <Route path='posts' element={<AdminPosts />} />
          </Route>

          <Route path='host'>
            <Route path='' element={<Home />} />
            <Route path='reservations' element={<Reservations />} />
            <Route path='addpost' element={<Posts />} />
            <Route path='posts' element={<SeePosts />} />
          </Route>

          <Route path='agent'>
            <Route path='' element={<AgentHome />} />
          </Route>

          <Route
            path='*'
            element={
              <div style={{ margin: '45vh 45vw' }}>
                <h2>404 | NOT FOUND</h2>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </Provider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
