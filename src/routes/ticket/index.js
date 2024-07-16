import ticketController from "../../controller/Ticket/index.js";
import { Router } from "express";

const ticketRouter = Router();
ticketRouter.get("/tickets", ticketController.getAll);
ticketRouter.post('/ticket', ticketController.create)

export default ticketRouter;