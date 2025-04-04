import { getByRole, render } from '@testing-library/react'
import { Navbar } from './navbar'

describe(Navbar, () => {
  let container: HTMLElement
  beforeEach(() => {
    container = render(<Navbar />).container
  })

  it('renders each required button', () => {
    getByRole(container, 'link', { name: 'People' })
    getByRole(container, 'link', { name: 'Planets' })
    getByRole(container, 'link', { name: 'Favorites' })
  })
})
