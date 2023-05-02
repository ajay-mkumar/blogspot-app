import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const Blogdetails = () => {
  const navigate=useNavigate();
  const labelstyles={mb:1,mt:2,fontSize:'24px',fontWeight:'bold'};
  const id=useParams().id;
  console.log(id);
  const [inputs,setInputs]=useState({
   
  })

  const handlechange=(e)=>{
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value
    }))
  }
  
  const [blogs,setBlogs]=useState();

  const fetchDetails=async()=>{
    const res=await axios.get(`http://localhost:5000/blog/${id}`).catch(err=>console.log(err))
    const data=await res.data;

    return(data);
  }

  useEffect(()=>{
    fetchDetails().then(data=>{setBlogs(data.blog)
                                setInputs({
                                  title:data.blog.title,
                                  description:data.blog.description,
                            
                                })
                                })
  },[id]);
  const sendRequest=async()=>{
    const res=await axios.put(`http://localhost:5000/blog/update/${id}`,{
      title:inputs.title,
      description:inputs.description
    }).catch(err=>console.log(err));

    const data=await res.data;
    
    return data;
  }

  console.log(blogs);
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(data=>console.log(data)).then(()=>navigate('/myblogs'))
  }  
return (
    <div>
      {inputs &&   <form onSubmit={handleSubmit}>
    <Box border={3} borderColor="green"
     borderRadius={5} boxShadow="10px 10px 20px #ccc"
     padding={3} margin={3} display={"felx"}
      flexDirection={"column"} width={"80%"}>

      <Typography fontWeight={'bold'} color={'grey'}
       variant='h2' textAlign={'center'}>update Your Blog</Typography>

      <InputLabel sx={labelstyles}>Title</InputLabel>
      <TextField name='title' value={inputs.title} onChange={handlechange} />

      <InputLabel sx={labelstyles}>Description</InputLabel>
      <TextField name='description' value={inputs.description} onChange={handlechange}/>

      

      <Button type='submit'>update</Button>
    </Box>
  </form>}</div>
  )
}
