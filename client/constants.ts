export const domainURL = process.env.NEXT_PUBLIC_DOMAIN_URL;

export const privateViewStates = {
  publications: 'publications',
  editPublication: 'editPublication',
};

export const adminMenu = [
  { rusName: 'Публикации', name: privateViewStates.publications },
  { rusName: 'Создать/редактировать', name: privateViewStates.editPublication },
];
