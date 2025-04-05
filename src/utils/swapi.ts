export function stripPageNumber(url: string | null) {
  if (!url) return null
  const parsedUrl = new URL(url)
  return Number(parsedUrl.searchParams.get('page'))
}

export function stripId(url: string): number {
  const match = url.match(/^https:\/\/swapi.dev\/api\/[a-z]+\/(\d+)\/$/)
  const id = match?.[1]
  return Number(id)
}
