import authRouter from "./auth/index.js";
import bookingRouter from "./booking/index.js";
import fieldRouter from "./fields/index.js";
import matchesRoutes from "./matches/index.js";
import playerRouter from "./players/index.js";
import teamRouter from "./teams/index.js";
import userRouter from "./user/index.js";

const allRoutes = [
  authRouter,
  userRouter,
  fieldRouter,
  playerRouter,
  teamRouter,
  matchesRoutes,
  bookingRouter
];
// const allRoutes = [];

export default allRoutes;
