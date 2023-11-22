import { Model, Optional, DataTypes } from 'sequelize';
import { sequelize } from '../db.ts';

interface TopicsTagsAttributes {
  id: number;
}

interface TopicsTagsCreationAttributes extends Optional<TopicsTagsAttributes, 'id'> {}

class TopicsTags extends Model<TopicsTagsAttributes, TopicsTagsCreationAttributes> implements TopicsTagsAttributes {
  public id!: number;
}

TopicsTags.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  },
  {
    sequelize,
    modelName: 'topics_tags',
  },
);

export default TopicsTags;
