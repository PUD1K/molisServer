import { NextFunction, Request, Response } from 'express';
import ApiError from '../error/ApiError.ts';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function (err: ApiError, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }
  console.log(err);
  return res.status(400).json({ message: 'Unknown error' });
}
