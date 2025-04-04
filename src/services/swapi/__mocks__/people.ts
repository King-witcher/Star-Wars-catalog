import people from '@/fixtures/people.json'
import person from '@/fixtures/person.json'
import { PaginatedData } from '@/types/paginated-data'
import { Person } from '@/types/person'

export async function getPeople(): Promise<PaginatedData<Person>> {
  return {
    count: 82,
    next: null,
    results: people as unknown as Person[],
  }
}

export async function getPerson(): Promise<Person> {
  return person as unknown as Person
}
