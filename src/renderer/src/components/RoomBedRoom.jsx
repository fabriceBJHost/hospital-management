import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Stack,
  Typography
} from '@mui/material'
import classe from '../assets/css/RoomBedRoom.module.css'
import { Pie } from 'react-chartjs-2'
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'
import { rooms } from '../rooms_data.js'
import bedRooms from '../bed_rooms_data.json'
import { FaPlusCircle } from 'react-icons/fa'

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
  const disponibles = rooms.reduce(
    (acc, room) => {
      if (room.status === 'disponible') acc.disponible += 1
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
      if (bedRoom.status === 'Vacant') acc.disponible += 1
      else if (bedRoom.status === 'Occupied') acc.occupé += 1
      else acc.maintenance += 1
      return acc
    },
    { disponible: 0, occupé: 0, maintenance: 0 }
  )

  const data = {
    labels: ['Vacant', 'Occupé', 'Maintenance'],
    datasets: [
      {
        label: 'Lit',
        data: [
          bedRoomDisponibility.disponible,
          bedRoomDisponibility.occupé,
          bedRoomDisponibility.maintenance
        ],
        backgroundColor: ['#4caf50', '#f44336', '#ff9800'],
        borderWidth: 1
      }
    ]
  }
  return (
    <Container maxWidth="xl" sx={{ flexGrow: 1, width: '100%' }}>
      <Grid container spacing={2} className={classe.HeaderGridContainer}>
        <Grid size={12} className={classe.statGridItem}>
          <Stack direction={'row'} alignItems="center" justifyContent="space-between">
            <Typography variant="h5" className={classe.title}>
              Gestion des Chambres et Lits
            </Typography>
            <Box gap={1} display="flex" alignItems="center">
              <Button variant="contained" startIcon={<FaPlusCircle />}>
                Chambres
              </Button>
              <Button variant="contained" startIcon={<FaPlusCircle />}>
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
                  {stat.value}
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
