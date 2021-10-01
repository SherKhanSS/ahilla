import { ParsedUrlQuery } from 'querystring';

export const formatDate = (date: string): string => {
  const parsedDate = new Date(date);
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
  ];

  return `
    ${parsedDate.getDate()}
    ${MONTH_NAMES[parsedDate.getMonth()]}
    ${parsedDate.getFullYear()} `;
};

export const formatDateForArchives = (dateArr: number[]): string => {
  const MONTH_NAMES = [
    `Январь`,
    `Февраль`,
    `Март`,
    `Апрель`,
    `Май`,
    `Июнь`,
    `Июль`,
    `Август`,
    `Сентябрь`,
    `Октябрь`,
    `Ноябрь`,
    `Декабрь`,
  ];

  return `${MONTH_NAMES[dateArr[1] - 1]} ${dateArr[0]}`;
};
