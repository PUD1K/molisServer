import { NextFunction, Request, Response } from 'express';
import ApiError from '../error/ApiError.ts';
import Posts from './posts.model.ts';
import uploadFile from '../global_functions/uploadFile.ts';
import Topics from '../topics-module/topics.model.ts';

class PostsService {
  async create(req: Request, res: Response, next: NextFunction) {
    const { header, body, topic_id }: { header: string; body: string; topic_id: number } = req.body;
    let fileName: string = '';

    if (!header) {
      return next(ApiError.badRequest('Empty header parameter'));
    }
    if (!body) {
      return next(ApiError.badRequest('Empty body parameter'));
    }

    if (req.files) {
      fileName = await uploadFile(req.files);
    }

    const postInfo: { header: string; body: string; topic_id: number; img?: string } = {
      header,
      body,
      topic_id,
      img: fileName || undefined,
    };
    const post = await Posts.create(postInfo);
    return res.json(post);
  }

  async getAll(req: Request, res: Response) {
    const topic_id = req.query.topic_id as string;

    let page: number | string = req.query.page as string;
    let limit: number | string = req.query.limit as string;
    page = Number(page) || 1;
    limit = Number(limit) || 10;
    const offset = page * limit - limit;
    let posts: { rows: Posts[]; count: number };

    if (topic_id) {
      posts = await Posts.findAndCountAll({ where: { topic_id }, include: { model: Topics }, limit, offset });
    } else {
      posts = await Posts.findAndCountAll({ limit, offset });
    }

    return res.json(posts);
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id as string;
    if (!id) {
      return next(ApiError.badRequest('Empty id paramater'));
    }

    const post = await Posts.findOne({ where: { id } });
    if (!post) {
      return next(ApiError.badRequest('Post not found'));
    }

    return res.json(post);
  }
}

export default new PostsService();
