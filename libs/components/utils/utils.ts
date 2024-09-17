export const classNames = (...classes: string[]) =>
  classes.filter(Boolean).join(' ')

export const getFormattedDate = (
  date: Date | string,
  lang: string,
  options: Intl.DateTimeFormatOptions
) => new Date(date).toLocaleString(lang, options)

export const getFormatterNumber = (
  number: number,
  lang?: string,
  options?: Intl.NumberFormatOptions
) => new Intl.NumberFormat(lang ?? 'en', options).format(number)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatJSON = (data: any) => {
  if (!data) {
    return ''
  }

  if (typeof data === 'object') {
    return JSON.stringify(data, null, 2)
  }

  try {
    return JSON.stringify(JSON.parse(data), null, 2)
  } catch (e) {
    return data
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseJSON = (data: any) => {
  if (!data) {
    return {}
  }

  try {
    return JSON.parse(data)
  } catch (e) {
    return data
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isEmpty = (data: any) => {
  if (typeof data === 'object') {
    return Object.keys(data).length === 0
  }

  if (typeof data === 'string') {
    return data === ''
  }

  return !data
}
