import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Navigation from '../components/Navigation'
import { useStateContext } from '../context/AuthContext'

const DefaultLayout = () => {

  const { token } = useStateContext()

  if (!token) {
    return <Navigate to={'/login'} />
  }
  return (
    <>
      <Navigation childrens={<Outlet />} />
    </>
  )
}

export default DefaultLayout
