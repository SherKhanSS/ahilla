import {
  Model,
  Table,
  Column,
  DataType,
  BelongsToMany,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Tag } from '../tags/tags.model';
import { PublicationsTags } from './publications-tags.model';
import { Author } from '../authors/authors.model';

interface PublicationCreationAttrs {
  name: string;
  slug: string;
  author: string;
  image: string;
  date: Date;
  category: string;
  tags: string[];
  content: string;
}

@Table({ tableName: 'publications' })
export class Publication extends Model<Publication, PublicationCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  slug: string;

  @ForeignKey(() => Author)
  @Column({
    type: DataType.INTEGER,
  })
  authorId: number;

  @BelongsTo(() => Author)
  author: Author;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date: Date;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  views: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  category: string;

  @BelongsToMany(() => Tag, () => PublicationsTags)
  tags: Tag[];

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isPublished: boolean;
}
