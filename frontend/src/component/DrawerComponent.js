import React, { useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  Tab,
  Tabs,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useStyles } from "./util";
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Toolbar, Typography } from "@mui/material";
import { authActions } from "../store";
import { useDispatch, useSelector } from "react-redux";

export const DrawerComponent=()=> {
  const dispatch=useDispatch();
const classes = useStyles();
const [value,setValue]=useState();
const isLoggedin=useSelector(state=>state.isLoggedin);
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
     <AppBar position='sticky'>
        <Toolbar>
       
        <Typography variant='h4'>Blogspot</Typography>
        
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)} 
        anchor="right"

      >

    <Tabs orientation="vertical" value={value} onChange={(e,val)=>{setValue(val)}} >
    {isLoggedin ?
    <> 
    <Tab label="All blogs" onClick={() => setOpenDrawer(false)} LinkComponent={Link} to='/blogs' /> 
    <Tab label="My blogs" onClick={() => setOpenDrawer(false)}  LinkComponent={Link} to='/myblogs'/>
    <Tab label="Add blogs" onClick={() => setOpenDrawer(false)}  LinkComponent={Link} to='/blogs/addblog'/>
    <Tab label="logout" onClick={()=>{dispatch(authActions.logout());setOpenDrawer(false)}} 
    LinkComponent={Link} to='/auth' />
    </>
    :
    <Tab label="login" onClick={()=>{setOpenDrawer(false)}} LinkComponent={Link} to='/auth'></Tab>
     }
      </Tabs>

      </Drawer>
      <Box display="flex"  marginLeft="auto">
      <IconButton  sx={{margin:1,color:"white"}}  onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon />
      </IconButton>
      </Box>
      </Toolbar >
      </AppBar>
    </>
  );
}
export default DrawerComponent;