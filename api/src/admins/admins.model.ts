import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface AdminCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'admins' })
export class Admin extends Model<Admin, AdminCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;
}
