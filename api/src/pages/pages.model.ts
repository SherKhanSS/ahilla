import { Model, Table, Column, DataType } from 'sequelize-typescript';

interface PageCreationAttrs {
  slug: string;
  content: string;
}

@Table({ tableName: 'pages', createdAt: false, updatedAt: false })
export class Page extends Model<Page, PageCreationAttrs> {
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
  slug: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content: string;
}
