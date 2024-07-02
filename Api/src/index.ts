import express, { NextFunction, Request, Response } from "express";
import { json } from "body-parser";
import cors from "cors";
import { config } from "./config";
import { domainRouter } from "./routes/domain";
import { notFoundMiddleware } from "./middlewares/not-found";
import { errorHandler } from "./errors";

const app = express();

app.use(cors());
app.use(json());
app.use("/api/domain", domainRouter);

app.use("/*", notFoundMiddleware);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Api service is up on port ${config.port}`);
});
