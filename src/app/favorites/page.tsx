'use client'

import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { FavoritesTable } from './favorites-table'

export default function Page() {
  const [tabIndex, setTabIndex] = useState(0)

  return (
    <div className="h-full">
      <Tabs
        value={tabIndex}
        onChange={(_, value) => setTabIndex(value)}
        aria-label="basic tabs example"
      >
        <Tab label="Characters " />
        <Tab label="Planets" />
      </Tabs>
      <div className="flex flex-col sm:flex-row gap-[20px]">
        <div className="flex-1 flex flex-col">
          <Typography variant="h3">
            Favorite {tabIndex === 0 ? 'characters' : 'planets'}
          </Typography>
          <FavoritesTable collection={tabIndex === 0 ? 'people' : 'planets'} />
        </div>
      </div>
    </div>
  )
}
