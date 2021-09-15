export const formatDate = (date: Date): string => {
  const parsedDate = new Date(date)
  const MONTH_NAMES = [
    `Января`,
    `Февраля`,
    `Марта`,
    `Апреля`,
    `Мая`,
    `Июня`,
    `Июля`,
    `Августа`,
    `Сентября`,
    `Октября`,
    `Ноября`,
    `Декабря`,
  ]

  return `
    ${parsedDate.getDate()}
    ${MONTH_NAMES[parsedDate.getMonth()]}
    ${parsedDate.getFullYear()} `
}
