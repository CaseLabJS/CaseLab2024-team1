export const fileToBase64 = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader()

    reader.onload = () => {
      const base64String = reader.result as string
      const [header, content] = base64String.split(',')
      const mimeType = header.split(':')[1].split(';')[0]
      const result = `filename:${file.name};data:${mimeType};base64,${content}`
      resolve(result)
    }

    reader.readAsDataURL(file)
  })
}
