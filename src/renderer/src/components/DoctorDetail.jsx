import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActionArea,
  Button,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper
} from '@mui/material'
import { FaUserMd, FaEdit, FaEnvelope, FaCalendarAlt } from 'react-icons/fa'

const doctorInfo = {
  name: 'Dr. Emma Dupont',
  specialization: 'Cardiologue',
  email: 'emma.dupont@hopital.com',
  phone: '+33 6 12 34 56 78',
  photo: 'https://via.placeholder.com/120x120.png?text=Doctor',
  stats: {
    patients: 320,
    appointmentsToday: 14,
    surgeries: 5,
    experience: '10 ans'
  },
  activities: [
    { text: 'Consultation terminée avec M. Martin', date: '2025-07-10 10:30' },
    { text: 'Nouveau patient ajouté', date: '2025-07-10 09:15' },
    { text: 'Mise à jour du dossier médical', date: '2025-07-09 17:20' }
  ]
}

const DoctorDetail = () => {
  return (
    <Grid container spacing={2}>
      {/* Doctor Stats */}
      <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }}>
        <Card sx={{ textAlign: 'center', height: '100%' }}>
          <CardContent>
            <FaUserMd size={40} color="#1976d2" />
            <Typography variant="h6" sx={{ mt: 1 }}>
              Patients Suivis
            </Typography>
            <Typography variant="h4" color="primary">
              {doctorInfo.stats.patients}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Doctor Profile */}
      <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }}>
        <Card sx={{ textAlign: 'center', height: '100%' }}>
          <CardActionArea>
            <CardMedia
              component="img"
              image={doctorInfo.photo}
              alt={doctorInfo.name}
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
              <Typography variant="h6">{doctorInfo.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {doctorInfo.specialization}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email: {doctorInfo.email}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Téléphone: {doctorInfo.phone}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      {/* Quick Actions */}
      <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }}>
        <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
          <Typography variant="h6" gutterBottom>
            Actions rapides
          </Typography>
          <Stack spacing={2}>
            <Button variant="contained" color="primary" startIcon={<FaEdit />} fullWidth>
              Modifier le profil
            </Button>
            <Button variant="outlined" color="secondary" startIcon={<FaEnvelope />} fullWidth>
              Envoyer un message
            </Button>
            <Button variant="text" color="success" startIcon={<FaCalendarAlt />} fullWidth>
              Voir le planning
            </Button>
          </Stack>
        </Paper>
      </Grid>

      {/* Recent Activity */}
      <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }}>
        <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
          <Typography variant="h6" gutterBottom>
            Activité récente
          </Typography>
          <List dense>
            {doctorInfo.activities.map((act, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <FaCalendarAlt color="#1976d2" />
                </ListItemIcon>
                <ListItemText primary={act.text} secondary={act.date} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default DoctorDetail
