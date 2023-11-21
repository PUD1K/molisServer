import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from '../db.ts'

interface CommentsAttributes {
    id: number;
    body: string;
    rating: number | null;
    post_id?: number;

    parent_comment_id?: number | null;
}

interface CommentsCreationAttributes extends Optional<CommentsAttributes, 'id' | 'rating'> {}

class Comments extends Model<CommentsAttributes, CommentsCreationAttributes> implements CommentsAttributes{
    public id!: number;
    public body!: string;
    public rating!: number | null;
    public post_id!: number;
    public parent_comment_id!: number | null;

    public child_comments: Comments[] = [];
}

Comments.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        body: { type: DataTypes.STRING, allowNull: false },
        rating: { type: DataTypes.INTEGER, defaultValue: 0 }
    },
    {
        sequelize,
        modelName: 'comments'
    }
)

export default Comments