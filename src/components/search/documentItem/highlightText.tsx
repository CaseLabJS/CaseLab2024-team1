export const highlightText = (text: string, query: string) => {
  if (!query) return text
  const regex = new RegExp(`(${query})`, 'gi')
  const parts = text.split(regex)

  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span
        key={index}
        style={{
          borderBottom: '1px solid grey',
        }}
      >
        {part}
      </span>
    ) : (
      part
    )
  )
}
