export const formatDate = (date) => {
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
    ${date.getDate()}
    ${MONTH_NAMES[date.getMonth()]}
    ${date.getFullYear()} `
}
