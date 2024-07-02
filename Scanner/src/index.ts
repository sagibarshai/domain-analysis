import express from "express";
import { config } from "./config";
import cron from "node-cron";
import { scanDomains } from "./cronjob";
import "dotenv/config";

const app = express();

cron.schedule(config.cronjobIntervalLoop, async () => {
  console.log("Running domain scanning cron job...");
  try {
    await scanDomains(); // Call the scanDomains function
  } catch (error) {
    console.error("Error running domain scanning cron job:", error);
  }
});

app.listen(config.port, () => {
  console.log(`Service Scanner cronjob is up on port ${config.port}`);
});
