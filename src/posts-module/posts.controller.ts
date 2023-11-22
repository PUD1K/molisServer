import { Router } from 'express';
import postsService from './posts.service.ts';

const router = Router();

router.post('/', postsService.create);
router.get('/', postsService.getAll);
router.get('/:id', postsService.getOne);
router.delete('/');

export default router;
