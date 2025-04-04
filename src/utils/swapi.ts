export function stripPageNumber(url: string | null) {
  if (!url) return null
  const parsedUrl = new URL(url)
  return Number(parsedUrl.searchParams.get('page'))
}
