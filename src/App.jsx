import React, { useEffect } from 'react'
import Home from './pages/Home/Home'
import {Routes, Route, useNavigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in
        const uid = user.uid;
        console.log("user logged in: ", uid);
        navigate("/");
        // ...
      } else {
        // User is signed out
        console.log("user logged out");
        navigate("/login");
        // ...
      }
    });
  }, [])
  return (
    <div>
      <ToastContainer theme='dark' position="top-center" />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/player/:id' element={<Player/>}/>
      </Routes>

    </div>
  )
}

export default App