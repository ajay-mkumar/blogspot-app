import React, { useEffect, useState } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom';
import FormContainer from '../../component/FormContainer';
import { Loader } from '../../component/Loader';
import { Message } from '../../component/Message';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useGetuserdetailsQuery, useUpdateuserMutation } from '../../slice/userSlice';

const UserEditScreen = () => {
    const {id:userId}=useParams();

    const [name,setName]=useState();
    const [email,setEmail]=useState();
    const [isAdmin,setIsAdmin]=useState(false);
    
    const {data:user,isLoading,error}=useGetuserdetailsQuery(userId)

    const [updateuser,{isLoading:updateLoading}]=useUpdateuserMutation();


    const navigate=useNavigate();

    useEffect(()=>{
        if(user){
          setName(user.name);
          setEmail(user.email);
          setIsAdmin(user.isAdmin);
        }
    },[user])


    const submitHandler=async(e)=>{
        e.preventDefault();

        const  updateddetails={
            userId,
            name,
            email,
            isAdmin,
        }

        const res=await updateuser(updateddetails);
        if(res.error){
            toast.error(res.error);
        }else{
            toast.success('user updated');
            navigate('/admin/users');
        }
    }
  return (
    <>
    <Link to={'/admin/users'} className='btn btn-light my-3'>Go Back</Link>
    <FormContainer>
        <h2>Edit User</h2>
        {updateLoading && <Loader />}

        {isLoading ? <Loader /> : error ? <Message>{error}</Message> : (
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name' className='my-2'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' placeholder='Enter Name'
                    value={name} onChange={(e)=>setName(e.target.value)} />
                </Form.Group>
                <Form.Group controlId='email' className='my-2'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' placeholder='Enter Email'
                    value={email} onChange={(e)=>setEmail(e.target.value)} />
                </Form.Group>
              <Form.Group controlId='isadmin'>
                <Form.Check type='checkbox' label='Is Admin' checked={isAdmin}
                onChange={(e)=>setIsAdmin(e.target.checked)} />
              </Form.Group>
                <Button type='submit' variant='primary' className='my-2'>Update</Button>
            
            </Form>
        )}
    </FormContainer>
    </>
  )
}

export default UserEditScreen