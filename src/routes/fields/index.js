import { Router } from "express";
import fieldController from "../../controller/fields/index.js";

const fieldRouter = Router();

fieldRouter.get("/fields", fieldController.getAll);
fieldRouter.get("/field/:id", fieldController.getbyId);
fieldRouter.post("/field", fieldController.post);
fieldRouter.put("/field/:id", fieldController.update);
fieldRouter.delete("/field/:id", fieldController.delete);

export default fieldRouter;