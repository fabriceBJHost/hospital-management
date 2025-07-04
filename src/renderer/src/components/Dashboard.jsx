// import React, { useEffect, useState } from 'react'
import { Card, CardContent, Typography, Container, Box, Chip } from '@mui/material'
import { Bar, Pie, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js'
import Grid from '@mui/material/Grid'
import { FaFileAlt, FaNotesMedical, FaUserInjured, FaUserMd } from 'react-icons/fa'
import StatCard from './StatCard'
import AppointmentStatusCard from './AppointmentStatutCard'
import classe from '../assets/css/Dashboard.module.css'
import { DataGrid } from '@mui/x-data-grid'
import { frFR } from '@mui/x-data-grid/locales'
import { createTheme, ThemeProvider } from '@mui/material/styles'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
)

const Dashboard = () => {
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

  const appointmentStatusData = {
    labels: ['Scheduled', 'Completed', 'Cancelled'],
    datasets: [
      {
        label: 'Appointment Status',
        data: [50, 25, 10],
        backgroundColor: ['#42a5f5', '#66bb6a', '#ef5350']
      }
    ]
  }

  const patientTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Patients',
        data: [5, 15, 10, 20, 25, 30],
        borderColor: '#42a5f5',
        fill: false
      }
    ]
  }

  const prescriptionData = {
    labels: ['Antibiotics', 'Painkillers', 'Antidepressants', 'Other'],
    datasets: [
      {
        label: 'Prescriptions by Type',
        data: [12, 19, 7, 2],
        backgroundColor: ['#42a5f5', '#66bb6a', '#ffca28', '#ab47bc']
      }
    ]
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 20 },
    {
      field: 'patientName',
      headerName: 'Patient Name',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'doctorName',
      headerName: 'Doctor Name',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'appointmentDate',
      headerName: 'Appointment Date',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      minWidth: 120,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        const statusColors = {
          Scheduled: '#42a5f5',
          Completed: '#66bb6a',
          Cancelled: '#ef5350'
        }
        return (
          <Box>
            <Chip
              label={params.value}
              sx={{
                color: statusColors[params.value] || 'gray',
                fontWeight: 'bold',
                border: `solid 1px ${statusColors[params.value]}`
              }}
              size="small"
              variant="outlined"
            />
          </Box>
        )
      }
    }
  ]

  const dataRow = [
    {
      id: 1,
      patientName: 'John Doe',
      doctorName: 'Dr. Smith',
      appointmentDate: '2023-10-01',
      status: 'Scheduled'
    },
    {
      id: 2,
      patientName: 'Jane Doe',
      doctorName: 'Dr. Johnson',
      appointmentDate: '2023-10-02',
      status: 'Completed'
    },
    {
      id: 3,
      patientName: 'Alice Smith',
      doctorName: 'Dr. Brown',
      appointmentDate: '2023-10-03',
      status: 'Cancelled'
    },
    {
      id: 4,
      patientName: 'Bob Johnson',
      doctorName: 'Dr. White',
      appointmentDate: '2023-10-04',
      status: 'Scheduled'
    },
    {
      id: 5,
      patientName: 'Charlie Brown',
      doctorName: 'Dr. Green',
      appointmentDate: '2023-10-05',
      status: 'Completed'
    },
    {
      id: 6,
      patientName: 'David Wilson',
      doctorName: 'Dr. Black',
      appointmentDate: '2023-10-06',
      status: 'Scheduled'
    },
    {
      id: 7,
      patientName: 'Eva Adams',
      doctorName: 'Dr. Blue',
      appointmentDate: '2023-10-07',
      status: 'Cancelled'
    },
    {
      id: 8,
      patientName: 'Frank Miller',
      doctorName: 'Dr. Red',
      appointmentDate: '2023-10-08',
      status: 'Scheduled'
    },
    {
      id: 9,
      patientName: 'Grace Lee',
      doctorName: 'Dr. Yellow',
      appointmentDate: '2023-10-09',
      status: 'Completed'
    },
    {
      id: 10,
      patientName: 'Hank Taylor',
      doctorName: 'Dr. Purple',
      appointmentDate: '2023-10-10',
      status: 'Scheduled'
    }
  ]

  const paginationModel = { page: 0, pageSize: 5 }

  return (
    <>
      <Container maxWidth="xl" sx={{ flexGrow: 1, width: '100%' }}>
        <Grid container spacing={1} className={classe.statGridContainer}>
          {/* patient statistique */}
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }} className={classe.statGridItem}>
            <StatCard
              title="Patients"
              value={120}
              icon={<FaUserInjured size={24} />}
              color="#1976d2"
              trend={{ value: 12, isPositive: true, label: 'ce mois ci' }}
            />
          </Grid>

          {/* docteur statistique */}
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }} className={classe.statGridItem}>
            <StatCard title="Docteur" value={15} icon={<FaUserMd size={24} />} color="#00acc1" />
          </Grid>

          {/* dossier medical */}
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }} className={classe.statGridItem}>
            <StatCard
              title="Dossier Médical"
              value={60}
              icon={<FaFileAlt size={24} />}
              color="#43a047"
              trend={{ value: 5, isPositive: true, label: 'cette semaine' }}
            />
          </Grid>

          {/* prescriptions */}
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }} className={classe.statGridItem}>
            <StatCard
              title="Prescriptions"
              value={40}
              icon={<FaNotesMedical size={24} />}
              color="#e53935"
              trend={{ value: 3, isNeutral: true, label: 'from last week' }}
            />
          </Grid>

          {/* rendezvous statistique */}
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }} className={classe.statGridItem}>
            <AppointmentStatusCard total={85} cancelled={10} completed={25} scheduled={50} />
          </Grid>
        </Grid>

        <Grid container spacing={2} style={{ marginTop: 20 }}>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6">Prescriptions par Categorie</Typography>
                <Bar data={prescriptionData} />
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6">Nouvelles tendances des patients</Typography>
                <Line data={patientTrendData} />
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 7 }}>
            <Card style={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6">Les 10 dernier rendez vous</Typography>
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

          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 5 }}>
            <Card style={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6">Status des rendez vous</Typography>
                <div className={classe.pieChartContainer}>
                  <Pie data={appointmentStatusData} />
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Dashboard
