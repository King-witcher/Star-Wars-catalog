/** Represents a paginated response from SWAPI. */
type SWAPIPaginatedResponse<T> = {
  count: number
  next: string | null
  results: T[]
}
