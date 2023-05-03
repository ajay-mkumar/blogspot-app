import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { Box, Grid, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import {useNavigate} from 'react-router-dom'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'
import {makeStyles} from '@material-ui/styles'

export const Blog= ({id,title,description,imageUrl,userName,isUser}) => {
  
  console.log(isUser,title);
  const navigate=useNavigate();
  const handleupdate=(e)=>{
    navigate(`/myblogs/${id}`)
  }

  const deleteRequest=async()=>{
    const res=await axios.delete(`https://blogspot-pf51.onrender.com/blog/${id}`).catch(err=>console.log(err));

    const data=await res.data;

    return data;
  }

  const handledelete=()=>{
    deleteRequest().then(()=>window.location.href="/blogs")
    
    // .then(()=>navigate('/')).then(()=>navigate('/blogs'));
  }
  return (
    <div>

    
      <Card  sx={{ width: "40%",margin:"auto",mt:2,padding:2,boxShadow:"5px 5px 10px #ccc",":hover":{
        boxShadow:"10px 10px 20px #ccc"
      } }}>
        {isUser && 
        <Box display={'flex'}>
          <IconButton onClick={handleupdate} color='warning' sx={{marginLeft:'auto'}}><ModeEditOutlineIcon /></IconButton>
          <IconButton onClick={handledelete} color='error'><DeleteIcon  /></IconButton>
          </Box>}
      <CardHeader
        
        avatar={
          <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
            {userName.charAt(0)}
          </Avatar>
        }
    
        title={title}
        subheader="September 14, 2016"
      />
    
      <CardMedia 
        component="img"
        height="194"
        image={imageUrl}
        alt="Paella dish"
      />
      <CardContent>
      <hr />
        <br />
        <Typography variant="body2" color="text.secondary">
          
         <b>{userName}</b> {description}
        </Typography>
      </CardContent>
 
    </Card>
   
  
    </div>
  )
}
