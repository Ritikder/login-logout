import React, { useState } from 'react'
import './login.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function Login({setLoginUser}) {

    const [user,setUser]=useState({
        
        email:"",
        password:"",
        
    })
    const navigate=useNavigate();
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setUser({
            ...user,
            [name]:value
        })
        
    }  
const login=()=>{
  axios.post('http://localhost:3000/login',user)
  .then(res=>{
    console.log(res);
  if(res.data.message=='Login Successfull')
  {
    alert("welcome")
    setLoginUser(res.data.user)
    navigate('/')
  }else{
    alert("Not Registered")
  }
})
  
}

  return (
    <div className='login'>
        {console.log(user)}
        <h1>Login</h1>
        <input type="text" name='email' value={user.email} onChange={handleChange} placeholder="Ente Your Email"></input>
     <input type="text" name='password' value={user.password} onChange={handleChange}  placeholder='Enter Your Password'></input>
     <div className='button' onClick={login}>Login</div>
     <div>or</div>
     
     <div className='button'><Link to="/register" style={{textDecoration:"none",color:"white"}}>Register</Link></div>
    </div>
  )
}

export default Login
