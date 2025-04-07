import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

export default function Page() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Typography variant="h3" color="primary">
        Explore the Star Wars Catalog!
      </Typography>
      <Typography variant="body2" color="primary">
        By Giuseppe Lanna
      </Typography>
      <ButtonGroup size="large" variant="contained" className="mt-[40px]">
        <Button LinkComponent={Link} href="/people">
          People
        </Button>
        <Button LinkComponent={Link} href="/planets">
          Planets
        </Button>
      </ButtonGroup>
    </div>
  )
}
