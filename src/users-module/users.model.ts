import { sequelize } from '../db.ts';
import { DataTypes, Optional, Model } from 'sequelize';

interface UserAttributes {
  id: number;
  username: string;
  password: string;
  email: string | null;
  avatar: string | null;
  role: string;
}

// определение опциональных атрибутов, в нашем случае id, т.к. значение для него передается базой автоматически
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class Users extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public password!: string;
  public email!: string | null;
  public avatar!: string | null;
  public role!: string;
}

Users.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true },
    avatar: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: 'USER' },
  },
  {
    sequelize,
    modelName: 'Users',
  },
);

export default Users;
