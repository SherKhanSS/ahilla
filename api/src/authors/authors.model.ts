import { Model, Table, Column, DataType, HasMany } from 'sequelize-typescript';
import { Publication } from '../publications/publications.model';

interface AuthorCreationAttrs {
  name: string;
  slug: string;
}

@Table({ tableName: 'authors', createdAt: false, updatedAt: false })
export class Author extends Model<Author, AuthorCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  slug: string;

  @HasMany(() => Publication)
  publications: Publication[];
}
