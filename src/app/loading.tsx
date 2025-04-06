import CircularProgress from '@mui/material/CircularProgress'

export default function Loading() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <CircularProgress size="80px" />
    </div>
  )
}
