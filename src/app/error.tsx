'use client'

import Typography from '@mui/material/Typography'

export default function Loading() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Typography variant="h4" color="error">
        Something went wrong...
      </Typography>
    </div>
  )
}
