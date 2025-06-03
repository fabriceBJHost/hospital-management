import { Typography } from '@mui/material'
import React from 'react'
import classe from '../../assets/css/HeaderTitle.module.css'

const HeaderTitle = ({ title }) => {
  return (
    <Typography variant="h4" gutterBottom className={classe.title}>
      {title}
    </Typography>
  )
}

export default HeaderTitle
