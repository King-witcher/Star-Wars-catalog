import { Vehicle } from '@/types/vehicle'
import { api } from './api'

export async function getVehicle(id: number): Promise<Vehicle> {
  const { data } = await api.get<Vehicle>(`/vehicles/${id}`)
  return data
}
