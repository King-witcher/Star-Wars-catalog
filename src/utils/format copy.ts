/** Formats a mass.
 * @param amss - The mass in kg.
 */
export function formatMass(mass: string) {
  return mass === 'unknown' ? 'unknown' : `${mass} kg`
}

/** Formats a person's height.
 * @param height - The person's height in centimeters.
 */
export function formatPersonHeight(height: string) {
  return height === 'unknown'
    ? 'unknown'
    : `${(Number(height) / 100).toFixed(2)} m`
}

export function formatPopulation(value: string): string {
  if (value === 'unknown') return 'unknown'

  const population = Number(value)

  if (population < 1_000_000) return population.toLocaleString('en-US')

  if (population < 1_000_000_000) {
    const millions = Math.round(population / 1_000_0) / 100
    return `${millions} mi`
  }

  if (population < 1_000_000_000_000) {
    const billions = Math.round(population / 1_000_000_0) / 100
    return `${billions} bi`
  }

  const trillions = Math.round(population / 1_000_000_000_0) / 100
  return `${trillions} tri`
}

/** Formats a length.
 * @param value - The length in kilometers.
 */
export function formatLength(value: string): string {
  if (value === 'unknown') return 'unknown'

  const diameter = Number(value)
  return `${diameter.toLocaleString('en-US')} km`
}

/** Formats a period of time.
 * @param value - The period in days.
 */
export function formatOrbitalPeriod(value: string): string {
  if (value === 'unknown') return 'unknown'
  const period = Number(value)
  return `${period.toLocaleString('en-US')} days`
}
