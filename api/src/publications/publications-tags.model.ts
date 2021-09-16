import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Tag } from '../tags/tags.model';
import { Publication } from './publications.model';

@Table({ tableName: 'publications_tags', createdAt: false, updatedAt: false })
export class PublicationsTags extends Model<PublicationsTags> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Publication)
  @Column({
    type: DataType.INTEGER,
  })
  publicationId: number;

  @ForeignKey(() => Tag)
  @Column({
    type: DataType.INTEGER,
  })
  tagId: number;
}
