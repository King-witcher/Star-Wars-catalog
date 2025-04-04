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
            SW Catalog
          </Typography>
          <div className="flex gap-[10px] ml-[40px]">
            <Button
              color="inherit"
              LinkComponent={Link}
              href="/people"
              size="large"
            >
              People
            </Button>
            <Button
              color="inherit"
              LinkComponent={Link}
              href="/planets"
              size="large"
            >
              Planets
            </Button>
            <Button
              color="inherit"
              LinkComponent={Link}
              href="/favorites"
              size="large"
            >
              Favorites
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      <Toolbar />
    </>
  )
}
