import { Request } from "express";

export interface SaveDomainPayloadRequest extends Request {
  body: {
    domain: string;
    requestId: number;
  };
}
export interface UpdateDomainPayloadRequest extends Request {
  body: {
    domain: string;
    status: "pending" | "scanned" | "failure";
    last_scan: Date;
  };
}
