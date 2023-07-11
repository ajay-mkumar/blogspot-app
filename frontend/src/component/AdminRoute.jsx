import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {

    const {userinfo}=useSelector(state=>state.auth);

  return (
    userinfo && userinfo.isAdmin ? <Outlet /> : <Navigate to={'/signin'} replace />
  )
}

export default AdminRoute