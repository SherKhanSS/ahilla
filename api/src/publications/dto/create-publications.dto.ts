import { IsString, Length } from 'class-validator';

export class CreatePublicationsDto {
  @IsString({ message: 'Должно быть строкой' })
  @Length(1, 100, { message: 'Не меньше 4 и не больше 16' })
  name: string;
  slug: string;
  author_id: number;
  image: string;
  date: Date;
  tags: number[];
  description: string;
  content: string;
  is_news: boolean;
  is_published: boolean;
}

//TODO: написать валидацию для публикации
