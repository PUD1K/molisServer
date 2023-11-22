import { NextFunction, Request, Response } from 'express';
import ApiError from '../error/ApiError.ts';
import Tags from './tags.model.ts';

class TagsService {
  async create(req: Request, res: Response, next: NextFunction) {
    const { title, color }: { title: string; color?: string } = req.body;
    if (!title) {
      return next(ApiError.badRequest('Empty title parameter'));
    }

    const existTag = await Tags.findOne({ where: { tag: title } });
    if (existTag) {
      return next(ApiError.badRequest('Tag with this title already exist'));
    }

    const tagInfo: { tag: string; color: string } = { tag: title, color: color || '#FFFFFF' };
    const tag = await Tags.create(tagInfo);
    return res.json(tag);
  }

  async getAll(req: Request, res: Response) {
    const tags = await Tags.findAll();
    return res.json(tags);
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id) {
      return next(ApiError.badRequest('Empty id parameter'));
    }

    const tag = await Tags.findOne({ where: { id } });
    if (!tag) {
      return next(ApiError.badRequest('Tag not found'));
    }

    return res.json(tag);
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    // const id = req.params.id as string;
    const { id } = req.params;
    if (!id) {
      return next(ApiError.badRequest('Empty id parameter'));
    }

    const tags = await Tags.findOne({ where: { id } });
    return res.json(tags);
  }
}

export default new TagsService();
