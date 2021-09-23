export type AuthorType =  {
  id: number
  name: string;
  slug: string;
}

export type TagType =  {
  id: number
  name: string;
  slug: string;
}

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
  author: AuthorType,
  tags:
    {
      id: number;
      name: string;
      slug: string;
      PublicationsTags: {
        id: number;
        publication_id: number;
        tag_id: number;
      }
    }[];
}

export type ContextType = {
  state: {
    tags: TagType[]
  };
  setState: (status: null | boolean) => void;
};
