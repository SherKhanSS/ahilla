export type ArticleType = {
  name: string
  author: string
  image: string
  date: Date
  content: string
  views?: number
  category?: string
  tags?: string[]
}
