import ticketController from "../../controller/Ticket/index.js";
import { Router } from "express";

const ticketRouter = Router();
ticketRouter.get("/tickets", ticketController.getAll);
ticketRouter.get("/matchTickets", ticketController.getAllMatchTickets);
ticketRouter.get("/matchTickets/:MatchId", ticketController.getMatchTickets);
ticketRouter.post('/ticket', ticketController.create)
ticketRouter.post('/matchTicket', ticketController.createMatchTicket)

export default ticketRouter;