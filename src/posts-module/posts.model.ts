import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db.ts';

interface PostsAttributes {
  id: number;
  header: string;
  body: string;
  img: string | null;
  rating: number | null;
  topic_id?: number | null;
}

interface PostsCreationAttributes extends Optional<PostsAttributes, 'id' | 'rating'> {}

class Posts extends Model<PostsAttributes, PostsCreationAttributes> implements PostsAttributes {
  public id!: number;
  public header!: string;
  public body!: string;
  public img!: string | null;
  public rating!: number | null;
}

Posts.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    header: { type: DataTypes.STRING, allowNull: false },
    body: { type: DataTypes.STRING, allowNull: false },
    img: { type: DataTypes.STRING },
    rating: { type: DataTypes.INTEGER, allowNull: true },
  },
  {
    sequelize,
    modelName: 'posts',
  },
);

export default Posts;
