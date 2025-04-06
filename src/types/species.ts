import { BaseEntity } from './base-entity'

export interface Species extends BaseEntity {
  average_height: string
  average_lifespan: string
  classification: string
  designation: string
  eye_colors: string
  hair_colors: string
  homeworld: string
  language: string
  name: string
  people: string[]
  films: string[]
  skin_colors: string
}
