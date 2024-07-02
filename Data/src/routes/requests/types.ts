import { Request } from "express";

export interface SaveRequestPayloadRequest extends Request {
  body: {
    method: Request["method"];
    url: Request["url"];
    ip: Request["ip"];
    params: Request["params"];
    body: Request["body"];
    domain_requested: string;
  };
}
