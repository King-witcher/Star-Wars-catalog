'use client'

import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

export function Navbar() {
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography fontWeight={700} variant="h6">
            Catálogo de Star Wars
          </Typography>
          <div className="flex gap-[10px] ml-[40px]">
            <Button
              color="inherit"
              LinkComponent={Link}
              href="/personagens"
              size="large"
            >
              Personagens
            </Button>
            <Button
              color="inherit"
              LinkComponent={Link}
              href="/planetas"
              size="large"
            >
              Planetas
            </Button>
            <Button
              color="inherit"
              LinkComponent={Link}
              href="/favoritos"
              size="large"
            >
              Favoritos
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      <Toolbar />
    </>
  )
}
