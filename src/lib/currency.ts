export const money = (v: number, currency = "USD", locale = "es-VE") =>
  new Intl.NumberFormat(locale, { style: "currency", currency }).format(v);
