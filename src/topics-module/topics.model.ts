import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db.ts';

interface TopicsAttributes {
  id: number;
  title: string;
  img: string | null;
  parent_topic_id?: number | null;
}

interface TopicsCreationAttributes extends Optional<TopicsAttributes, 'id'> {}

class Topics extends Model<TopicsAttributes, TopicsCreationAttributes> implements TopicsAttributes {
  public id!: number;
  public title!: string;
  public img!: string;
  public parent_topic_id?: number | null;
}

Topics.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    img: { type: DataTypes.STRING },
  },
  {
    sequelize,
    modelName: 'topics',
  },
);

export default Topics;
