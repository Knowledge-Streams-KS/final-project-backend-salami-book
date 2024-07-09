import { Router } from "express";
import teamController from "../../controller/teams/index.js";

const teamRouter = Router();

teamRouter.get('/teams', teamController.getAll);
teamRouter.post('/team', teamController.post);
teamRouter.delete('/team/:id', teamController.delete);

export default teamRouter;