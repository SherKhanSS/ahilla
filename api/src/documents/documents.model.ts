import { Model, Table, Column, DataType } from 'sequelize-typescript';

interface DocumentCreationAttrs {
  name: string;
  slug: string;
}

@Table({ tableName: 'documents', createdAt: false, updatedAt: false })
export class Document extends Model<Document, DocumentCreationAttrs> {
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
}
