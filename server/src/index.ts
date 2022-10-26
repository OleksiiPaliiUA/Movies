import * as dotenv from "dotenv";
dotenv.config();
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as cookieParser from "cookie-parser";

import { logger } from "./middleware/logger";
import errorHandler from "./middleware/errorHandler";
import corsOptions from "./config/corsOptions";
import db from "./db";
import movieRouter from "./routes/movie.router";
import userRouter from "./routes/user.router";
import authRouter from "./routes/auth.router";

const app = express();

const PORT = Number(process.env.PORT) || 5000;

app.use(logger);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

db.authenticate();

app.use("/api", movieRouter, userRouter, authRouter);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
