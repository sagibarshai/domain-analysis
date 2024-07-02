import { Request } from "express";

export interface VirusTotalPayloadRequest extends Request {
  body: {
    domain: string;
    lastAnalysisDate: Date;
    reputation: number;
    lastHttpsCertificateDate: Date;
    creationDate: Date;
    lastUpdateDate: Date;
    registrar: string;
    harmless: number;
    malicious: number;
    suspicious: number;
    undetected: number;
  };
}
