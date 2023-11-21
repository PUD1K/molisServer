import { NextFunction, Request, Response } from "express";
import ApiError from "../error/ApiError.ts";
import Comments from "./comments.model.ts";

interface JsonCommentType{
    id: number;
    body: string;
    rating: number | null;
    post_id?: number;

    parent_comment_id?: number | null;
    child_comments: JsonCommentType[];
}

class CommentsService{
    async create(req: Request, res: Response, next: NextFunction){
        const { body, post_id, parent_comment_id } : { body: string, post_id: number, parent_comment_id?: number } = req.body;
        
        if(!body){
            return next(ApiError.badRequest('Empty body parameter'));
        }

        const commentBody : { body: string, post_id: number, parent_comment_id?: number } = {
            body,
            post_id,
            parent_comment_id: parent_comment_id || undefined
        }
        const comment = await Comments.create(commentBody);
        return res.json(comment);
    }

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        const post_id = req.params.post_id as string;
        
        if(!post_id){
            return next(ApiError.badRequest('Empty post_id parameter'));
        }

        // отбираем корневые комментарии
        const root_comments = await Comments.findAll({ 
            where: { post_id: post_id, parent_comment_id: null },
        });

        // рекурсивно обрабатываем все дочерние комментарии для каждого комментария в ветке
        const root_comments_json: JsonCommentType[] = await Promise.all(root_comments.map(async (root_comment) => {
            // используем ручную конвертацию в json, поскольку express игнорирует все нестандартные поля при ответе
            const root_comment_json: JsonCommentType = {
                ...root_comment.dataValues,
                child_comments: await this.getAllChildComments(root_comment)
            }

            return root_comment_json
        }));

        return res.json(root_comments_json);
    }

    async getAllChildComments(parent_comment: Comments): Promise<JsonCommentType[]>{
        const child_comments = await Comments.findAll({ where: { parent_comment_id: parent_comment.id } });

        const child_comments_json = await Promise.all(child_comments.map(async (child_comment) => {
            const child_comment_json: JsonCommentType = {
                ...child_comment.dataValues,
                child_comments: await this.getAllChildComments(child_comment)
            }

            return child_comment_json
        }));
        

        return child_comments_json;
    }

    async getOne(req: Request, res: Response, next: NextFunction){
        const { id } = req.params;

        if(!id){
            return next(ApiError.badRequest('Empty id parameter'));
        }
        const comment = await Comments.findOne({ where: { id } });
        return comment;
    }
}

export default new CommentsService();