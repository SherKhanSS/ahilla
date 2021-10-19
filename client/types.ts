export type AuthorType = {
  id: number;
  name: string;
  slug: string;
};

export type TagType = {
  id: number;
  name: string;
  slug: string;
};

export type ArticleType = {
  id: number;
  name: string;
  slug: string;
  author_id: number;
  image: string;
  date: string;
  views: number;
  description: string;
  content: string;
  is_news: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  author: AuthorType;
  tags: {
    id: number;
    name: string;
    slug: string;
    PublicationsTags: {
      id: number;
      publication_id: number;
      tag_id: number;
    };
  }[];
};

export type SelectElement = {
  label: string;
  value: number;
};

export type SelectOptions = SelectElement[] | [];

export type InitialArticle = {
  name: string;
  slug: string;
  author_id: number;
  image: string;
  date: string;
  tags: number[];
  description: string;
  content: string;
  is_news: boolean;
  is_published: boolean;

  [key: string]: string | number | number[] | boolean;
};
