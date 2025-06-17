import { Box, Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import { FaMinus } from 'react-icons/fa'
import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6'

const StatCard = ({ title, value, icon, color = 'primary.main', trend, sx = {} }) => {
  const getTrendIcon = () => {
    if (!trend) return null
    if (trend.isNeutral) return <FaMinus />
    return trend.isPositive ? (
      <FaArrowTrendUp color="success" />
    ) : (
      <FaArrowTrendDown color="error" />
    )
  }

  return (
    <Card
      sx={{
        minWidth: { xs: '100%', sm: 275 },
        height: '100%',
        ...sx
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Typography variant="h6" component="div" color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Box
            sx={{
              backgroundColor: `${color}15`,
              borderRadius: '50%',
              p: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {React.cloneElement(icon, {
              style: { color }
            })}
          </Box>
        </Box>
        <Typography variant="h6" component="div" sx={{ mt: 2, fontWeight: 'medium' }}>
          {value}
        </Typography>

        {trend && (
          <Box display="flex" alignItems="center" mt={1}>
            {getTrendIcon()}
            <Typography
              variant="body2"
              color={
                trend.isNeutral
                  ? 'text.secondary'
                  : trend.isPositive
                    ? 'success.main'
                    : 'error.main'
              }
              sx={{ ml: 0.5 }}
            >
              {trend.value}% {trend.label}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default StatCard
