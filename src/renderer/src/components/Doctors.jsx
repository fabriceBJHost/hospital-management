import {
  Container,
  Grid,
  Typography,
  List,
  Avatar,
  ListItem,
  Stack,
  Card,
  CardContent,
  Tooltip as Tooltips,
  IconButton,
  Button,
  CircularProgress,
  Box,
  Alert
} from '@mui/material'
import classe from '../assets/css/Doctor.module.css'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { frFR } from '@mui/x-data-grid/locales'
import { frFR as frFRDate } from '@mui/x-date-pickers/locales'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { DataGrid } from '@mui/x-data-grid'
import { FaCalendarAlt, FaEdit, FaPlusCircle, FaTrashAlt } from 'react-icons/fa'
import 'dayjs/locale/fr'
import { useQuery } from '@tanstack/react-query'
import { getAllDoctors, getWorkingDate } from '../function/Request'
import AddDoctorsModal from './Modals/AddDoctorsModal'
dayjs.locale('fr')

const Doctors = () => {
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

  const {
    data: doctors = [],
    isPending,
    isError,
    error
  } = useQuery({
    queryKey: ['Doctors'],
    queryFn: getAllDoctors
  })

  const { data: workingDays = [] } = useQuery({
    queryKey: ['WorkingDay'],
    queryFn: getWorkingDate
  })

  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [doctorsOnDate, setDoctorsOnDate] = useState([])

  const handleDateChange = (date) => {
    setSelectedDate(date)

    const formattedDate = dayjs(date).format('YYYY-MM-DD')

    const doctorIds = workingDays
      .filter((wd) => wd.working_date === formattedDate)
      .map((wd) => wd.doctor_id)

    const doctorsWorking = doctors.filter((doc) => doctorIds.includes(doc.id))

    setDoctorsOnDate(doctorsWorking)
  }

  useEffect(() => {
    handleDateChange(selectedDate)
  }, [])

  const columns = [
    {
      field: 'last_name',
      headerName: 'Nom',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'first_name',
      headerName: 'Prénom',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'specialization',
      headerName: 'Spécialization',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'phone',
      headerName: 'Téléphone',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'email',
      headerName: 'Email',
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
      renderCell: (params) => (
        <Stack direction={'row'} gap={2} justifyContent="center" alignItems="center">
          <Tooltips
            title="Modifier le docteur"
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
            title="Supprimer le docteur"
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

  const dataRow = doctors.map((doc) => ({
    id: doc.id,
    first_name: doc.first_name,
    last_name: doc.last_name,
    specialization: doc.specialization,
    phone: doc.phone,
    email: doc.email,
    images: doc.images,
    action: doc.id
  }))

  const [openModalAdd, setOpenModalAdd] = useState(false)
  const handleOpenModalAdd = () => setOpenModalAdd(true)
  const handleCloseModalAdd = () => setOpenModalAdd(false)

  return (
    <Container maxWidth="xl" sx={{ flexGrow: 1, width: '100%' }}>
      <AddDoctorsModal handleClose={handleCloseModalAdd} open={openModalAdd} />
      <Grid container spacing={2} className={classe.HeaderGridContainer}>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 8 }} className={classe.statGridItem}>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="fr"
            localeText={frFRDate.components.MuiLocalizationProvider.defaultProps.localeText}
          >
            <div style={{ display: 'flex', gap: '2rem' }}>
              <DateCalendar
                onChange={handleDateChange}
                sx={{ border: 'solid 1px #56aaff', borderRadius: 3 }}
              />
              <div className={classe.doctorList}>
                <Typography variant="h6">
                  Les médecins travaillant le:{' '}
                  {selectedDate ? dayjs(selectedDate).format('YYYY-MM-DD') : 'Select a date'}
                </Typography>
                {doctorsOnDate.length > 0 ? (
                  <List>
                    {doctorsOnDate.map((doc) => (
                      <ListItem key={doc.id}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Avatar src={doc.images} alt={doc.first_name} />
                          <div>
                            <Typography variant="subtitle2" fontWeight="bold">
                              {doc.first_name} {doc.last_name}
                            </Typography>
                            <br />
                            <Typography variant="caption">{doc.specialization}</Typography>
                            <br />
                            <Typography variant="caption">{doc.phone}</Typography>
                            <br />
                            <Typography
                              variant="caption"
                              sx={{
                                whiteSpace: 'normal',
                                wordBreak: 'break-all',
                                maxWidth: '200px' // adjust as needed
                              }}
                            >
                              {doc.email}
                            </Typography>
                          </div>
                        </Stack>
                      </ListItem>
                    ))}
                  </List>
                ) : selectedDate ? (
                  <Typography>No doctors scheduled on this day.</Typography>
                ) : null}
              </div>
            </div>
          </LocalizationProvider>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }} className={classe.statGridItem}>
          <Typography variant="h6" gutterBottom>
            Actions rapides
          </Typography>
          <Stack spacing={2}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<FaPlusCircle />}
              fullWidth
              onClick={handleOpenModalAdd}
            >
              Ajouter un Médecin
            </Button>
            <Button variant="outlined" color="primary" startIcon={<FaCalendarAlt />} fullWidth>
              Ajouter un Planning
            </Button>
          </Stack>
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

export default Doctors
