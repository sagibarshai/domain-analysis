import { Request } from "express";

export interface GetDomainAnalysisDataRequest extends Request {
  params: {
    domain: string;
  };
}
