import { IsString, Length } from 'class-validator';

export class CreateTagsDto {
  @IsString({ message: 'Должно быть строкой' })
  @Length(1, 100, { message: 'Не меньше 1 и не больше 16' })
  name: string;

  @IsString({ message: 'Должно быть строкой' })
  @Length(1, 100, { message: 'Не меньше 1 и не больше 16' })
  slug: string;
}
