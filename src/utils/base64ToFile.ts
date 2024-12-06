export const base64ToFile = (base64: string | null) => {
  if (!base64) return
  const [header, content] = base64.split(',')

  const filenameMatch = header.match(/filename:([^;]+)/)
  const mimeTypeMatch = header.match(/data:([^;]+)/)

  const byteCharacters = atob(content)
  const byteNumbers = new Array(byteCharacters.length)

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }

  const byteArray = new Uint8Array(byteNumbers)

  if (mimeTypeMatch && filenameMatch) {
    return new File([byteArray], filenameMatch[1], {
      type: mimeTypeMatch[1],
    })
  }
}
