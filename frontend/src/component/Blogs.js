import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Blog } from './Blog';
export const Blogs = () => {
  const [blogs,setBlog]=useState();
  const sendRequest=async()=>{
    const res=await axios.get("https://blogspot-pf51.onrender.com/blog").catch(err=>console.log(err))

    const data=res.data;

    return data;
  }
  useEffect(()=>{
    sendRequest().then(data=>setBlog(data.allblog))
    //eslint-disable-next-line
  },[])
  console.log(blogs)
  return (
    <div>
    {blogs && blogs.map((blog,index)=>(
      <Blog id={blog._id}
      isUser={localStorage.getItem("userId")===blog.user._id} 
      title={blog.title} description={blog.description}
     imageUrl={blog.image} userName={blog.user.name}/>
    ))}
    </div>
  )
}
