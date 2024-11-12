export const buildQueryString = (
  params: Record<string, string | number | boolean>
): string => {
  return Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join('&')
}

export const getQueryStringSeparator = (url: string): string => {
  return url.includes('?') ? '&' : '?'
}
