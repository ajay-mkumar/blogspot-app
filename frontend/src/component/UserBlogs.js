import React, { useEffect, useState } from 'react'
import { Blog } from './Blog';
import axios from 'axios'

export const UserBlogs = () => {
  const [user,setUser]=useState();

  const id=localStorage.getItem("userId");

  const sendRequest=async()=>{
    const res=await axios.get(`https://blogspot-pf51.onrender.com/blog/user/${id}`).catch(err=>console.log(err))
    const data=await res.data;
    return data;
  }

  useEffect(()=>{
    sendRequest().then((data)=>setUser(data.userblog))
    //eslint-disable-next-line
  },[])
  console.log("userblogs",user);
  return (
    <div>
      {" "}
       {user && user.blogs && user.blogs.map((blog,index)=>(
      <Blog  key={index} id={blog._id} isUser={true}title={blog.title} description={blog.description}
     imageUrl={blog.image} userName={user.name}/>
    ))}
    </div>
  )
}
