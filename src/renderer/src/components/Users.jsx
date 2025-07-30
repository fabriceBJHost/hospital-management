import {
  Box,
  Button,
  Typography,
  Avatar,
  Grid,
  Container,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Stack,
  IconButton,
  Tooltip as Tooltips,
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material'
import DefaultProfile from '../assets/images/admin.png'
import { DataGrid } from '@mui/x-data-grid'
import { FaEdit, FaPlusCircle, FaTrashAlt } from 'react-icons/fa'
import classe from '../assets/css/Users.module.css'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'
import { useStateContext } from '../context/AuthContext'
import { frFR } from '@mui/x-data-grid/locales'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { getAllUsers } from '../function/Request'
import { useQuery } from '@tanstack/react-query'
import AddUsersModal from './Modals/AddUsersModal'
import { useState } from 'react'
import DeleteUsersModal from './Modals/DeleteUsersModal'
import UpdateUsersModal from './Modals/UpdateUsersModal'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const Users = () => {
  const { user } = useStateContext()
  const UserInfo = user ? JSON.parse(user) : null

  const {
    data: users = [],
    isPending,
    isError,
    error
  } = useQuery({
    queryKey: ['Users'],
    queryFn: getAllUsers
  })

  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            color: '#121212' // Change the color of toolbar icons
          }
        }
      }
    }
  })
  console.log(users)
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
      renderCell: (params) => (
        <Stack direction={'row'} gap={2} justifyContent="center" alignItems="center">
          <Tooltips
            title="Supprimer l'utilisateur"
            arrow
            placement="right"
            componentsProps={{
              tooltip: {
                sx: {
                  fontSize: '13px'
                }
              }
            }}
          >
            <IconButton color="error" onClick={() => openDeleteModalFunction(params.value)}>
              <FaTrashAlt />
            </IconButton>
          </Tooltips>
        </Stack>
      )
    }
  ]

  const dataRow = users.map((user) => ({
    id: user.id,
    username: user.username,
    role: user.role,
    images: user.images,
    action: user.id
  }))

  const paginationModel = { page: 0, pageSize: 10 }

  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [opens, setOpenSnackBar] = useState(false)

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackBar(false)
  }

  /**
   * delete function and props
   */
  const [openDeleteModal, setOpenDeletModal] = useState(false)
  const [idToSendDelete, setIdToSendDelete] = useState(null)
  const openDeleteModalFunction = (id) => {
    setIdToSendDelete(id)
    setOpenDeletModal(true)
  }
  const handleCloseDeleteModal = () => setOpenDeletModal(false)
  const [openSnackDelete, setOpenSnackDelete] = useState(false)

  const handleCloseSnackbarDelete = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackDelete(false)
  }

  /**
   * update function and props
   */
  const [openUpdateModal, setOpenUpdateModal] = useState(false)
  const [idToSendUpdate, setIdToSendUpdate] = useState(null)
  const openUpdateModalFunction = (id) => {
    setIdToSendUpdate(id)
    setOpenUpdateModal(true)
  }
  const handleCloseUpdateModal = () => setOpenUpdateModal(false)
  const [openSnackbarUpdate, setOpenSnackbarUpdate] = useState(false)
  const [openSnackbarUpdateError, setOpenSnackbarUpdateError] = useState(false)

  const handleCloseSnackbarUpdate = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackbarUpdate(false)
  }
  const handleCloseSnackbarUpdateError = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackbarUpdateError(false)
  }

  return (
    <Container maxWidth="xl" sx={{ flexGrow: 1, width: '100%' }}>
      <AddUsersModal handleClose={handleClose} open={open} setOpenSnack={setOpenSnackBar} />
      <UpdateUsersModal
        handleClose={handleCloseUpdateModal}
        open={openUpdateModal}
        setOpenSnack={setOpenSnackbarUpdate}
        id={idToSendUpdate}
        setOpenSnackError={setOpenSnackbarUpdateError}
      />
      <DeleteUsersModal
        handleClose={handleCloseDeleteModal}
        open={openDeleteModal}
        setOpenSnackDelete={setOpenSnackDelete}
        id={idToSendDelete}
      />
      <Snackbar open={opens} autoHideDuration={5000} onClose={handleCloseSnackbar}>
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Utilisateur ajouter avec succès
        </Alert>
      </Snackbar>
      <Snackbar open={openSnackDelete} autoHideDuration={5000} onClose={handleCloseSnackbarDelete}>
        <Alert
          onClose={handleCloseSnackbarDelete}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Utilisateur supprimer avec succès
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSnackbarUpdate}
        autoHideDuration={5000}
        onClose={handleCloseSnackbarUpdate}
      >
        <Alert
          onClose={handleCloseSnackbarUpdate}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Utilisateur modifier avec succès
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSnackbarUpdateError}
        autoHideDuration={5000}
        onClose={handleCloseSnackbarUpdateError}
      >
        <Alert
          onClose={handleCloseSnackbarUpdateError}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Erreur lors de la modification ou nom d&apos;utilisateur déjà pris!
        </Alert>
      </Snackbar>
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
                image={UserInfo.images == null ? DefaultProfile : UserInfo.images}
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
          <Typography variant="h6" gutterBottom>
            Actions rapides
          </Typography>
          <Stack spacing={2}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<FaEdit />}
              fullWidth
              onClick={() => openUpdateModalFunction(UserInfo.id)}
            >
              Modifier le profil
            </Button>
            <Button
              variant="outlined"
              onClick={handleOpen}
              color="primary"
              startIcon={<FaPlusCircle />}
              fullWidth
            >
              Ajouter un utilisateur
            </Button>
          </Stack>
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
                  {isPending ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <CircularProgress />
                    </Box>
                  ) : isError ? (
                    <Alert severity="error">{error.message}</Alert>
                  ) : (
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
                  )}
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
