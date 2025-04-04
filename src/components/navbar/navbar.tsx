'use client'

import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

export function Navbar() {
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography fontWeight={700} variant="h6">
            Catálogo de Star Wars
          </Typography>
          <div className="flex gap-[10px] ml-[40px]">
            <Button color="inherit" size="large">
              Personagens
            </Button>
            <Button color="inherit" size="large">
              Planetas
            </Button>
            <Button color="inherit" size="large">
              Favoritos
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      <Toolbar />
    </>
  )
}
