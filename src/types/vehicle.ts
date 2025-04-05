import { BaseEntity } from './base-entity'

export interface Vehicle extends BaseEntity {
  cargo_capacity: string
  consumables: string
  cost_in_credits: string
  crew: string
  length: string
  manufacturer: string
  max_atmosphering_speed: string
  model: string
  name: string
  passengers: string
  pilots: string[]
  films: string[]
  vehicle_class: string
}
