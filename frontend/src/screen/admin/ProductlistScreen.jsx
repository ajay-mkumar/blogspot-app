import React from 'react'
import { useCreateproductMutation, useDeleteProductMutation, useGetProductsQuery } from '../../slice/productApislice'
import { Button, Col, Row, Table } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Loader } from '../../component/Loader';
import {toast} from 'react-toastify'
import { Message } from '../../component/Message';
import { LinkContainer } from 'react-router-bootstrap';
import { useParams } from 'react-router-dom';
import Paginate from '../../component/Paginate';

const ProductlistScreen = () => {


    const {pageNumber}=useParams();
    const {data,isLoading,error,refetch}=useGetProductsQuery({pageNumber});
    const [createProduct]=useCreateproductMutation();
    const [deleteproduct,{isLoading:deleteLoading}]=useDeleteProductMutation();
    const deleteHandler=async(id)=>{
        try {
            const res=await deleteproduct(id).unwrap();
            refetch();
            toast.success(res.message);
        } catch (err) {
            toast.error(err?.data?.message || err.message)
            
        }

    }
    const createProductHandler=async()=>{
        if(window.confirm("Are you wanna create product?")){
            try{
                await createProduct();
                refetch();
                toast.success("product created")
            }catch(err){
                toast.error(err?.data?.message || err.message)
            }
        }
    }
  return (
    <>
    <Row className='align-items-center'>
        <Col>
        <h1>Products</h1>
        </Col>
        <Col className='text-end'>
        <Button className='btn-sm m-3' onClick={createProductHandler}>
          <FaEdit />  Create product
            </Button></Col>
    </Row>
    {deleteLoading && <Loader />}

    {isLoading ? (<Loader />) : error ? (<Message>{error}</Message>) : (<>

    <Table  striped hover responsive className='table-sm'>
        <thead>
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {data.products.map((product)=>(
                <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                            <Button className='btn-sm mx-2' variant='light'>
                                <FaEdit />
                            </Button>
                        </LinkContainer>
                        <Button className='btn-sm mx-2' variant='danger' onClick={()=>deleteHandler(product._id)}>
                                <FaTrash />
                            </Button>
                    </td>
                </tr>
            ))}
        </tbody>
    </Table>
    <Paginate page={data.page} pages={data.pages} isAdmin={true} />
    </>)}
    </>
  )
}

export default ProductlistScreen