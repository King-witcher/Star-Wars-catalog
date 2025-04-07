import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import '@testing-library/jest-dom/vitest'
import Page from './page'

describe('Home Page', () => {
  it('has correct navigation links', () => {
    const { getByRole } = render(<Page />)

    const peopleLink = getByRole('link', { name: 'People' })
    const planetsLink = getByRole('link', { name: 'Planets' })

    expect(peopleLink).toBeInTheDocument()
    expect(planetsLink).toBeInTheDocument()

    expect(peopleLink).toHaveAttribute('href', '/people')
    expect(planetsLink).toHaveAttribute('href', '/planets')
  })
})
