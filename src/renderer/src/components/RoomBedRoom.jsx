import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
  CircularProgress,
  Alert
} from '@mui/material'
import classe from '../assets/css/RoomBedRoom.module.css'
import { Pie } from 'react-chartjs-2'
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'
import { FaPlusCircle } from 'react-icons/fa'
import { useQuery } from '@tanstack/react-query'
import { getAllBedRoom, getAllRoom } from '../function/Request.js'
import AddRooms from './Modals/AddRooms.jsx'
import { useState } from 'react'
import RoomToast from './Modals/RoomToast.jsx'
import AddBedRoom from './Modals/AddBedRoom.jsx'

Chart.register(ArcElement, Tooltip, Legend)

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right', // or 'bottom'
      align: 'center',
      labels: {
        boxWidth: 20,
        padding: 10
      }
    }
  }
}

const RoomBedRoom = () => {
  const {
    data: rooms = [],
    isPending: isRoomsPending,
    isError: isRoomsError,
    error: roomsError
  } = useQuery({
    queryKey: ['Rooms'],
    queryFn: getAllRoom
  })

  const {
    data: bedRooms = [],
    isPending: isBedRoomsPending,
    isError: isBedRoomsError,
    error: BedroomsError
  } = useQuery({
    queryKey: ['BedRooms'],
    queryFn: getAllBedRoom
  })

  const disponibles = rooms.reduce(
    (acc, room) => {
      if (room.status.toLowerCase() === 'disponible') acc.disponible += 1
      else acc.maintenance += 1
      return acc
    },
    { disponible: 0, maintenance: 0 }
  )

  const stats = [
    { label: 'Total des Chambres', value: rooms.length, color: '#1976d2' },
    { label: 'Disponible', value: disponibles.disponible, color: 'green' },
    { label: 'Maintenance', value: disponibles.maintenance, color: 'orange' }
  ]

  const bedRoomDisponibility = bedRooms.reduce(
    (acc, bedRoom) => {
      if (bedRoom.status === 'Disponible') acc.disponible += 1
      else if (bedRoom.status === 'Occupé') acc.occupe += 1
      else acc.maintenance += 1
      return acc
    },
    { disponible: 0, occupe: 0, maintenance: 0 }
  )

  const data = {
    labels: ['Disponible', 'Occupé', 'Maintenance'],
    datasets: [
      {
        label: 'Lit',
        data: [
          bedRoomDisponibility.disponible,
          bedRoomDisponibility.occupe,
          bedRoomDisponibility.maintenance
        ],
        backgroundColor: ['#4caf50', '#f44336', '#ff9800'],
        borderWidth: 1
      }
    ]
  }

  const [openAddRoom, setOpenAddRoom] = useState(false)
  const handleOpenAddRoom = () => setOpenAddRoom(true)
  const handleCloseAddRoom = () => setOpenAddRoom(false)

  /**
   * open the modal and toest on add
   */
  const [openModalAdd, setOpenModalAdd] = useState(false)
  const handleOpenModalAdd = () => setOpenModalAdd(true)
  const handleCloseModalAdd = () => setOpenModalAdd(false)

  const [openModalAddError, setOpenModalAddError] = useState(false)
  const handleOpenModalAddError = () => setOpenModalAddError(true)
  const handleCloseModalAddError = () => setOpenModalAddError(false)

  const [openAddBedRooms, setOpenAddBedRooms] = useState(false)
  const handleCloseAddBedRoom = () => setOpenAddBedRooms(false)
  const handleOpenAddBedRoom = () => setOpenAddBedRooms(true)

  const [openMessageBedroomAdd, setOpenMessageBedRoomAdd] = useState(false)
  const handleCloseMessageBedRoomAdd = () => setOpenMessageBedRoomAdd(false)
  const handleOpenMessageBedRoomAdd = () => setOpenMessageBedRoomAdd(true)

  return (
    <Container maxWidth="xl" sx={{ flexGrow: 1, width: '100%' }}>
      <AddRooms
        handleClose={handleCloseAddRoom}
        open={openAddRoom}
        setOpenSnack={handleOpenModalAdd}
        setOpenSnackError={handleOpenModalAddError}
      />
      <AddBedRoom
        handleClose={handleCloseAddBedRoom}
        open={openAddBedRooms}
        setOpenSnack={handleOpenMessageBedRoomAdd}
        setOpenSnackError={handleOpenModalAddError}
      />
      <RoomToast
        handleCloseSnackbarAdd={handleCloseModalAdd}
        openSnackbarAdd={openModalAdd}
        handleCloseSnackbarAddError={handleCloseModalAddError}
        openSnackbarAddError={openModalAddError}
        handleCloseMessageBedRoomAdd={handleCloseMessageBedRoomAdd}
        openMessageBedroomAdd={openMessageBedroomAdd}
      />
      <Grid container spacing={2} className={classe.HeaderGridContainer}>
        <Grid size={12} className={classe.statGridItem}>
          <Stack direction={'row'} alignItems="center" justifyContent="space-between">
            <Typography variant="h5" className={classe.title}>
              Gestion des Chambres et Lits
            </Typography>
            <Box gap={1} display="flex" alignItems="center">
              <Button variant="contained" startIcon={<FaPlusCircle />} onClick={handleOpenAddRoom}>
                Chambres
              </Button>
              <Button
                variant="contained"
                startIcon={<FaPlusCircle />}
                onClick={handleOpenAddBedRoom}
              >
                Lits
              </Button>
            </Box>
          </Stack>
        </Grid>
        {stats.map((stat) => (
          <Grid
            size={{ xs: 12, sm: 12, md: 6, lg: 4 }}
            key={stat.label}
            className={classe.statGridItem}
          >
            <Card sx={{ borderLeft: `5px solid ${stat.color}` }}>
              <CardContent>
                <Typography variant="h6">{stat.label}</Typography>
                <Typography variant="h4" color={stat.color}>
                  {isRoomsPending ? (
                    <CircularProgress size={24} />
                  ) : isRoomsError ? (
                    <Alert severity="error">{roomsError.message}</Alert>
                  ) : (
                    stat.value
                  )}
                  {/* {stat.value} */}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }} className={classe.statGridItem}>
          <Paper elevation={3}>
            <div
              style={{
                width: '100%',
                height: '250px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                // border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '10px'
              }}
            >
              <Pie data={data} options={options} />
            </div>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 8 }} className={classe.statGridItem}>
          <Card>
            <CardContent>
              {/* <Typography variant="h6">{stat.label}</Typography>
              <Typography variant="h4" color={stat.color}>
                {stat.value}
              </Typography> */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default RoomBedRoom
