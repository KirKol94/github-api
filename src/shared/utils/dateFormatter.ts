export const dateFormatter = (noFormattedDate: number | string | null | undefined): string => {
  const date = new Date(noFormattedDate ?? 0)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  if (date instanceof Date) {
    const year = date.getFullYear()
    const month = months[date.getMonth()]
    const day = date.getDate()

    return `${day} ${month} ${year}`
  }

  return ''
}
