import { NextFunction, Request, Response } from "express";
import ApiError from "../error/ApiError.ts";
import Topics from "./topics.model.ts";
import uploadFile from "../global_functions/uploadFile.ts";

class TopicsService {
    async create(req: Request, res: Response, next: NextFunction){
        const { title, parent_topic_id } : { title: string, parent_topic_id?: number} = req.body;
        let fileName: string = "";

        if(!title){
            return next(ApiError.badRequest('Empty title parameter'));
        } 

        const existTopic = await Topics.findOne({ where: { title } });
        if(existTopic){
            return next(ApiError.badRequest('Topic with this title already exist'));
        }

        if(req.files){
            fileName = await uploadFile(req.files);
        }
        const topicInfo : { title: string, img?: string, parent_topic_id?: number } = {
            title,
            img: fileName || undefined,
            parent_topic_id: parent_topic_id || undefined
        };
        const topic = await Topics.create(topicInfo);
        return res.json(topic);
    }

    async getAll(req: Request, res: Response){
        const topics = await Topics.findAll({ where:{ parent_topic_id: null },  include: [{ model: Topics, as: 'child_topics' }] });
        
        // res.cookie('username', 'johndoe', { maxAge: 900000, httpOnly: true });
        return res.json(topics);
    }

    async getOne(req: Request, res: Response, next: NextFunction){
        const { id } = req.params;
        if(!id){
            return next(ApiError.badRequest('Empty id paramater'));
        }
        
        const topic = await Topics.findOne({where: {id}});
        if(!topic){
            return next(ApiError.badRequest('Tag not found'));
        }

        return res.json(topic);
    }
}

export default new TopicsService()