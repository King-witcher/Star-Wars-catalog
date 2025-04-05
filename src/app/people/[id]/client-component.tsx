'use client'

import { Person } from '@/types/person'
import { Vehicle } from '@/types/vehicle'
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
import { formatHeight, formatMass } from '../helpers'
import { AttributeRow } from './attribute-row'
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
          <TableContainer className="mt-[20px]" component={Paper}>
            <Table>
              <TableBody>
                <AttributeRow name="Gender" value={person.gender} />
                <AttributeRow
                  name="Height"
                  value={formatHeight(person.height)}
                />
                <AttributeRow name="Mass" value={formatMass(person.mass)} />
                <AttributeRow name="Birth Year" value={person.birth_year} />
                <AttributeRow name="Eye Color" value={person.eye_color} />
                <AttributeRow name="Hair Color" value={person.hair_color} />
                <AttributeRow name="Skin Color" value={person.skin_color} />
                <AttributeRow
                  name="Species"
                  value={person.species.join(', ')}
                />
                <AttributeRow
                  name="Starships"
                  value={person.starships.join(', ')}
                />
              </TableBody>
            </Table>
          </TableContainer>
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
