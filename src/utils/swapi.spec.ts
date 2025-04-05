import { faker } from '@faker-js/faker'
import { stripId, stripPageNumber } from './swapi'

describe(stripPageNumber, () => {
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

describe(stripId, () => {
  it('gets the id from a url', () => {
    const id = faker.number.int()
    const url = `https://swapi.dev/api/${faker.word.noun()}/${id}/`
    expect(stripId(url)).toBe(id)
  })
})
