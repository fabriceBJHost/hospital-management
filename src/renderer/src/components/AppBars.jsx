import { AppBar, Grid, IconButton, InputBase, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { FaBars, FaMinus, FaRegSquare, FaSearch } from 'react-icons/fa'
import { HiOutlineSquare2Stack } from 'react-icons/hi2'
import { LiaTimesSolid } from 'react-icons/lia'

const AppBars = () => {
  return (
    <AppBar position="fixed" open={open} className="drag" sx={{ overflow: 'hidden' }}>
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
  )
}

export default AppBars
