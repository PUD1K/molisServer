import { Router } from "express";
import tagsService from "./tags.service.ts";

const router = Router();

router.post('/', tagsService.create);
router.get('/', tagsService.getAll);
router.get('/:id', tagsService.getOne);
router.delete('/:id', tagsService.delete);


export default router