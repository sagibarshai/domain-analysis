import { Request } from "express";

export interface RequestPayload {
  method: Request["method"];
  url: Request["url"];
  ip: Request["ip"];
  params: Request["params"];
  body: Request["body"];
  domain_requested: string;
}

export interface SavedRequestData {
  id: number;
  method: Request["method"];
  url: Request["url"];
  ip: Request["ip"];
  params: Request["params"];
  body: Request["body"];
  domain_requested: string;
  timestamp: Date;
}
