import React from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from '../components/Navigation'

const DefaultLayout = () => {
  return (
    <>
      <Navigation childrens={<Outlet />} />
    </>
  )
}

        export default DefaultLayout
