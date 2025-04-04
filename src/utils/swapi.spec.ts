import { faker } from '@faker-js/faker'
import { stripPageNumber } from './swapi'

describe('swapi utils', () => {
  it('gets the page param from a url', () => {
    const page = faker.number.int()
    const url = `https://swapi.dev/api/people/?page=${page}`
    const pageParam = stripPageNumber(url)
    expect(pageParam).toBe(page)
  })

  it('returns null when the url is null', () => {
    const pageParam = stripPageNumber(null)
    expect(pageParam).toBeNull()
  })
})
