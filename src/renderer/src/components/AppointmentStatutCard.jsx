import React from 'react'
import { Card, CardContent, Typography, Box, Chip, Grid } from '@mui/material'
import { FaCalendar } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'

const AppointmentStatusCard = ({ total, scheduled, completed, cancelled }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Scheduled':
        return 'warning'
      case 'Completed':
        return 'success'
      case 'Cancelled':
        return 'error'
      default:
        return 'default'
    }
  }

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Typography variant="h6" component="div" color="text.secondary" gutterBottom>
            Appointments
          </Typography>
          <Box
            sx={{
              backgroundColor: 'primary.light',
              opacity: 0.2,
              borderRadius: '50%',
              p: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <FaLocationDot style={{ color: 'rgb(123, 0, 255)' }} />
          </Box>
        </Box>

        <Typography variant="h6" component="div" sx={{ mt: 1, mb: 2, fontWeight: 'medium' }}>
          {total}
        </Typography>

        <Grid container spacing={1}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Chip
              label={`${scheduled} Scheduled`}
              color="warning"
              size="small"
              sx={{
                width: '100%',
                fontSize: 11,
                '& .MuiChip-label': {
                  fontWeight: 500
                }
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Chip
              label={`${completed} Completed`}
              color="success"
              size="small"
              sx={{
                width: '100%',
                fontSize: 11,
                '& .MuiChip-label': {
                  fontWeight: 500
                }
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Chip
              label={`${cancelled} Cancelled`}
              color="error"
              size="small"
              sx={{
                width: '100%',
                fontSize: 11,
                '& .MuiChip-label': {
                  fontWeight: 500
                }
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default AppointmentStatusCard
