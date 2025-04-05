'use client'

import { AttributesTable } from '@/components/attributes-table/attributes-table'
import { Person } from '@/types/person'
import { Vehicle } from '@/types/vehicle'
import { formatMass, formatPersonHeight } from '@/utils/format'
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
import { VehicleRow } from './vehicle-row'

interface Props {
  person: Person
  vehicles: Promise<Vehicle[]>
}

export function ClientComponent({ person, vehicles }: Props) {
  const vehiclesQuery = useQuery({
    queryKey: ['vehicles', person.url],
    queryFn: async () => vehicles,
  })

  return (
    <div>
      <Typography variant="h2" color="primary">
        {person.name}
      </Typography>
      <div className="flex gap-[20px]">
        <div className="flex-1">
          <Typography className="!mt-[20px]" variant="h5">
            Attributes
          </Typography>
          <AttributesTable
            className="mt-[20px]"
            attributes={{
              Gender: person.gender,
              Mass: formatMass(person.mass),
              'Birth Year': person.birth_year,
              'Eye Color': person.eye_color,
              'Hair Color': person.hair_color,
              'Skin Color': person.skin_color,
              Height: formatPersonHeight(person.height),
              // Homeworld?
              // Starships?
              // Films?
              // Species?
            }}
          />
        </div>
        <div className="flex flex-col flex-1 gap-[20px]">
          <Typography className="!mt-[20px]" variant="h5">
            Vehicles
          </Typography>
          {vehiclesQuery.isLoading && (
            <div className=" flex items-center justify-center">
              <CircularProgress size="80px" />
            </div>
          )}

          {vehiclesQuery.data?.length === 0 && (
            <Typography color="textSecondary">
              No vehicles found for this character.
            </Typography>
          )}
          {Boolean(vehiclesQuery.data?.length) && (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Vehicle</TableCell>
                    <TableCell>Model</TableCell>
                    <TableCell align="right">Manufacturer</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {vehiclesQuery.data?.map((vehicle) => (
                    <VehicleRow key={vehicle.url} vehicle={vehicle} />
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
