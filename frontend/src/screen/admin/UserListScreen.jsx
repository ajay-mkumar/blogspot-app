import React from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Loader } from '../../component/Loader';
import {toast} from 'react-toastify'
import { Message } from '../../component/Message';
import { LinkContainer } from 'react-router-bootstrap';
import { useDeleteusersMutation, useGetusersQuery } from '../../slice/userSlice'

const UserListScreen = () => {
    const {data:users,isLoading,error,refetch}=useGetusersQuery();

    const [deleteuser,{isLoading:deleteLoading}]=useDeleteusersMutation();


    const deleteHandler=async(id)=>{
        try {
            const res=await deleteuser(id).unwrap();
            toast.success(res.message);
            refetch();
        } catch (err) {
            toast.error(err?.data?.message || err.message)
        }
    }

    
      return (
        <>
        <Row className='align-items-center'>
            <Col>
            <h1>Users</h1>
            </Col>
            {/* <Col className='text-end'>
            <Button className='btn-sm m-3' onClick={createProductHandler}>
              <FaEdit />  Create product
                </Button></Col> */}
        </Row>
        {deleteLoading && <Loader />}
    
        {isLoading ? (<Loader />) : error ? (<Message>{error}</Message>) : (<>
    
        <Table  striped hover responsive className='table-sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {users.map((user)=>(
                    <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        
                        <td>
                            <LinkContainer to={`/admin/users/${user._id}/edit`}>
                                <Button className='btn-sm mx-2' variant='light'>
                                    <FaEdit />
                                </Button>
                            </LinkContainer>
                            <Button className='btn-sm mx-2' variant='danger' onClick={()=>deleteHandler(user._id)}>
                                    <FaTrash />
                                </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>)}
        </>
  )
}

export default UserListScreen