import React from 'react'
import { Outlet } from 'react-router-dom'
import { Box, Container } from '@mui/material'
import Navigation from '../components/Navigation'

const DefaultLayout = () => {
  return (
    <>
      <Navigation />
      <Container maxWidth="xl">
        <Box sx={{ mt: 6 }}>
          <Outlet />
        </Box>
      </Container>
    </>
  )
}

export default DefaultLayout
