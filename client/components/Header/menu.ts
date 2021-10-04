const menu = [
  {
    title: 'Новости',
    link: '/news?order=0&sort=updated_at&page=1',
    subMenu: null,
  },
  {
    title: 'Мысли',
    link: '/tags/3?order=0&sort=updated_at&page=1',
    subMenu: [
      {
        title: 'Колонка редактора',
        link: 'tags/5?order=0&sort=updated_at&page=1',
      },
      { title: 'Блоги', link: '/tags/6?order=0&sort=updated_at&page=1' },
      { title: 'Комментарии', link: '/tags/32?order=0&sort=updated_at&page=1' },
      { title: 'Нам пишут', link: '/tags/56?order=0&sort=updated_at&page=1' },
      {
        title: 'Вопросы и ответы',
        link: '/tags/170?order=0&sort=updated_at&page=1',
      },
    ],
  },
  {
    title: 'Истории',
    link: '/tags/4?order=0&sort=updated_at&page=1',
    subMenu: [
      { title: 'Культура', link: '/tags/9?order=0&sort=updated_at&page=1' },
      { title: 'Религия', link: '/tags/7?order=0&sort=updated_at&page=1' },
      { title: 'Проза', link: '/tags/11?order=0&sort=updated_at&page=1' },
      { title: 'Общество', link: '/tags/8?order=0&sort=updated_at&page=1' },
      {
        title: 'Мониторинг СМИ',
        link: '/tags/18?order=0&sort=updated_at&page=1',
      },
    ],
  },
  {
    title: 'Проекты',
    link: '/404',
    subMenu: null,
  },
  {
    title: 'Авторы',
    link: '/avtory',
    subMenu: null,
  },
  {
    title: 'Наши книги',
    link: '/404',
    subMenu: null,
  },
  {
    title: 'Контакты',
    link: '/404',
    subMenu: null,
  },
  {
    title: 'О нас',
    link: '/404',
    subMenu: null,
  },
  {
    title: 'Поддержать',
    link: '/404',
    subMenu: null,
  },
];

export default menu;
