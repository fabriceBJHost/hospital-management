import React, { useEffect, useState } from 'react'
import { AppBar, Box, Toolbar, Typography, InputBase, Divider, IconButton, Grid, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { FaSearch, FaBars, FaCog, FaTimes, FaMinus, FaRegSquare, FaUsers, FaUserInjured, FaUserMd, FaFileAlt, FaNotesMedical } from "react-icons/fa"
import { isMaximized } from '../function/WindowState'
import { HiOutlineSquare2Stack } from 'react-icons/hi2'
import { LiaTimesSolid } from 'react-icons/lia';
import icon from '../assets/images/logo.png'
import { MdDashboard } from 'react-icons/md'
import { FaLocationDot } from 'react-icons/fa6'
import { BiLogOut } from 'react-icons/bi'
import { Link, useLocation } from 'react-router-dom'
import classe from "../assets/css/Navigation.module.css"

const Navigation = () => {

  let location = useLocation()

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
    <Box sx={{ width: 250, pt: 7 }} role="presentation" className={classe.drawer}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <img src={icon} width={70} alt="" style={{ border: 'solid 3px #1976d2', borderRadius: "100px", padding: 3, margin: 3 }} />
        <h3 style={{ color: "#1976d2" }}>Hospital-Management</h3>
      </div>
      <List onClick={toggleDrawer(false)}>
        <Link className={classe.menu} to={'/'}>
          <ListItem disablePadding className={location.pathname == '/' && classe.menuActive}>
            <ListItemButton>
              <ListItemIcon>
                <MdDashboard className={classe.icon} />
              </ListItemIcon>
              <ListItemText primary={"Tableau de bord"} />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link className={classe.menu} to={'/users'}>
          <ListItem disablePadding className={location.pathname == "/users" && classe.menuActive}>
            <ListItemButton>
              <ListItemIcon>
                <FaUsers className={classe.icon} />
              </ListItemIcon>
              <ListItemText primary={"Utilisateurs"} />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link className={classe.menu} to={'/patients'}>
          <ListItem disablePadding className={location.pathname == '/patients' && classe.menuActive}>
            <ListItemButton>
              <ListItemIcon>
                <FaUserInjured className={classe.icon} />
              </ListItemIcon>
              <ListItemText primary={"Patients"} />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link className={classe.menu} to={'/doctor'}>
          <ListItem disablePadding className={location.pathname == '/doctor' && classe.menuActive}>
            <ListItemButton>
              <ListItemIcon>
                <FaUserMd className={classe.icon} />
              </ListItemIcon>
              <ListItemText primary={"Docteurs"} />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link className={classe.menu} to={'/appointment'}>
          <ListItem disablePadding className={location.pathname == '/appointment' && classe.menuActive}>
            <ListItemButton>
              <ListItemIcon>
                <FaLocationDot className={classe.icon} />
              </ListItemIcon>
              <ListItemText primary={"Rendez vous"} />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link className={classe.menu} to={'/medicalrecord'}>
          <ListItem disablePadding className={location.pathname == '/medicalrecord' && classe.menuActive}>
            <ListItemButton>
              <ListItemIcon>
                <FaFileAlt className={classe.icon} />
              </ListItemIcon>
              <ListItemText primary={"Dossier médical"} />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link className={classe.menu} to={'/prescription'}>
          <ListItem disablePadding className={location.pathname == '/prescription' && classe.menuActive}>
            <ListItemButton>
              <ListItemIcon>
                <FaNotesMedical className={classe.icon} />
              </ListItemIcon>
              <ListItemText primary={"Prescription médical"} />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>

      <Divider />

      <List onClick={toggleDrawer(false)}>
        <Link className={classe.menu} to={'/setting'}>
          <ListItem disablePadding className={location.pathname == '/setting' && classe.menuActive}>
            <ListItemButton>
              <ListItemIcon>
                <FaCog className={classe.icon} />
              </ListItemIcon>
              <ListItemText primary={"Parametre"} />
            </ListItemButton>
          </ListItem>
        </Link>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <BiLogOut className={classe.icon} />
            </ListItemIcon>
            <ListItemText primary={"Déconnection"} />
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
      className={classe.appbar}
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
          <Grid container alignItems={'center'} justifyContent={'space-between'} sx={{ width: "30%", backgroundColor: '#cfcaca96', borderRadius: 2, height: "37px" }} className={classe.inputSearch}>
            <InputBase
              sx={{ ml: 1, flex: 1, p: 0 }}
              placeholder="Recherche..."
              type='search'
              className={classe.inputSearchField}
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
