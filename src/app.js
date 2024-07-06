import "dotenv/config";
import { connectDB } from "./db/config.js";
import express from "express";
import syncDb from "./db/init.js";
import allRoutes from "./routes/index.js";
import cors from "cors";

const app = express();

// Allow only specific origins or handle undefined origin gracefully
const whitelist = ['http://localhost:5173'];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.error(`Not allowed by CORS: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    }
};

connectDB();
app.use(express.json());
app.use(cors(corsOptions));
app.use(allRoutes);

syncDb();
app.listen(3000, () => {
    console.log("Server is running at port 3000");
});
