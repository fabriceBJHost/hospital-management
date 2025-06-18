import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Box, Container } from '@mui/material'
import AuthNavigation from '../components/AuthNavigation'
import { useStateContext } from "../context/AuthContext"

const AuthLayout = () => {

  const { token } = useStateContext();

  // If token is present, redirect to home
  if (token) {
    return <Navigate to={"/"} />; // Prevent rendering the layout
  }

  return (
    <>
      <AuthNavigation />
      <Outlet />
    </>
  )
}

export default AuthLayout
