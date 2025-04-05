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
