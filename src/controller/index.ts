import { Router } from 'express';
import commentsController from '../comments-module/comments.controller.ts';
import postsController from '../posts-module/posts.controller.ts';
import tagsController from '../tags-module/tags.controller.ts';
import topicsController from '../topics-module/topics.controller.ts';
import usersController from '../users-module/users.controller.ts';

const router = Router();

router.use('/users', usersController);
router.use('/comments', commentsController);
router.use('/posts', postsController);
router.use('/tags', tagsController);
router.use('/topics', topicsController);

export default router;
