export type SubMenuType = { title: string; link: string }

export type MenuItemType = {
  title: string
  link: string
  subMenu: null | SubMenuType[]
}
