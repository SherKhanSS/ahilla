import {
  Model,
  Table,
  Column,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { Publication } from '../publications/publications.model';
import { PublicationsTags } from '../publications/publications-tags.model';

interface TagCreationAttrs {
  name: string;
  slug: string;
}

@Table({ tableName: 'tags' })
export class Tag extends Model<Tag, TagCreationAttrs> {
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

  @BelongsToMany(() => Publication, () => PublicationsTags)
  publications: Publication[];
}
