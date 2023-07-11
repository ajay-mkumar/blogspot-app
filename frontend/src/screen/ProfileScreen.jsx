import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setCredentials } from '../slice/authSlice';
import { Loader } from '../component/Loader';
import { useProfileMutation } from '../slice/userSlice';
import { useGetMyOrderQuery } from '../slice/orderSlice';
import { Message } from '../component/Message';
import {FaTimes} from 'react-icons/fa'
import {LinkContainer} from 'react-router-bootstrap'

const ProfileScreen = () => {
    const [name,setName]=useState();
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [cpassword,setCpassword]=useState();

    const dispatch=useDispatch();

    const {userinfo}=useSelector(state=>state.auth);

    const [updateprofile,{isLoading:updateLoading}]=useProfileMutation();

    const {data:orders,isLoading,error}=useGetMyOrderQuery();
  
    useEffect(()=>{
        if(userinfo){
            setName(userinfo.name);
            setEmail(userinfo.email);
        }
    },[userinfo,userinfo.name,userinfo.email])

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(password!==cpassword){
            toast.error("Password doesn't macth")
        }else{
            try{
                const res=await updateprofile({_id:userinfo._id,name,email,password}).unwrap();
                dispatch(setCredentials(res));
                toast.success("User Updated Successfully");
            }catch(err){
                toast.error(err?.data?.message || err.error)
            }
        }

    }
  return (
    <Row>
        <Col md={3}>
           {updateLoading && <Loader />}
            <h2>User Profile</h2>
            <Form onSubmit={handleSubmit} className='my-2'>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' placeholder='Enter Name'
                    value={name} onChange={(e)=>setName(e.target.value)} />
                </Form.Group>
                <Form.Group controlId='email' className='my-2'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' placeholder='Enter Email'
                    value={email} onChange={(e)=>setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group controlId='password' className='my-2'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='text' placeholder='Enter Password'
                    value={password} onChange={(e)=>setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group controlId='cpassword' className='my-2'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='text' placeholder='Enter Confirm Password'
                    value={cpassword} onChange={(e)=>setCpassword(e.target.value)} />
                </Form.Group>
                <Button type='submit' variant='primary' className='my-2'>Update</Button>
            </Form>
        </Col>
        <Col md={9}>
            <h2> My Orders</h2>
            {isLoading ? (<Loader />): error ? (<Message variant={'danger'}>
                {error?.data?.message || error.error}</Message>) : (
                    <Table striped hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order)=>(
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0,10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.isPaid ? (order.PaidAt.substring(0,10)) : (<FaTimes style={{color:'red'}}/>)}</td>
                                    <td>{order.isDelivered ? (order.DeliveredAt.substring(0,10)) : (<FaTimes style={{color:'red'}}/>)}</td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button variant='light' className='btn-sm'>
                                                Details
                                            </Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
        </Col>
    </Row>
  )
}

export default ProfileScreen