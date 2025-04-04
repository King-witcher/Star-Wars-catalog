import { Person } from '@/types/person'
import { PersonRow } from './row'
import person_ from '@/fixtures/person.json'
import { getByTestId, getByText, render } from '@testing-library/react'
import { faker } from '@faker-js/faker'

const person = person_ as unknown as Person

describe(PersonRow, () => {
  it("should render the person's name", () => {
    const { container } = render(<PersonRow person={person} />)
    getByText(container, person.name)
  })

  it("should render the person's gender", () => {
    const { container } = render(<PersonRow person={person} />)
    getByText(container, person.gender)
  })

  it("should render the person's hair color", () => {
    const { container } = render(<PersonRow person={person} />)
    getByText(container, person.hair_color)
  })

  it("should render the person's gender", () => {
    const { container } = render(<PersonRow person={person} />)
    getByText(container, person.gender)
  })

  it("should render the person's eye color", () => {
    const { container } = render(<PersonRow person={person} />)

    getByText(container, person.eye_color)
  })

  it("should render the person's height with two decimal chars", () => {
    const height = '190'
    const mutated = { ...person, height }

    const { container } = render(<PersonRow person={mutated} />)
    getByText(container, '1.90 m')
  })

  it('should render unknown when the height is unknown', () => {
    const height = 'unknown'
    const mutated = { ...person, height }

    const { container } = render(<PersonRow person={mutated} />)
    const row = getByTestId(container, 'height')
    expect(row.innerHTML).toBe('unknown')
  })

  it("should render the person's mass", () => {
    const mass = '123'
    const mutated = { ...person, mass }

    const { container } = render(<PersonRow person={mutated} />)
    getByText(container, '123 kg')
  })

  it('should render unknown when the mass is unknown', () => {
    const mass = 'unknown'
    const mutated = { ...person, mass }

    const { container } = render(<PersonRow person={mutated} />)
    const row = getByTestId(container, 'mass')
    expect(row.innerHTML).toBe('unknown')
  })
})
