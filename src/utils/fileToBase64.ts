export const fileToBase64 = async (file: File | null): Promise<string> => {
  if (!file) return ''

  return new Promise((resolve) => {
    const reader = new FileReader()

    reader.onload = () => {
      const base64String = reader.result as string
      resolve(base64String.split(',')[1])
    }

    reader.readAsDataURL(file)
  })
}
