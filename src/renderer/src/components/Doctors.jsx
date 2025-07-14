import {
  Box,
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
  IconButton
} from '@mui/material'
import classe from '../assets/css/Doctor.module.css'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { useState } from 'react'
import { frFR } from '@mui/x-data-grid/locales'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { DataGrid } from '@mui/x-data-grid'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

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

  const doctors = [
    {
      id: 1,
      first_name: 'Alice',
      last_name: 'Dupont',
      images: 'alice.jpg',
      specialization: 'Cardiologist',
      phone: '0341234567',
      email: 'alice.dupont@example.com',
      created_at: '2025-07-14 09:00:00',
      updated_at: '2025-07-14 09:00:00'
    },
    {
      id: 2,
      first_name: 'Jean',
      last_name: 'Durand',
      images: 'jean.jpg',
      specialization: 'Cardiologist',
      phone: '0341234568',
      email: 'jean.durand@example.com',
      created_at: '2025-07-14 09:10:00',
      updated_at: '2025-07-14 09:10:00'
    },
    {
      id: 3,
      first_name: 'Claire',
      last_name: 'Moreau',
      images: 'claire.jpg',
      specialization: 'Neurologist',
      phone: '0341234569',
      email: 'claire.moreau@example.com',
      created_at: '2025-07-14 09:20:00',
      updated_at: '2025-07-14 09:20:00'
    },
    {
      id: 4,
      first_name: 'Luc',
      last_name: 'Bernard',
      images: 'luc.jpg',
      specialization: 'Neurologist',
      phone: '0341234570',
      email: 'luc.bernard@example.com',
      created_at: '2025-07-14 09:30:00',
      updated_at: '2025-07-14 09:30:00'
    },
    {
      id: 5,
      first_name: 'Sophie',
      last_name: 'Petit',
      images: 'sophie.jpg',
      specialization: 'Psychiatrist',
      phone: '0341234571',
      email: 'sophie.petit@example.com',
      created_at: '2025-07-14 09:40:00',
      updated_at: '2025-07-14 09:40:00'
    },
    {
      id: 6,
      first_name: 'Thomas',
      last_name: 'Robert',
      images: 'thomas.jpg',
      specialization: 'Radiologist',
      phone: '0341234572',
      email: 'thomas.robert@example.com',
      created_at: '2025-07-14 09:50:00',
      updated_at: '2025-07-14 09:50:00'
    },
    {
      id: 7,
      first_name: 'Emma',
      last_name: 'Roux',
      images: 'emma.jpg',
      specialization: 'Gynecologist',
      phone: '0341234573',
      email: 'emma.roux@example.com',
      created_at: '2025-07-14 10:00:00',
      updated_at: '2025-07-14 10:00:00'
    },
    {
      id: 8,
      first_name: 'Hugo',
      last_name: 'Lemoine',
      images: 'hugo.jpg',
      specialization: 'Psychiatrist',
      phone: '0341234574',
      email: 'hugo.lemoine@example.com',
      created_at: '2025-07-14 10:10:00',
      updated_at: '2025-07-14 10:10:00'
    },
    {
      id: 9,
      first_name: 'Camille',
      last_name: 'Faure',
      images: 'camille.jpg',
      specialization: 'Endocrinologist',
      phone: '0341234575',
      email: 'camille.faure@example.com',
      created_at: '2025-07-14 10:20:00',
      updated_at: '2025-07-14 10:20:00'
    },
    {
      id: 10,
      first_name: 'Louis',
      last_name: 'Garnier',
      images: 'louis.jpg',
      specialization: 'Orthopedic Surgeon',
      phone: '0341234576',
      email: 'louis.garnier@example.com',
      created_at: '2025-07-14 10:30:00',
      updated_at: '2025-07-14 10:30:00'
    },
    {
      id: 11,
      first_name: 'Julie',
      last_name: 'Martinez',
      images: 'julie.jpg',
      specialization: 'Nephrologist',
      phone: '0341234577',
      email: 'julie.martinez@example.com',
      created_at: '2025-07-14 10:40:00',
      updated_at: '2025-07-14 10:40:00'
    },
    {
      id: 12,
      first_name: 'Mathieu',
      last_name: 'Girard',
      images: 'mathieu.jpg',
      specialization: 'Nephrologist',
      phone: '0341234578',
      email: 'mathieu.girard@example.com',
      created_at: '2025-07-14 10:50:00',
      updated_at: '2025-07-14 10:50:00'
    },
    {
      id: 13,
      first_name: 'Laura',
      last_name: 'Blanc',
      images: 'laura.jpg',
      specialization: 'Ophthalmologist',
      phone: '0341234579',
      email: 'laura.blanc@example.com',
      created_at: '2025-07-14 11:00:00',
      updated_at: '2025-07-14 11:00:00'
    },
    {
      id: 14,
      first_name: 'Nicolas',
      last_name: 'Fontaine',
      images: 'nicolas.jpg',
      specialization: 'Urologist',
      phone: '0341234580',
      email: 'nicolas.fontaine@example.com',
      created_at: '2025-07-14 11:10:00',
      updated_at: '2025-07-14 11:10:00'
    },
    {
      id: 15,
      first_name: 'Marine',
      last_name: 'Perrot',
      images: 'marine.jpg',
      specialization: 'Hematologist',
      phone: '0341234581',
      email: 'marine.perrot@example.com',
      created_at: '2025-07-14 11:20:00',
      updated_at: '2025-07-14 11:20:00'
    }
  ]

  const workingDays = [
    { id: 1, working_date: '2025-07-14', doctor_id: 1 },
    { id: 2, working_date: '2025-07-14', doctor_id: 2 },
    { id: 3, working_date: '2025-07-15', doctor_id: 3 },
    { id: 4, working_date: '2025-07-15', doctor_id: 4 },
    { id: 5, working_date: '2025-07-16', doctor_id: 5 },
    { id: 6, working_date: '2025-07-16', doctor_id: 6 },
    { id: 7, working_date: '2025-07-17', doctor_id: 7 },
    { id: 8, working_date: '2025-07-17', doctor_id: 8 },
    { id: 9, working_date: '2025-07-18', doctor_id: 9 },
    { id: 10, working_date: '2025-07-18', doctor_id: 10 },
    { id: 11, working_date: '2025-07-19', doctor_id: 11 },
    { id: 12, working_date: '2025-07-19', doctor_id: 12 },
    { id: 13, working_date: '2025-07-20', doctor_id: 13 },
    { id: 14, working_date: '2025-07-20', doctor_id: 14 },
    { id: 15, working_date: '2025-07-21', doctor_id: 15 }
  ]

  /**
   * * Group doctors by specialization
   */
  const groupedDoctors = doctors.reduce((acc, doctor) => {
    acc[doctor.specialization] = (acc[doctor.specialization] || 0) + 1
    return acc
  }, {})

  // * Prepare data for the chart
  const labels = Object.keys(groupedDoctors)
  const data = Object.values(groupedDoctors)

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Number of Doctors',
        data,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#66BB6A',
          '#EC407A',
          '#26C6DA',
          '#7E57C2'
        ]
      }
    ]
  }

  const [selectedDate, setSelectedDate] = useState(null)
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
      renderCell: ({ params }) => (
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
    images: doc.images
  }))

  return (
    <Container maxWidth="xl" sx={{ flexGrow: 1, width: '100%' }}>
      <Grid container spacing={2} className={classe.HeaderGridContainer}>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 6 }} className={classe.statGridItem}>
          <Box>
            <Grid>
              <Bar data={chartData} />
            </Grid>
            <Grid>
              <Typography variant="h6" className={classe.title}>
                Statistique des docteurs
              </Typography>
            </Grid>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 6 }} className={classe.statGridItem}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <DateCalendar
                onChange={handleDateChange}
                sx={{ border: 'solid 1px #56aaff', borderRadius: 3 }}
              />
              <div>
                <Typography variant="h6">
                  Doctors working on:{' '}
                  {selectedDate ? dayjs(selectedDate).format('YYYY-MM-DD') : 'Select a date'}
                </Typography>
                {doctorsOnDate.length > 0 ? (
                  <List>
                    {doctorsOnDate.map((doc) => (
                      <ListItem key={doc.id}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Avatar src={doc.images} alt={doc.first_name} />
                          <div>
                            <Typography>
                              <strong>
                                {doc.first_name} {doc.last_name}
                              </strong>
                            </Typography>
                            <Typography variant="body2">{doc.specialization}</Typography>
                            <Typography variant="body2">{doc.phone}</Typography>
                            <Typography variant="body2">{doc.email}</Typography>
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

export default Doctors
