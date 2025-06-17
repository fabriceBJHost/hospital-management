import React from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from '../components/Navigation'
import { Box, Container } from '@mui/material'

const AuthLayout = () => {
  return (
    <>
      {/* <Navigation /> */}
      <Container maxWidth="xl">
        <Box sx={{ mt: 6 }}>
          <Outlet />
        </Box>
      </Container>
    </>
  )
}

export default AuthLayout
