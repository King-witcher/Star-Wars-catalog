import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { RootLayout } from './root-layout'

// Mock the Navbar component
vi.mock('../navbar/navbar', () => ({
  Navbar: () => <div data-testid="navbar-mock" />,
}))

describe(RootLayout, () => {
  it('renders the Navbar component', () => {
    const { getByTestId } = render(
      <RootLayout>
        <div />
      </RootLayout>
    )

    expect(getByTestId('navbar-mock')).toBeDefined()
  })

  it('renders children content', () => {
    const { getByTestId } = render(
      <RootLayout>
        <div data-testid="children" />
      </RootLayout>
    )

    expect(getByTestId('children')).toBeDefined()
  })
})
