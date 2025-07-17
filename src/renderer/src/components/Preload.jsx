import CircularProgress from '@mui/material/CircularProgress'

const Preload = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.8)',
        zIndex: 9999
      }}
    >
      <CircularProgress size={80} />
    </div>
  )
}

export default Preload
