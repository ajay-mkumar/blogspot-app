import { Header } from "./component/Header";
import React, { useEffect } from "react";
import {Auth }from "./component/Auth";
import {AddBlog} from "./component/AddBlog";
import {Blogs} from "./component/Blogs";
import {UserBlogs} from "./component/UserBlogs"
import {Blogdetails} from "./component/Blogdetails"
import {Routes,Route} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { authActions } from "./store";

function App() {
  const isLoggedin=useSelector(state=>state.isLoggedin);
 
  const dispatch=useDispatch();
  console.log(isLoggedin);
  useEffect(()=>{
    if(localStorage.getItem("userId")){
      dispatch(authActions.login())
    }else{
      dispatch(authActions.logout())
    }
  },[dispatch])
  return (
    <React.Fragment>
     <html>
      <head>
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </head>
     

      <header>
      <Header />
      </header>
      <main>
      <Routes>
        { !isLoggedin ?
        <>
        <Route path='/' element={<Auth />} />
        <Route  path='/auth' element={<Auth />} /></>
        : <>
        
        <Route  path='/blogs' element={<Blogs />} />
        <Route  path='/myblogs' element={<UserBlogs />} />
        <Route  path='/myblogs/:id' element={<Blogdetails />} />
        <Route path='/blogs/addblog' element={<AddBlog />}/></>}
      </Routes>
      </main>
      </html>
      </React.Fragment>
  );
}

export default App;
