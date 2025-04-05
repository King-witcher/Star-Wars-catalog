import { BaseEntity } from './base-entity'

export interface Planet extends BaseEntity {
  climate: string
  diameter: string
  gravity: string
  name: string
  orbital_period: string // os caras não conhecem número não é?
  population: string
  residents: string[]
  rotation_period: string
  surface_water: string
  terrain: string
}
