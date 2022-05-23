import React, { useContext, useRef } from 'react'
import "./login.css"
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';

export default function Login() {
    const email = useRef();
    const password = useRef();
    const {user,isFetching,error,dispatch} = useContext(AuthContext)

    const handleClick = (e)=>{
        e.preventDefault();
        loginCall({email: email.current.value,password:password.current.value},dispatch)
        //console.log(email.current.value)
    }
    console.log(user);
  return (
    <div className="login1">
        <div className="loginWrapper1">
            <div className="loginLeft1">
                <img src="/assets/logo/c24.png" alt="" className="loginc24Logo1" />
                <h3 className="loginTitle1">Codename 24</h3>
                <span className="loginDesc1"><q>Keep in touch with your closed ones</q></span>
            </div>
            <div className="loginRight1">
                <form className="loginBox1" onSubmit={handleClick}>
                    <input placeholder='Email' type="email" className='loginInput1' ref={email} required/>
                    <input placeholder='Password' type="password" className='loginInput1' ref={password} required minLength="6"/>
                    <button className="loginButton1" type="submit">{isFetching ? <CircularProgress color='inherit'/>  : "Login"}</button>
                    <span className="loginForgot1">Forgot Password?</span>
                    <button className="loginRegisterButton1">Create a New Account</button>
                </form>   
            </div>
        </div>

    </div>
  )
}
