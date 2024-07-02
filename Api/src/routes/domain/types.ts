import { Request } from "express";

export interface GetDomainRequest extends Request {
  params: {
    domain: string;
  };
}
export interface CreateDomainRequest extends Request {
  body: {
    domain: string;
  };
}
