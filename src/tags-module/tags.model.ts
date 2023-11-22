import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db.ts';
import Topics from '../topics-module/topics.model.ts';
import TopicsTags from '../topics-module/topics-tags.model.ts';

interface TagsAttributes {
  id: number;
  tag: string;
  color: string | null;
}

interface TagsCreationAttribues extends Optional<TagsAttributes, 'id'> {}

class Tags extends Model<TagsAttributes, TagsCreationAttribues> implements TagsAttributes {
  public id!: number;
  public tag!: string;
  public color!: string | null;
}

Tags.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    tag: { type: DataTypes.STRING, allowNull: false, unique: true },
    color: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: 'tags',
  },
);

Tags.belongsToMany(Topics, { through: TopicsTags });

export default Tags;
