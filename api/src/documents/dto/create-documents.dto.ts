import { IsString, Length } from 'class-validator';

export class CreateDocumentsDto {
  @IsString({ message: 'Должно быть строкой' })
  @Length(1, 100, { message: 'Не меньше 1 и не больше 16' })
  name: string;

  // @IsString({ message: 'Должно быть строкой' })
  // @Length(1, 100, { message: 'Не меньше 1 и не больше 16' })
  // category: string;
}
