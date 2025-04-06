import { BaseEntity } from './base-entity'

export interface Planet extends BaseEntity {
  name: string
  diameter: string
  rotation_period: string
  orbital_period: string // os caras não conhecem número não é?
  gravity: string
  population: string
  climate: string
  terrain: string
  surface_water: string
  residents: string[]
  films: string[]
}
