import React, { useEffect, useState } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom';
import { useGetProductDetailsQuery, useUpdateproductMutation, useUploadproductimageMutation } from '../../slice/productApislice';
import FormContainer from '../../component/FormContainer';
import { Loader } from '../../component/Loader';
import { Message } from '../../component/Message';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

const ProductEditScreen = () => {
    const {id:productId}=useParams();

    const [name,setName]=useState('');
    const [price,setPrice]=useState(0);
    const [image,setImage]=useState('');
    const [brand,setBrand]=useState('');
    const [category,setCategory]=useState('');
    const [countInStock,setCountInStock]=useState(0);
    const [description,setDescription]=useState('');

    const {data:product,isLoading,refetch,error}=useGetProductDetailsQuery(productId);

    const [updateproduct,{isLoading:updateLoading}]=useUpdateproductMutation();

    const [uploadproductimage,{isLoading:imageUploadLoading}]=useUploadproductimageMutation();

    const navigate=useNavigate();

    useEffect(()=>{
        if(product){
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }
    },[product])

    const uploadImageHandler=async(e)=>{
        console.log(e.target.files[0])
        const formdata=new FormData();
        formdata.append('image',e.target.files[0]);
        try {
            const res=await uploadproductimage(formdata).unwrap();
            console.log(res.image);
            toast.success(res.message)
            setImage(res.image)
            
        } catch (err) {
            toast.error(err?.data?.message || err.message)
        }
    }

    const submitHandler=async(e)=>{
        e.preventDefault();

        const  updateddetails={
            productId,
            name,
            image,
            brand,
            category,
            description,
            countInStock,
            price,
        }

        const res=await updateproduct(updateddetails);
        if(res.error){
            toast.error(res.error);
        }else{
            toast.success('product updated');
            navigate('/admin/products');
        }
    }
  return (
    <>
    <Link to={'/admin/products'} className='btn btn-light my-3'>Go Back</Link>
    <FormContainer>
        <h2>Edit Product</h2>
        {updateLoading && <Loader />}

        {isLoading ? <Loader /> : error ? <Message>{error}</Message> : (
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name' className='my-2'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' placeholder='Enter Name'
                    value={name} onChange={(e)=>setName(e.target.value)} />
                </Form.Group>
                <Form.Group controlId='price' className='my-2'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control type='number' placeholder='Enter Price'
                    value={price} onChange={(e)=>setPrice(e.target.value)} />
                </Form.Group>
                <Form.Group controlId='image' className='my-2'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control type='text' placeholder='Image Url'
                    value={image}   onChange={(e) => setImage(e.target.value)} />
                    <Form.Control type='file' label='choose a file' onChange={uploadImageHandler}  />
                </Form.Group>
                <Form.Group controlId='brand' className='my-2'>
                    <Form.Label>Brand</Form.Label>
                    <Form.Control type='text' placeholder='Enter Brand'
                    value={brand} onChange={(e)=>setBrand(e.target.value)} />
                </Form.Group>
                <Form.Group controlId='category' className='my-2'>
                    <Form.Label>Caregory</Form.Label>
                    <Form.Control type='text' placeholder='Enter Caregory'
                    value={category} onChange={(e)=>setCategory(e.target.value)} />
                </Form.Group>
                <Form.Group controlId='countInStock' className='my-2'>
                    <Form.Label>Count In Stock</Form.Label>
                    <Form.Control type='number' placeholder='Enter Count In Stock'
                    value={countInStock} onChange={(e)=>setCountInStock(e.target.value)} />
                </Form.Group>
                <Form.Group controlId='description' className='my-2'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type='text' placeholder='Enter Description'
                    value={description} onChange={(e)=>setDescription(e.target.value)} />
                </Form.Group>
                <Button type='submit' variant='primary' className='my-2'>Update</Button>
            
            </Form>
        )}
    </FormContainer>
    </>
  )
}

export default ProductEditScreen