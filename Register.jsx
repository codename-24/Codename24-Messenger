import axios from 'axios';
import React, { useRef, useState } from 'react'
import "./register.css"
export default function Register() {
  
  const [success,setSuccess] = useState(false);
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const handleClick = async (e)=>{
    e.preventDefault();
    if(confirmPassword.current.value !== password.current.value){
      confirmPassword.current.setCustomValidity("Passwords don't match");
    }
    else{
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      }
      try {
         const res = await axios.post("http://localhost:5000/api/auth/register",user);
         if(res){
           setSuccess(true);
         }
         
 
      } catch (error) {
        console.log(error);
        
      }
      
    }
  }

  return (
    <div className="login">
        <div className="loginWrapper">
        <div className="loginLeft">
                <img src="/assets/logo/c24.png" alt="" className="loginc24Logo1" />
                <h3 className="loginTitle1">Codename 24</h3>
                <span className="loginDesc1"><q>Keep in touch with your closed ones</q></span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                <input placeholder='Username' ref={username} className='loginInput' required/>
                    <input placeholder='Email' type="email" ref={email} className='loginInput' required/>
                    <input placeholder='Password' type="password" ref={password} className='loginInput' required minLength="6"/>
                    <input placeholder='Confirm Password' type="password" ref={confirmPassword} className='loginInput'/>
                    <button className="loginButton" type="submit"> Sign Up</button>
                    <span className='successmessage'>{success &&<p>Success, click <a href="/login" className='successlink'>here</a> to login </p> } </span>
                    <button className="loginRegisterButton">Already have an account?</button>
                </form>   
            </div>
        </div>

    </div>
  )
}
