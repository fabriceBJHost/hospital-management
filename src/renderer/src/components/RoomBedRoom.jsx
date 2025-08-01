import { Card, CardContent, Container, Grid, Paper, Typography } from '@mui/material'
import classe from '../assets/css/RoomBedRoom.module.css'
import { Pie } from 'react-chartjs-2'
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'

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
  const stats = [
    { label: 'Total des Chambres', value: 10, color: '#1976d2' },
    { label: 'Disponible', value: 7, color: 'green' },
    { label: 'Maintenance', value: 3, color: 'orange' }
  ]

  const data = {
    labels: ['Vacant', 'Occupé', 'Maintenance'],
    datasets: [
      {
        label: 'Lit',
        data: [20, 15, 5],
        backgroundColor: ['#4caf50', '#f44336', '#ff9800'],
        borderWidth: 1
      }
    ]
  }
  return (
    <Container maxWidth="xl" sx={{ flexGrow: 1, width: '100%' }}>
      <Grid container spacing={2} className={classe.HeaderGridContainer}>
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
      </Grid>
    </Container>
  )
}

export default RoomBedRoom
