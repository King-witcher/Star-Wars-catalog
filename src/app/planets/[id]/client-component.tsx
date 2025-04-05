'use client'

import { AttributesTable } from '@/components/attributes-table/attributes-table'
import { Person } from '@/types/person'
import { Planet } from '@/types/planet'
import {
  formatLength,
  formatOrbitalPeriod,
  formatPopulation,
  formatRotationPeriod,
} from '@/utils/format'
import { CircularProgress } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { useQuery } from '@tanstack/react-query'
import { ResidentRow } from './resident-row'

interface Props {
  planet: Planet
  residents: Promise<Person[]>
}

export function ClientComponent({ planet, residents }: Props) {
  const residentsQuery = useQuery({
    queryKey: ['residents', planet.url],
    queryFn: async () => residents,
  })

  return (
    <div>
      <Typography variant="h2" color="primary">
        {planet.name}
      </Typography>
      <div className="flex gap-[20px]">
        <div className="flex-1">
          <Typography className="!mt-[20px]" variant="h5">
            Attributes
          </Typography>

          <AttributesTable
            className="mt-[20px]"
            attributes={{
              'Rotation Period': formatRotationPeriod(planet.rotation_period),
              'Orbital Period': formatOrbitalPeriod(planet.orbital_period),
              Diameter: formatLength(planet.diameter),
              Gravity: planet.gravity,
              Terrain: planet.terrain,
              'Surface Water':
                planet.surface_water === 'unknown'
                  ? 'unknown'
                  : `${planet.surface_water}%`,
              Population: formatPopulation(planet.population),
              Climate: planet.climate,
            }}
          />
        </div>
        <div className="flex flex-col flex-1 gap-[20px]">
          <Typography className="!mt-[20px]" variant="h5">
            Residents
          </Typography>
          {residentsQuery.isLoading && (
            <div className=" flex items-center justify-center">
              <CircularProgress size="80px" />
            </div>
          )}

          {residentsQuery.data?.length === 0 && (
            <Typography color="textSecondary">
              This planet has no known residents.
            </Typography>
          )}
          {Boolean(residentsQuery.data?.length) && (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Resident</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {residentsQuery.data?.map((resident) => (
                    <ResidentRow key={resident.url} resident={resident} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      </div>
    </div>
  )
}
