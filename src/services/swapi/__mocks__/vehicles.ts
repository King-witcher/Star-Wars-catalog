import { Vehicle } from '@/types/vehicle'
import vehicle from '@/fixtures/vehicle.json'

export async function getVehicle(): Promise<Vehicle> {
  return vehicle as unknown as Vehicle
}
