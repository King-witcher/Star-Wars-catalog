import { BaseEntity } from './base-entity'

export interface Film extends BaseEntity {
  title: string
  episode_id: number
  opening_crawl: string
  director: string
  producer: string
  release_date: string
  species: string[]
  starships: string[]
  vehicles: string[]
  characters: string[]
  planets: string[]
  url: string
}
