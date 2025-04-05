export function formatMass(mass: string) {
  return mass === 'unknown' ? 'unknown' : `${mass} kg`
}

export function formatHeight(height: string) {
  return height === 'unknown'
    ? 'unknown'
    : `${(Number(height) / 100).toFixed(2)} m`
}
