import {
  Avatar,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
  Tooltip as Tooltips,
  CircularProgress,
  Alert,
  Box
} from '@mui/material'
import classe from '../assets/css/Patients.module.css'
import { FaEdit, FaPlusCircle, FaTrashAlt } from 'react-icons/fa'
import { frFR } from '@mui/x-data-grid/locales'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { DataGrid } from '@mui/x-data-grid'
// import dayjs from 'dayjs'
import { useQuery } from '@tanstack/react-query'
import { getAllParients } from '../function/Request'

const Patients = () => {
  const {
    data: patients = [],
    isPending,
    isError,
    error
  } = useQuery({
    queryKey: ['Patients'],
    queryFn: getAllParients
  })

  const totalIsHospitalized = patients.reduce((acc, patient) => {
    if (patient.is_hospitalized) {
      acc += 1
    }
    return acc
  }, 0)

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

  const columns = [
    {
      field: 'last_name',
      headerName: 'Nom',
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'first_name',
      headerName: 'Prénom',
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'gender',
      headerName: 'Sexe',
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'phone',
      headerName: 'Téléphone',
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'images',
      headerName: 'Image',
      width: 80,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Avatar
          src={params.value}
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
      renderCell: ({ params }) => (
        <Stack direction={'row'} gap={2} justifyContent="center" alignItems="center">
          <Tooltips
            title="Modifier l'utilisateur"
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
            <IconButton color="primary">
              <FaEdit />
            </IconButton>
          </Tooltips>
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
            <IconButton color="error">
              <FaTrashAlt />
            </IconButton>
          </Tooltips>
        </Stack>
      )
    }
  ]

  const paginationModel = { page: 0, pageSize: 10 }

  const dataRow = patients.map((patient) => ({
    id: patient.id,
    first_name: patient.first_name,
    last_name: patient.last_name,
    gender: patient.gender,
    phone: patient.phone,
    email: patient.email,
    images: patient.images,
    action: patient.id
  }))

  return (
    <Container maxWidth="xl" sx={{ flexGrow: 1, width: '100%' }}>
      <Grid container spacing={2} className={classe.HeaderGridContainer}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }} className={classe.statGridItem}>
          <Typography variant="h6" className={classe.title}>
            Total des patients
          </Typography>
          <Typography variant="p" className={classe.titleContent}>
            {patients.length}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }} className={classe.statGridItem}>
          <Typography variant="h6" className={classe.title}>
            Total des patients Hospitalisé
          </Typography>
          <Typography variant="p" className={classe.titleContent}>
            {totalIsHospitalized}
          </Typography>
        </Grid>
        <Grid
          size={{ xs: 12, sm: 12, md: 6, lg: 4 }}
          className={classe.statGridItem}
          sx={{ textAlign: 'right' }}
        >
          <Button variant="contained" color="primary" startIcon={<FaPlusCircle />}>
            Ajouter un patient
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ marginTop: 20 }}>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          <Card style={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6">Liste des dicteurs</Typography>
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

export default Patients
