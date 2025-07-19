import { Box, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        p: 2,
        overflow: 'hidden'
      }}
    >
      <Typography variant="h1" color="primary" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Oups ! La page que vous recherchez n&apos;existe pas.
      </Typography>
      <Typography variant="body1" color="textSecondary" mb={4}>
        Il a peut-être été déplacé ou supprimé.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/dashboard')}>
        Retour sur Accueil
      </Button>
    </Box>
  )
}

export default NotFound
