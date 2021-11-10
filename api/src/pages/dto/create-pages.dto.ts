import { IsString } from 'class-validator';

export class CreatePagesDto {
  @IsString({ message: 'Должно быть строкой' })
  slug: string;

  @IsString({ message: 'Должно быть строкой' })
  content: string;
}
