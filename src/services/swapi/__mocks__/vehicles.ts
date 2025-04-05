import vehicle from '@/fixtures/vehicle.json'
import { Vehicle } from '@/types/vehicle'

export async function getVehicle(): Promise<Vehicle> {
  return vehicle as unknown as Vehicle
}
