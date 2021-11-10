import { domainURL } from '../constants';
import { GetServerSidePropsResult} from "next";

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

export const saveToServer = async (file: File) => {
  const body = new FormData();
  body.append('image', file);
  const token = localStorage.token ? localStorage.token : '';

  const res = await fetch(`${domainURL}/api/publications/add-image`, {
    method: 'POST',
    body,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  let { uploadedImageName } = await res.json();
  return uploadedImageName;
};

export const getPropsPage = async (slug: string, name: string, description: string): Promise<GetServerSidePropsResult<{ [key: string]: any; }>> => {
  try {
    const response = await fetch(`${domainURL}/api/pages/${slug}`);

    if (response.status === 500 || response.status === 404) {
      return {
        redirect: {
          destination: '/404',
          permanent: false,
        },
      };
    }

    const article = await response.json();
    article.name = name;
    article.description = description

    return {
      props: {
        article,
      },
    };
  } catch (err) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
}
