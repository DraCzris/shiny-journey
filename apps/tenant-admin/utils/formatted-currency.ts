export const getFormattedCurrency = (
  currency: number,
  lang: string,
  options: Intl.NumberFormatOptions
) =>
  Intl.NumberFormat(lang, {
    style: 'currency',
    currency: 'USD',
    ...options,
  }).format(currency)
