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
  tags: string[];
  description: string;
  content: string;
  is_news: boolean;
  is_published: boolean;
}

@Table({
  tableName: 'publications',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
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
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  slug: string;

  @ForeignKey(() => Author)
  @Column({
    type: DataType.INTEGER,
  })
  author_id: number;

  @BelongsTo(() => Author)
  author: Author;

  @Column({
    type: DataType.STRING,
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

  @BelongsToMany(() => Tag, () => PublicationsTags)
  tags: Tag[];

  @Column({
    type: DataType.TEXT,
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
  is_news: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  is_published: boolean;
}
