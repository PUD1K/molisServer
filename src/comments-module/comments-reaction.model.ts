import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from '../db.ts'


interface CommentsReactionAttributes {
    id: number;
    like: boolean; // если like - то true, если dislike - то false
}

interface CommentsReactionCreationAttributes extends Optional<CommentsReactionAttributes, 'id'>{}

export class CommentsReaction extends Model<CommentsReactionAttributes, CommentsReactionCreationAttributes> implements CommentsReactionAttributes{
    public id!: number;
    public like!: boolean;
}

CommentsReaction.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        like: { type: DataTypes.BOOLEAN }
    },
    { 
        sequelize, 
        modelName: 'comments_creation' 
    }
);

export default CommentsReaction;