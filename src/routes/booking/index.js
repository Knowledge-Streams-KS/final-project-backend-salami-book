import { Router } from "express";
import bookingController from "../../controller/booking/index.js";

const bookingRouter = Router();

bookingRouter.get('/bookings', bookingController.getAll)

export default bookingRouter;