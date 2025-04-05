import { BaseEntity } from './base-entity'

export interface Person extends BaseEntity {
  name: string
  height: string | 'unknown'
  mass: string
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: 'male' | 'female' | 'n/a' | 'hermaphrodite' | 'none'
  homeworld: string
  filmes: string[]
  species: string[]
  vehicles: string[]
  starships: string[]
}
