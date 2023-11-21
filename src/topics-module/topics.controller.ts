import { Router } from "express";
import topicsService from "./topics.service.ts";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.ts";

const router = Router();

router.post('/', checkRoleMiddleware('ADMIN'), topicsService.create);
router.get('/', topicsService.getAll);
router.get('/:id', topicsService.getOne);
router.delete('/',);


export default router