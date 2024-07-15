import { Router } from "express";
import playerController from "../../controller/player/index.js";

const playerRouter = Router();

playerRouter.get("/players", playerController.getAll);
playerRouter.post("/player", playerController.post);
playerRouter.delete("/player/:id", playerController.delete);

export default playerRouter;