import { Router } from "express";
import matchesController from "../../controller/matches/index.js";

const matchesRoutes = Router();

matchesRoutes.get("/matches", matchesController.getAll);
matchesRoutes.post("/match", matchesController.post)

export default matchesRoutes;