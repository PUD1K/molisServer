import { Optional, Model, DataTypes } from "sequelize";
import { sequelize } from "../db.ts";

interface PostsReactionAttributes {
    id: number;
    like: boolean; // если like - то true, если dislike - то false
}

interface PostsReactionCreationAttributes extends Optional<PostsReactionAttributes, 'id'> {}

class PostsReaction extends Model<PostsReactionAttributes, PostsReactionCreationAttributes> implements PostsReactionAttributes{
    public id!: number;
    public like!: boolean;
}

PostsReaction.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        like: { type: DataTypes.BOOLEAN }
    },
    {
        sequelize,
        modelName: 'posts_reaction'
    }
)

export default PostsReaction