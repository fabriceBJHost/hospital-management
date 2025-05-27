import React, { useEffect, useState } from 'react'
import { AppBar, Box, Toolbar, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, Paper, InputBase, Divider, IconButton, Grid, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { FaSearch, FaBars, FaCog, FaTimes, FaMinus, FaRegSquare, FaEnvelope } from "react-icons/fa"
import { isMaximized, isNotMaximized } from '../function/WindowState'
import { HiOutlineSquare2Stack } from 'react-icons/hi2'
import { LiaTimesSolid } from 'react-icons/lia'

const Navigation = () => {

  /**
   * function used to exit the app
   */
  const exit = () => {
    window.navigations.exit(true);
  }

  /**
   * function used to minimize the app
   */
  const minimize = () => {
    window.navigations.minimize(true);
  }

  /**
   * function used to let window maximized
   */
  const maximize = () => {
    window.navigations.maximize(true);
  }

  /**
   * function used to let window unmaximize
   */
  const unmaximize = () => {
    window.navigations.unmaximize(true);
  }

  const [max, setMax] = useState(false)

  useEffect(() => {
    const checkMaximized = () => {
      setMax(isMaximized())
    }

    // check on mount
    checkMaximized();

    window.addEventListener('resize', checkMaximized)

    return () => {
      window.removeEventListener('resize', checkMaximized)
    }
  }, [])

  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250, pt: 7 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <FaEnvelope />
            </ListItemIcon>
            <ListItemText primary={"Email"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <FaCog />
            </ListItemIcon>
            <ListItemText primary={"Parametre"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar
      position='fixed'
      color='inherit'
      sx={{ zIndex: 99999 }}
    >
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <Toolbar variant='dense'>
        {
          open ? (
            <IconButton edge="start" color='inherit' aria-label='menu' sx={{ mr: 2 }} onClick={toggleDrawer(false)}>
              <FaTimes />
            </IconButton>

          ) : (
            <IconButton edge="start" color='inherit' aria-label='menu' sx={{ mr: 2 }} onClick={toggleDrawer(true)}>
              <FaBars />
            </IconButton>
          )
        }
        <Grid container spacing={2} alignItems={'center'} justifyContent={'space-between'} sx={{ width: "100%" }}>
          <Grid>
            <Typography variant='h6'>
              Hospital Management
            </Typography>
          </Grid>
          <Grid container alignItems={'center'} justifyContent={'space-between'} sx={{ width: "30%", backgroundColor: '#cfcaca96', borderRadius: 2, height: "37px" }}>
            <InputBase
              sx={{ ml: 1, flex: 1, p: 0 }}
              placeholder="Recherche..."
            />
            <FaSearch style={{ p: '10px', width: '40px' }} />
          </Grid>

          <Grid>
            <IconButton edge="start" color='inherit' aria-label='menu' sx={{ mr: 2 }} onClick={minimize}>
              <FaMinus />
            </IconButton>
            {
              max ? (
                <IconButton edge="start" color='inherit' aria-label='menu' sx={{ mr: 2 }} onClick={unmaximize}>
                  <HiOutlineSquare2Stack />
                </IconButton>
              ) : (
                <IconButton edge="start" color='inherit' aria-label='menu' sx={{ mr: 2 }} onClick={maximize}>
                  <FaRegSquare />
                </IconButton>
              )
            }
            <IconButton edge="start" color='error' aria-label='menu' sx={{ mr: 2 }} onClick={exit}>
              <LiaTimesSolid />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Navigation
