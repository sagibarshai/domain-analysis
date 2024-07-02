import express, { Request, Response } from "express";
import cors from "cors";
import { json } from "body-parser";
import { config } from "./config";
import { pgClient } from "./db/init-db";
import { requestsRouter } from "./routes/requests";
import { notFoundMiddleware } from "./middlewares/not-found";
import { errorHandler } from "./errors";
import { domainsRouter } from "./routes/domain";
import { virusTotalRouter } from "./routes/virus-total";
import { whoIsRouter } from "./routes/who-is";
import { domainAnalysisDataRouter } from "./routes/domain-analysis-data";

const app = express();
app.use(cors());
app.use(json());

app.use("/api/request", requestsRouter);
app.use("/api/domain", domainsRouter);
app.use("/api/virustotal", virusTotalRouter);
app.use("/api/whois", whoIsRouter);
app.use("/api/domain/analysis", domainAnalysisDataRouter);

app.use("/*", notFoundMiddleware);
app.use(errorHandler);

const startuP = async () => {
  await pgClient.connect();
  console.log(`Data service is up on port ${config.port}`);
};

app.listen(config.port, startuP);
