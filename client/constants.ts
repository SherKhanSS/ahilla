export const domainURL = process.env.NEXT_PUBLIC_DOMAIN_URL;

export const privateViewStates = {
  publications: 'publications',
  editPublication: 'editPublication',
  authors: 'authors',
  editAuthor: 'editAuthor',
  tags: 'tags',
  editTag: 'editTag',
  editPublicationPreview: 'editPublicationPreview',
};

export const adminMenu = [
  { rusName: 'Публикации', name: privateViewStates.publications },
  { rusName: 'Авторы', name: privateViewStates.authors },
  { rusName: 'Теги', name: privateViewStates.tags },
];
