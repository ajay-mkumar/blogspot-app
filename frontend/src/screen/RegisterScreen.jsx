import React, { useEffect, useState } from 'react'
import FormContainer from '../component/FormContainer';
import { useDispatch,useSelector } from 'react-redux';
import { Button, Col, Row,Form } from 'react-bootstrap';
import {Link,useNavigate,useLocation} from 'react-router-dom';
import { Loader } from '../component/Loader';
import { useRegisterMutation } from '../slice/userSlice';
import { setCredentials } from '../slice/authSlice';
import {toast} from 'react-toastify'
const RegisterScreen = () => {
    const [name,setname]=useState('');
    const [email,setemail]=useState('');
    const [password,setpassword]=useState('');
    const [cpassword,setcpassword]=useState('');

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const [register,{isLoading}]=useRegisterMutation();
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
        if(password!==cpassword){
            toast.error("possword must match");
        }else{
        try{
            const res=await register({name,email,password}).unwrap();
            dispatch(setCredentials({...res}));
            navigate(redirect);
        }catch(error){
            toast.error(error?.data?.message || error.error)
        }
    }
    }

    
  return (
    <FormContainer>
        <h1>Register</h1>
        <Form onSubmit={submitHandler}>
        <Form.Group controlId='name' className='my-3'>
                <Form.Label>Name:</Form.Label>
                <Form.Control type='text' placeholder='Enter Name' value={name} onChange={(e)=>setname(e.target.value)} />
            </Form.Group>
            <Form.Group controlId='email' className='my-3'>
                <Form.Label>Email:</Form.Label>
                <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e)=>setemail(e.target.value)} />
            </Form.Group>
            <Form.Group controlId='password' className='my-3'>
                <Form.Label>Password:</Form.Label>
                <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e)=>setpassword(e.target.value)} />
            </Form.Group>
            <Form.Group controlId='confirmpassword' className='my-3'>
                <Form.Label>Confirm Password:</Form.Label>
                <Form.Control type='password' placeholder='confirm password' value={cpassword} onChange={(e)=>setcpassword(e.target.value)} />
            </Form.Group>
            <Button className='my-3' variant='primary' type='submit'>Register</Button>
            {isLoading && <Loader />}
        </Form>
        <Row className='py-3'>
            <Col>
            Already have an account? <Link to={redirect ? `/signin/?redirect=${redirect}` : '/signin'}>login</Link></Col>
        </Row>
    </FormContainer>
  
  )
}

export default RegisterScreen