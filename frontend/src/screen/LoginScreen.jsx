import React, { useEffect, useState } from 'react'
import FormContainer from '../component/FormContainer';
import { useDispatch,useSelector } from 'react-redux';
import { Button, Col, Row,Form } from 'react-bootstrap';
import {Link,useNavigate,useLocation} from 'react-router-dom';
import { Loader } from '../component/Loader';
import { useLoginMutation } from '../slice/userSlice';
import { setCredentials } from '../slice/authSlice';
import {toast} from 'react-toastify'
const LoginScreen = () => {
    const [email,setemail]=useState();
    const [password,setpassword]=useState();

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const [login,{isLoading}]=useLoginMutation();
    const {userinfo}=useSelector((state)=>state.auth);

    const {search}=useLocation();
    const sp=new URLSearchParams(search);
    const redirect=sp.get('redirect') || '/'

    useEffect(()=>{
        if(userinfo){
            navigate(redirect)
        }
    },[userinfo,redirect,navigate])

    const submitHandler=async(e)=>{
        e.preventDefault();
        try{
            const res=await login({email,password}).unwrap();
            dispatch(setCredentials({...res}));
            navigate(redirect);
        }catch(error){
            toast.error(error?.data?.message || error.message)
        }
    }

    
  return (
    <FormContainer>
        <h1>Login</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email' className='my-3'>
                <Form.Label>Email:</Form.Label>
                <Form.Control type='email' placeholder='Enter Email' 
                value={email} onChange={(e)=>setemail(e.target.value)} />
            </Form.Group>
            <Form.Group controlId='password' className='my-3'>
                <Form.Label>Password:</Form.Label>
                <Form.Control type='password' placeholder='Enter Password' 
                value={password} onChange={(e)=>setpassword(e.target.value)} />
            </Form.Group>
            <Button className='my-3' variant='primary' type='submit'>login</Button>
           
        </Form>
        {isLoading && <Loader />}
        <Row className='py-3'>
            <Col>
            New Customer? <Link to={redirect ? `/register/?redirect=${redirect}` : '/register'}>signup</Link></Col>
        </Row>
    </FormContainer>
  
  )
}

export default LoginScreen