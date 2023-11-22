// import { DataTypes, Model, Optional } from "sequelize";
// import { sequelize } from "../db.ts";

// interface ChildCommentsAttributes{
//     id: number;
// }

// interface ChildCommentsCreationAttributes extends Optional<ChildCommentsAttributes, "id"> {}

// class CommentsParenChild extends Model<ChildCommentsAttributes, ChildCommentsCreationAttributes> implements ChildCommentsAttributes{
//     public id!: number;
// }

// CommentsParenChild.init(
//     {
//         id: { type: DataTypes.INTEGER, primaryKey: true , autoIncrement: true }
//     },
//     {
//         sequelize,
//         modelName: 'comments_parent_child'
//     }
// );

// export default CommentsParenChild;
