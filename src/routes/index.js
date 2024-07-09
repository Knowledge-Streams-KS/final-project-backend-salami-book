import authRouter from "./auth/index.js";
import fieldRouter from "./fields/index.js";
import playerRouter from "./players/index.js";
import userRouter from "./user/index.js";



const allRoutes = [authRouter, userRouter, fieldRouter, playerRouter];
// const allRoutes = [];

export default allRoutes; 