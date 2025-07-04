// import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  // TextField,
  // Select,
  // MenuItem,
  // InputLabel,
  // FormControl,
  Typography,
  Avatar,
  Grid,
  // Paper,
  // IconButton,
  Container,
  Card,
  CardContent,
  CardMedia,
  CardActionArea
} from '@mui/material'
import DefaultProfile from '../assets/images/admin.png'
import { DataGrid } from '@mui/x-data-grid'
import { FaPlusCircle } from 'react-icons/fa'
import classe from '../assets/css/Users.module.css'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'
import { useStateContext } from '../context/AuthContext'
import { frFR } from '@mui/x-data-grid/locales'
import { createTheme, ThemeProvider } from '@mui/material/styles'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const Users = () => {
  const { user } = useStateContext()
  const UserInfo = user ? JSON.parse(user) : null

  const users = [
    { name: 'Alice', role: 'admin', images: DefaultProfile },
    { name: 'Bob', role: 'staff', images: DefaultProfile },
    { name: 'Charlie', role: 'staff', images: DefaultProfile },
    { name: 'Diana', role: 'admin', images: DefaultProfile },
    { name: 'Eve', role: 'staff', images: DefaultProfile },
    { name: 'Frank', role: 'admin', images: DefaultProfile },
    { name: 'Grace', role: 'staff', images: DefaultProfile },
    { name: 'Heidi', role: 'staff', images: DefaultProfile },
    { name: 'Ivan', role: 'admin', images: DefaultProfile },
    { name: 'Judy', role: 'staff', images: DefaultProfile },
    { name: 'Karl', role: 'staff', images: DefaultProfile },
    { name: 'Leo', role: 'admin', images: DefaultProfile },
    { name: 'Mallory', role: 'staff', images: DefaultProfile }
  ]

  const theme = createTheme({
    components: {
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: 'gray' // Change the color of toolbar icons
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            color: '#121212' // Change the color of toolbar icons
          }
        }
      }
    }
  })

  // Count roles
  const roleCounts = users.reduce(
    (acc, user) => {
      if (user.role === 'admin') acc.admin += 1
      else if (user.role === 'staff') acc.staff += 1
      return acc
    },
    { admin: 0, staff: 0 }
  )

  const data = {
    labels: ['Admin', 'Staff'],
    datasets: [
      {
        label: 'Number of Users',
        data: [roleCounts.admin, roleCounts.staff],
        backgroundColor: ['#4e73df', '#1cc88a'],
        barThickness: 20 // make bars slim
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        ticks: {
          stepSize: 1,
          precision: 0
        },
        beginAtZero: true
      }
    }
  }

  const columns = [
    {
      field: 'username',
      headerName: "Nom d'utilisateur",
      flex: 1,
      minWidth: 150,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'role',
      headerName: 'Rôle',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'images',
      headerName: 'Image',
      width: 80,
      minWidth: 80,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Avatar
          src={params.value || DefaultProfile}
          alt={params.row.username}
          sx={{ width: 50, height: 50, border: '2px solid #e0e0e0', padding: '3px' }}
        />
      )
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center',
      align: 'center',
      renderCell: () => (
        <Button
          variant="contained"
          color="primary"
          startIcon={<FaPlusCircle />}
          // onClick={() => alert(`Action for ${params.row.username}`)}
        >
          Action
        </Button>
      )
    }
  ]

  const dataRow = users.map((user, index) => ({
    id: index + 1,
    username: user.name,
    role: user.role,
    images: user.images
  }))

  const paginationModel = { page: 0, pageSize: 10 }

  return (
    <Container maxWidth="xl" sx={{ flexGrow: 1, width: '100%' }}>
      <Grid container spacing={2} className={classe.HeaderGridContainer}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }} className={classe.statGridItem}>
          <Box>
            <Grid>
              <Bar data={data} options={options} />
            </Grid>
            <Grid>
              <Typography variant="h6" className={classe.title}>
                Statistique utilisateurs
              </Typography>
            </Grid>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 5 }} className={classe.statGridItem}>
          <p>Bonjour, vous êtes connecté en tant que :</p>
          <Card sx={{ textAlign: 'center', boxShadow: 'none' }}>
            <CardActionArea>
              <CardMedia
                component="img"
                image={UserInfo.image == null ? DefaultProfile : UserInfo.images}
                alt={UserInfo.username}
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  margin: '16px auto 8px',
                  border: '2px solid #e0e0e0',
                  padding: '3px'
                }}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  Nom d&apos;utilisateur: {UserInfo.username}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Rôles : {UserInfo.role}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid
          size={{ xs: 12, sm: 12, md: 6, lg: 4 }}
          className={`${classe.statGridItem} ${classe.blockAddInfo}`}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1">Modifier votre information</Typography>
              <Button variant="contained" color="primary" fullWidth>
                Modifier votre information
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" color="primary" fullWidth>
                Ajouter une nouvelle utilisateur
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={2} style={{ marginTop: 20 }}>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          <Card style={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6">Liste des Utilisateurs</Typography>
              <ThemeProvider theme={theme}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column', // Stacks content vertically on smaller screens,
                    width: '100%'
                  }}
                >
                  <DataGrid
                    rows={dataRow}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    disableRowSelectionOnClick
                    sx={{
                      border: 'solid 1px #e0e0e0',
                      width: 'auto', // Ensures the DataGrid takes full width
                      height: '50%', // Ensures it grows to fit content
                      minHeight: 400, // Minimum height for the DataGrid
                      display: 'flex',
                      justifyContent: 'center',
                      '@media (max-width: 600px)': {
                        width: '100%', // 100% width on small screens
                        height: 'auto' // Allow height to grow with content
                      }
                    }}
                    // slots={{ toolbar: GridToolbar }}
                    showToolbar
                    localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                  />
                </div>
              </ThemeProvider>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Users
