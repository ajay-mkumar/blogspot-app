import React, { useState } from 'react'
import {AppBar, Box, Button, Tabs,Tab, Toolbar, Typography, Grid } from '@mui/material'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store';

export const Header = () => {
  const dispatch=useDispatch();
  const [isSignup,setSignup]=useState(false);
  const isLoggedin=useSelector(state=>state.isLoggedin);
  const [value,setValue]=useState();
  return (
    <Grid>
    <AppBar position='sticky'>
        <Toolbar>
        <Typography variant='h4'>Blogspot</Typography>
      { isLoggedin && 
        <Box display="flex" marginLeft={'auto'} marginRight={'auto'}>
            <Tabs textColor='inherit' value={value} onChange={(e,val)=>{setValue(val)}}  TabIndicatorProps={{
    style: {
      backgroundColor: "black",
    }
  }}>
                <Tab label="All blogs" sx={{color:"white"}} LinkComponent={Link} to='/blogs' />
                <Tab label="My blogs" sx={{color:"white"}} LinkComponent={Link} to='/myblogs'/>
                <Tab label="Add blogs" sx={{color:"white"}} LinkComponent={Link} to='/blogs/addblog'/>
            </Tabs>
        </Box>}
        <Box display="flex" marginLeft="auto">
           {!isLoggedin &&
            <Button sx={{margin:1,color:"white",borderRadius:10}} LinkComponent={Link} to='/auth'>login</Button>
           }
          { isLoggedin && <Button sx={{margin:1,color:"white",borderRadius:10}} onClick={()=>dispatch(authActions.logout())}
           LinkComponent={Link} to='/auth'>logout</Button>}
      
            
              </Box>
        </Toolbar>
    </AppBar>
    </Grid>
  )
}
