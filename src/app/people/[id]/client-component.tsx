'use client'

import { Person } from '@/types/person'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import Typography from '@mui/material/Typography'
import { formatHeight, formatMass } from '../helpers'
import { AttributeRow } from './attribute-row'

interface Props {
  person: Person
  vehicles?: Promise<unknown>
}

export function ClientComponent({ person }: Props) {
  return (
    <div>
      <Typography variant="h2" color="primary">
        {person.name}
      </Typography>
      <div className="flex">
        <div>
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
                  name="Vehicles"
                  value={person.vehicles.join(', ')}
                />
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
      </div>
    </div>
  )
}
