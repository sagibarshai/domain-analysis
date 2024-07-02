import { Request } from "express";

export interface WhoIsPayloadRequest extends Request {
  body: {
    domainName: string;
    createdDate: Date;
    updatedDate: Date;
    expiresDate: Date | null;
    registrantOrganization: string | null;
  };
}
