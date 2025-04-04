import { Navbar } from './navbar'
import { getByRole, render } from '@testing-library/react'

describe(Navbar, () => {
  let container: HTMLElement
  beforeEach(() => {
    container = render(<Navbar />).container
  })

  it('renders each required button', () => {
    getByRole(container, 'link', { name: 'Personagens' })
    getByRole(container, 'link', { name: 'Planetas' })
    getByRole(container, 'link', { name: 'Favoritos' })
  })
})
