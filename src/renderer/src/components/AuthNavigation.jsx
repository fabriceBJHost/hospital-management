import React, { useEffect, useState } from 'react'
import { AppBar, Grid, IconButton, InputBase, Toolbar, Typography } from '@mui/material'
import { FaMinus, FaRegSquare, FaSearch } from 'react-icons/fa'
import { HiOutlineSquare2Stack } from 'react-icons/hi2'
import { LiaTimesSolid } from 'react-icons/lia'
import { useLocation } from 'react-router-dom'
import classe from '../assets/css/Navigation.module.css'
import { isMaximized } from '../function/WindowState'

const AuthNavigation = () => {

  const location = useLocation()

  /**
     * function used to exit the app
     */
    const exit = () => {
      window.navigations.exit(true)
    }

    /**
     * function used to minimize the app
     */
    const minimize = () => {
      window.navigations.minimize(true)
    }

    /**
     * function used to let window maximized
     */
    const maximize = () => {
      window.navigations.maximize(true)
    }

    /**
     * function used to let window unmaximize
     */
    const unmaximize = () => {
      window.navigations.unmaximize(true)
    }

    const [max, setMax] = useState(false)

    useEffect(() => {
      const checkMaximized = () => {
        setMax(isMaximized())
      }

      // check on mount
      checkMaximized()

      window.addEventListener('resize', checkMaximized)

      return () => {
        window.removeEventListener('resize', checkMaximized)
      }
    }, [])


  return (
    <AppBar position="fixed" className="drag" sx={{ overflow: 'hidden' }}>
      <Toolbar variant="dense">
        <Grid
          container
          spacing={2}
          alignItems={'center'}
          justifyContent={'space-between'}
          sx={{ width: '100%' }}
        >
          <Grid>
            <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
              {location.pathname.replace('/', '') === ''
                ? 'Tableau de bord'
                : location.pathname.replace('/', '')}
            </Typography>
          </Grid>
          <Grid className="no-drag">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={minimize}
            >
              <FaMinus />
            </IconButton>
            {max ? (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={unmaximize}
              >
                <HiOutlineSquare2Stack />
              </IconButton>
            ) : (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={maximize}
              >
                <FaRegSquare />
              </IconButton>
            )}
            <IconButton
              edge="start"
              color="error"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={exit}
            >
              <LiaTimesSolid />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default AuthNavigation
