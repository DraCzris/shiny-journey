export const getFormattedDate = (
  date: Date | string,
  lang: string,
  options: Intl.DateTimeFormatOptions
) => new Date(date).toLocaleString(lang, options)
