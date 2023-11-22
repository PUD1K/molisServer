import { Router } from 'express';
import commentsService from './comments.service.ts';

const router = Router();

router.post('/', commentsService.create);
router.get('/:post_id', commentsService.getAll);
router.get('/one/:id', commentsService.getOne);
router.delete('/');

export default router;
