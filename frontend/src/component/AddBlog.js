import React, { useRef, useState } from 'react'
import {Box, Button, InputLabel, TextField, Typography} from '@mui/material'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useStyle } from './util';

export const AddBlog = () => {
  const classes=useStyle();
  const navigate=useNavigate();
  const hiddenfileinput=useRef(null)
  const [inputs,setInputs]=useState({
    title:'',
    description:''
  })
 const[image,setImage]=useState();
  const handlechange=(e)=>{
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value
    }))
  }
  const sendRequest=async()=>{
    const res=await axios.post("http://localhost:5000/blog/addblog",{
      title:inputs.title,
      description:inputs.description,
      image,
      user:localStorage.getItem("userId")
    }).catch(err=>console.log(err))

    const data=await res.data;

    return data;
  }

  const handleclick=(e)=>{
    hiddenfileinput.current.click();
  }
  const convertintobase=(e)=>{
    var reader=new FileReader();
    if(e.target.files[0]){
    reader.readAsDataURL(e.target.files[0]);
    reader.onload=()=>{
      setImage(reader.result)
    }
  }
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(inputs,image);
    if(inputs.title==='' || inputs.description==='' || image===''){
      alert("All fields are mandatory");
    }else{
    sendRequest().then(()=>navigate('/blogs'));
  }
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
      
          <Box maxWidth={400} display="flex" flexDirection={"column"}
          alignItems="center" justifyContent={"center"}
          boxShadow={"10px 10px 20px #ccc"} padding={3}
          margin={"auto"} marginTop={5} borderRadius={5}>
          <Typography className={classes.font} padding={3} variant='h4' textAlign={'center'}>
            Post Your Blog
            </Typography>
         <TextField className={classes.font}  name='title' value={inputs.title} onChange={handlechange} 
         placeholder='title' margin='normal' />

          <TextField className={classes.font}  name='description' value={inputs.description} onChange={handlechange} 
           placeholder='description' margin='normal' />
            <Button onClick={handleclick} variant='contained'>Upload Image</Button>
          <input accept='image/*' ref={hiddenfileinput} style={{display: 'none'}} type='file' name='image' onChange={convertintobase}/>
          {image&&  
          <Box mt={2} textAlign="center">
            <div>Image Preview:</div>
            <img src={image}  height="100px" />
          </Box>}

         
          <Button type='submit'>submit</Button>
        </Box>
      </form>
    </div>
  )
}
