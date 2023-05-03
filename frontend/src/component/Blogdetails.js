import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useStyles } from './util';

export const Blogdetails = () => {
  const classes=useStyles();
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
    const res=await axios.get(`https://blogspot-pf51.onrender.com/blog/${id}`).catch(err=>console.log(err))
    const data=await res.data;

    return(data);
  }

  useEffect(()=>{
    fetchDetails().then(data=>{setBlogs(data.blog)
                                setInputs({
                                  title:data.blog.title,
                                  description:data.blog.description,
                            
                                })
                                //eslint-disable-next-line
                                })
  },[id]);
  const sendRequest=async()=>{
    const res=await axios.put(`https://blogspot-pf51.onrender.com/blog/update/${id}`,{
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
      <Box maxWidth={400} display="flex" flexDirection={"column"}
          alignItems="center" justifyContent={"center"}
          boxShadow={"10px 10px 20px #ccc"} padding={3}
          margin={"auto"} marginTop={5} borderRadius={5}>
          <Typography className={classes.font} padding={3} variant='h4' textAlign={'center'}>
            Update Your Blog
            </Typography>
         <TextField className={classes.font}  name='title' value={inputs.title} onChange={handlechange} 
         placeholder='title' margin='normal' />

          <TextField className={classes.font}  name='description' value={inputs.description} onChange={handlechange} 
           placeholder='description' margin='normal' />
      

      <Button type='submit'>update</Button>
    </Box>
  </form>}</div>
  )
}
