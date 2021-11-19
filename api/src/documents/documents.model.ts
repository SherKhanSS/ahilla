import { Model, Table, Column, DataType } from 'sequelize-typescript';

interface DocumentCreationAttrs {
  name: string;
  slug: string;
  category: string;
}

@Table({
  tableName: 'documents',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
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

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  category: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  created_at: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  updated_at: Date;
}
