require("dotenv").config();

import "express-async-errors";

// initialize the express app
import express, { Application, NextFunction, Request, Response } from "express";
const app: Application = express();

// security middleware
import cors from "cors";


// application middleware
import { applicationRoutes } from "./routes";
import { StatusCodes } from "http-status-codes";

// use security middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())


// endpoint url logs
app.use(function (req: Request, _: Response, next: NextFunction) {
  const requestMethod = req.method;
  const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  console.log(`${requestMethod} ${fullUrl}`);
  next();
});

// home route
app.get("/", (_: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
    message: "Welcome to the home route",
  });
});

app.use("/api", applicationRoutes);

export default app;
