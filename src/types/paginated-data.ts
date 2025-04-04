export type PaginatedData<T> = {
  count: number
  next: number | null
  results: T[]
}
