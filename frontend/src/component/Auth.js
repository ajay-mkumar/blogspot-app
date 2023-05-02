import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { authActions } from '../store'
import { useNavigate } from 'react-router-dom'
import app from './firebaseconfig'

import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export const Auth = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [isSignup,setSignup]=useState(false);
  const [forgetpword,setfpword]=useState(false);
  const [inputs,setInputs]=useState({
    name:"",
    phone:"",
    password:"",
    confirm_password:"",
    verifybutton:false,
    verifyotp:false,
    opt:'',
    verified:false,
  })

  const auth = getAuth(app);

  const onCaptchaverify=()=>  {
 
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        onSignupSubmit();
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // ...
      },
  
    }, auth);
  }

  const onSignupSubmit=()=>{
    onCaptchaverify();
    const phoneNumber = "+91" + inputs.phone;
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        window.alert("otp sent");
        setInputs((prevstate)=>({
            ...prevstate,
            verifyotp:true
          }))
       
        // ...
      }).catch((error) => {
        // Error; SMS not sent
        // ...
      });
  }
  const verifyCode=()=>{
    window.confirmationResult.confirm(inputs.otp).then((result) => {
      // User signed in successfully.
      const user = result.user;
      window.alert("verified successfully");
      setInputs((prevstate)=>({
        ...prevstate,
        verified:true,
        verifyotp:false,
        verifybutton:false
      }))
      // ...
    }).catch((error) => {
      window.alert("invalid otp");
      // User couldn't sign in (bad verification code?)
      // ...
    });
  }
 
       
 
  

  
  const handlechange=(e)=>{
    setInputs((prevstate)=>({
      ...prevstate,
      
       [ e.target.name] : e.target.value
      
    }))
  }
  useEffect(()=>{
    if(inputs.phone.length===10){
      setInputs((prevstate)=>({
        ...prevstate,
        verifybutton:true}))
    }else{
      setInputs((prevstate)=>({
        ...prevstate,
        verifybutton:false}))
    }
  },[inputs.phone])

  const sendRequest=async(type="login")=>{
    const res=await axios.post(`http://localhost:5000/user/${type}`,{
      name:inputs.name,
      phone:inputs.phone,
      password:inputs.password
    }).catch(err=>console.log(err))

    const data=await res.data;
    if(data.status==="error"){
      alert(data.message);
    }
  return data;
  }

  const handlesubmit=(e)=>{
    e.preventDefault();
    console.log(inputs);
    if(inputs.email===""){
      alert("email is required")
    }else{
    if(isSignup){
      if(inputs.password===inputs.confirm_password){
          if(inputs.verified)  {
          sendRequest('signup').then((data)=>localStorage.setItem("userId",data.user._id))
          .then(()=>dispatch(authActions.login())).then(()=>navigate('/blogs'))
          .then(data=>console.log(data));
        }else{
          alert(" otp's not verified")
        }
      }else{
        alert("password doesn't match");
      }
    }else if(forgetpword){
      if(inputs.password===inputs.confirm_password){
        if(inputs.verified)  {
        sendRequest('forgetpassword').then((data)=>localStorage.setItem("userId",data.user._id))
        .then(()=>dispatch(authActions.login())).then(()=>navigate('/blogs'))
        .then(data=>console.log(data));
        }else{
          alert(" otp's not verified")
        }
      }else{
        alert("password doesn't match");
      }
    }
    
    
    else{
      sendRequest().then((data)=>localStorage.setItem("userId",data.user._id))
      .then(()=>dispatch(authActions.login())).then(()=>navigate('/blogs'))
      .then(data=>console.log(data));
    }
    }
  }
  return (
    <div>
      <form onSubmit={handlesubmit}>
      <div id='recaptcha-container'></div>
        <Box maxWidth={400} display="flex" flexDirection={"column"}
          alignItems="center" justifyContent={"center"}
          boxShadow={"10px 10px 20px #ccc"} padding={3}
          margin={"auto"} marginTop={5} borderRadius={5}>
          <Typography padding={3} variant='h4' textAlign={'center'}>
            {isSignup ? "Signup" : "Login"}
            </Typography>
         {isSignup && 
        
         <TextField  name='name' value={inputs.name} onChange={handlechange} 
         placeholder='Name' margin='normal' />
         }{" "}
    {inputs.verified ? <p>verfied</p> :
        <TextField type='number' name='phone' value={inputs.phone} onChange={handlechange} 
           placeholder='Phone' margin='normal' />}
          {isSignup || forgetpword && inputs.verifybutton && 
           <Button  variant='contained' sx={{borderRadius:'5', marginTop:'3'}} 
            onClick={onSignupSubmit} color='primary'>send otp</Button>}
          {isSignup || forgetpword && inputs.verifyotp &&
          <> <TextField type='number' name='otp' value={inputs.otp} onChange={handlechange} 
           placeholder='otp' margin='normal' />
           <Button  variant='contained' sx={{borderRadius:'5', marginTop:'3'}}
            onClick={verifyCode} color='primary'>verify</Button></>} 
           

          
          <TextField type='password' name='password' value={inputs.password} onChange={handlechange} 
           placeholder='Password' margin='normal' />

        {isSignup || forgetpword && <TextField type='password'  name='confirm_password' value={inputs.confirm_password} onChange={handlechange} 
         placeholder='Confirm Password' margin='normal' />
         }{" "}

          <Button type='submit' variant='contained' sx={{borderRadius:'5', marginTop:'3'}} color='primary'>
            {isSignup ? "signup" : forgetpword ? "reset password": "login" }</Button>
          <Button onClick={()=>{setSignup(!isSignup)}}>
            {isSignup ?"Already have an account,login" :"create an account?signup" }
            </Button>
            <Button onClick={()=>{setfpword(!forgetpword)}}>forget password</Button>
        </Box>
      </form>
      </div>
  )
}
