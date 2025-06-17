import React, { useEffect, useState } from 'react'
import { styled, useTheme } from '@mui/material/styles'
import MuiAppBar from '@mui/material/AppBar'
import MuiDrawer from '@mui/material/Drawer'
import {
  Box,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import {
  FaChevronLeft,
  FaChevronRight,
  FaBars,
  FaUsers,
  FaUserInjured,
  FaUserMd,
  FaFileAlt,
  FaNotesMedical,
  FaCog,
  FaMinus,
  FaRegSquare,
  FaSearch
} from 'react-icons/fa'
import classe from '../assets/css/Navigation.module.css'
import { Link, useLocation } from 'react-router-dom'
import { MdDashboard } from 'react-icons/md'
import { FaLocationDot } from 'react-icons/fa6'
import { BiLogOut } from 'react-icons/bi'
import { isMaximized } from '../function/WindowState'
import { Avatar, Grid, InputBase } from '@mui/material'
import { HiOutlineSquare2Stack } from 'react-icons/hi2'
import { LiaTimesSolid } from 'react-icons/lia'
import icon from '../assets/images/logo.png'

const drawerWidth = 230

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}))

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen
        })
      }
    }
  ]
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme)
      }
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme)
      }
    }
  ]
}))

const NavigationTest = ({ childrens }) => {
  let location = useLocation()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

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
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'rgba(214, 214, 214, 0.17)' }}>
      {/* <CssBaseline /> */}
      <AppBar position="fixed" open={open} className="drag" sx={{ overflow: 'hidden' }}>
        <Toolbar variant="dense">
          <IconButton
            color="inherit"
            className="no-drag"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5
              },
              open && { display: 'none' }
            ]}
          >
            <FaBars />
          </IconButton>
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
            <Grid
              container
              alignItems={'center'}
              justifyContent={'space-between'}
              sx={{ width: '30%', backgroundColor: '#cfcaca96', borderRadius: 2, height: '37px' }}
              className={classe.inputSearch}
            >
              <InputBase
                sx={{ ml: 1, flex: 1, p: 0 }}
                placeholder="Recherche..."
                type="search"
                className={classe.inputSearchField + ' no-drag'}
              />
              <FaSearch style={{ p: '10px', width: '40px' }} />
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
      <Drawer variant="permanent" color="primary" open={open} className={classe.drawer}>
        <DrawerHeader className={classe.drawerHeader}>
          {open && (
            <Typography className={classe.drawerTitle} component="div" variant="p">
              <Avatar
                sx={{ width: 45, height: 45, border: 'solid 1px #56aaff' }}
                alt="logo of software"
                src={icon}
              />{' '}
              Hospital Management
            </Typography>
          )}
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <FaChevronRight className={classe.icon} />
            ) : (
              <FaChevronLeft className={classe.icon} />
            )}
          </IconButton>
        </DrawerHeader>
        {/* <Divider className={classe.divider} /> */}
        <List className={classe.drawer}>
          {/* dashboard link navigation */}
          <Link className={classe.menu} to={'/'}>
            <ListItem
              disablePadding
              className={location.pathname == '/' && classe.menuActive}
              sx={{ display: 'block' }}
            >
              <ListItemButton
                className={`${classe.ListItemButton} ${open ? classe.open : classe.closed}`}
              >
                <ListItemIcon className={open ? classe.iconOpen : classe.iconClosed}>
                  <MdDashboard
                    className={location.pathname == '/' ? classe.iconActive : classe.icon}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={'Tableau de bord'}
                  className={open ? classe.textVisible : classe.textHidden}
                />
              </ListItemButton>
            </ListItem>
          </Link>

          {/* users Link navigation */}
          <Link className={classe.menu} to={'/users'}>
            <ListItem
              disablePadding
              className={location.pathname == '/users' && classe.menuActive}
              sx={{ display: 'block' }}
            >
              <ListItemButton
                className={`${classe.ListItemButton} ${open ? classe.open : classe.closed}`}
              >
                <ListItemIcon className={open ? classe.iconOpen : classe.iconClosed}>
                  <FaUsers
                    className={location.pathname == '/users' ? classe.iconActive : classe.icon}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={'Utilisateurs'}
                  className={open ? classe.textVisible : classe.textHidden}
                />
              </ListItemButton>
            </ListItem>
          </Link>

          {/* patient Link navigation */}
          <Link className={classe.menu} to={'/patients'}>
            <ListItem
              disablePadding
              className={location.pathname == '/patients' && classe.menuActive}
              sx={{ display: 'block' }}
            >
              <ListItemButton
                className={`${classe.ListItemButton} ${open ? classe.open : classe.closed}`}
              >
                <ListItemIcon className={open ? classe.iconOpen : classe.iconClosed}>
                  <FaUserInjured
                    className={location.pathname == '/patients' ? classe.iconActive : classe.icon}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={'Patients'}
                  className={open ? classe.textVisible : classe.textHidden}
                />
              </ListItemButton>
            </ListItem>
          </Link>

          {/* doctor Link navigation */}
          <Link className={classe.menu} to={'/doctor'}>
            <ListItem
              disablePadding
              className={location.pathname == '/doctor' && classe.menuActive}
              sx={{ display: 'block' }}
            >
              <ListItemButton
                className={`${classe.ListItemButton} ${open ? classe.open : classe.closed}`}
              >
                <ListItemIcon className={open ? classe.iconOpen : classe.iconClosed}>
                  <FaUserMd
                    className={location.pathname == '/doctor' ? classe.iconActive : classe.icon}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={'Docteurs'}
                  className={open ? classe.textVisible : classe.textHidden}
                />
              </ListItemButton>
            </ListItem>
          </Link>

          {/* Appointment Link Navigation */}
          <Link className={classe.menu} to={'/appointment'}>
            <ListItem
              disablePadding
              className={location.pathname == '/appointment' && classe.menuActive}
              sx={{ display: 'block' }}
            >
              <ListItemButton
                className={`${classe.ListItemButton} ${open ? classe.open : classe.closed}`}
              >
                <ListItemIcon className={open ? classe.iconOpen : classe.iconClosed}>
                  <FaLocationDot
                    className={
                      location.pathname == '/appointment' ? classe.iconActive : classe.icon
                    }
                  />
                </ListItemIcon>
                <ListItemText
                  primary={'Rendez vous'}
                  className={open ? classe.textVisible : classe.textHidden}
                />
              </ListItemButton>
            </ListItem>
          </Link>

          {/* medical record navigation Link */}
          <Link className={classe.menu} to={'/medicalrecord'}>
            <ListItem
              disablePadding
              className={location.pathname == '/medicalrecord' && classe.menuActive}
              sx={{ display: 'block' }}
            >
              <ListItemButton
                className={`${classe.ListItemButton} ${open ? classe.open : classe.closed}`}
              >
                <ListItemIcon className={open ? classe.iconOpen : classe.iconClosed}>
                  <FaFileAlt
                    className={
                      location.pathname == '/medicalrecord' ? classe.iconActive : classe.icon
                    }
                  />
                </ListItemIcon>
                <ListItemText
                  primary={'Dossier médical'}
                  className={open ? classe.textVisible : classe.textHidden}
                />
              </ListItemButton>
            </ListItem>
          </Link>

          {/* prescription medical navigation Link */}
          <Link className={classe.menu} to={'/prescription'}>
            <ListItem
              disablePadding
              className={location.pathname == '/prescription' && classe.menuActive}
              sx={{ display: 'block' }}
            >
              <ListItemButton
                className={`${classe.ListItemButton} ${open ? classe.open : classe.closed}`}
              >
                <ListItemIcon className={open ? classe.iconOpen : classe.iconClosed}>
                  <FaNotesMedical
                    className={
                      location.pathname == '/prescription' ? classe.iconActive : classe.icon
                    }
                  />
                </ListItemIcon>
                <ListItemText
                  primary={'Prescription médical'}
                  className={open ? classe.textVisible : classe.textHidden}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
        <Divider className={classe.divider} />
        <List className={classe.drawer}>
          {/* setting navigationLink */}
          <Link className={classe.menu} to={'/setting'}>
            <ListItem
              disablePadding
              className={location.pathname == '/setting' && classe.menuActive}
              sx={{ display: 'block' }}
            >
              <ListItemButton
                className={`${classe.ListItemButton} ${open ? classe.open : classe.closed}`}
              >
                <ListItemIcon className={open ? classe.iconOpen : classe.iconClosed}>
                  <FaCog
                    className={location.pathname == '/setting' ? classe.iconActive : classe.icon}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={'Parametre'}
                  className={open ? classe.textVisible : classe.textHidden}
                />
              </ListItemButton>
            </ListItem>
          </Link>

          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              className={`${classe.ListItemButton} ${open ? classe.open : classe.closed}`}
            >
              <ListItemIcon className={open ? classe.iconOpen : classe.iconClosed}>
                <BiLogOut className={classe.icon} />
              </ListItemIcon>
              <ListItemText
                primary={'Déconnection'}
                className={open ? classe.textVisible : classe.textHidden}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 1,
          mt: '48px', // height of AppBar (toolbar dense is usually 48px)
          overflowY: 'auto',
          height: 'calc(100vh - 48px)' // ensure it scrolls only in the space below AppBar
        }}
      >
        {childrens}
      </Box>
    </Box>
  )
}

export default NavigationTest
