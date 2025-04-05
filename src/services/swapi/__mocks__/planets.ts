import _planet from '@/fixtures/planet.json'
import { Planet } from '@/types/planet'
const planet = _planet as unknown as Planet

export async function getPlanets(): Promise<Planet[]> {
  return []
}

export async function getPlanet(): Promise<Planet> {
  return planet
}
