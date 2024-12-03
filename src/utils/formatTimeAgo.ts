export const formatTimeAgo = (date: string) => {
  const now = new Date()
  const commentDate = new Date(date)
  const nowUTC = new Date(now.getTime() + now.getTimezoneOffset() * 60000)

  const diffInMilliseconds = nowUTC.getTime() - commentDate.getTime()
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60))
  const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60))

  if (diffInMinutes < 1) {
    return 'недавно'
  }

  const minutesEnding = (n: number) => {
    const lastDigit = n % 10
    const lastTwoDigits = n % 100

    if (lastDigit === 1 && lastTwoDigits !== 11) {
      return 'а' // 1 минута
    } else if (
      [2, 3, 4].includes(lastDigit) &&
      ![12, 13, 14].includes(lastTwoDigits)
    ) {
      return 'ы' // 2-4 минуты
    } else {
      return '' // 5 и более минут
    }
  }

  const hoursEnding = (n: number) => {
    const lastDigit = n % 10
    const lastTwoDigits = n % 100

    if (lastDigit === 1 && lastTwoDigits !== 11) {
      return 'час' // 1 час
    } else if (
      [2, 3, 4].includes(lastDigit) &&
      ![12, 13, 14].includes(lastTwoDigits)
    ) {
      return 'часа' // 2-4 часа
    } else {
      return 'часов' // 5 и более часов
    }
  }

  if (diffInMinutes < 60) {
    return `${diffInMinutes} минут${minutesEnding(diffInMinutes)} назад`
  }

  if (diffInHours < 24) {
    return `${diffInHours} ${hoursEnding(diffInHours)} назад`
  }

  const timezoneOffset = commentDate.getTimezoneOffset()
  const localTime = new Date(commentDate.getTime() - timezoneOffset * 60000)
  return localTime
    .toLocaleString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
      day: 'numeric',
      month: 'short',
      hour12: false,
    })
    .replace(',', ' в')
}
