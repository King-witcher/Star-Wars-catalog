import { BaseEntity } from './base-entity'

export interface Starship extends BaseEntity {
  MGLT: string
  cargo_capacity: string
  consumables: string
  cost_in_credits: string
  crew: string
  hyperdrive_rating: string
  length: string
  manufacturer: string
  max_atmosphering_speed: string
  model: string
  name: string
  passengers: string
  films: string[]
  pilots: string[]
  starship_class: string
}
