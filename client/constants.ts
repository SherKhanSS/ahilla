export const domainURL = process.env.NEXT_PUBLIC_DOMAIN_URL;

export const privateViewStates = {
  publications: 'publications',
  editPublication: 'editPublication',
  editPublicationPreview: 'editPublicationPreview',
  authors: 'authors',
  editAuthor: 'editAuthor',
  tags: 'tags',
  editTag: 'editTag',
  documents: 'documents',
  editDocument: 'editDocument',
  pages: 'pages',
  editPage: 'editPage',
};

export const adminMenu = [
  { rusName: 'Публикации', name: privateViewStates.publications },
  { rusName: 'Авторы', name: privateViewStates.authors },
  { rusName: 'Теги', name: privateViewStates.tags },
  { rusName: 'Файлы', name: privateViewStates.documents },
  { rusName: 'Страницы', name: privateViewStates.pages },
];
