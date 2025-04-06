'use client'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import type { TableContainerProps } from '@mui/material/TableContainer'
import { ReactNode, useMemo } from 'react'
import { AttributeRow } from './attribute-row'

interface Props extends TableContainerProps {
  attributes: Record<string, ReactNode>
}

export function AttributesTable({ attributes, ...props }: Props) {
  const pairs = useMemo(
    () =>
      Object.entries(attributes).sort((a, b) => {
        // If a and b are both unknown or both known
        if ((a[1] === 'unknown') === (b[1] === 'unknown')) {
          return a[0].localeCompare(b[0])
        }
        return a[1] === 'unknown' ? 1 : -1
      }),
    [attributes]
  )

  return (
    <TableContainer component={Paper} {...props}>
      <Table>
        <TableBody>
          {pairs.map(([key, value]) => (
            <AttributeRow key={key} name={key} value={value} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
