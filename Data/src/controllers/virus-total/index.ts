import { NextFunction, Response } from "express";
import { virusTotalModel } from "../../models/virus-total";
import { VirusTotalPayloadRequest } from "../../routes/virus-total/types";

const virusTotal = async (req: VirusTotalPayloadRequest, res: Response, next: NextFunction) => {
  const {
    domain,
    harmless,
    creationDate,
    lastAnalysisDate,
    lastHttpsCertificateDate,
    lastUpdateDate,
    malicious,
    registrar,
    reputation,
    suspicious,
    undetected,
  } = req.body;

  try {
    const savedVirusTotalData = await virusTotalModel({
      domain,
      harmless,
      creationDate,
      lastAnalysisDate,
      lastHttpsCertificateDate,
      lastUpdateDate,
      malicious,
      registrar,
      reputation,
      suspicious,
      undetected,
    });
    console.log("new Virus total row saved on table virus_total_data with the data: ", savedVirusTotalData);
    return res.status(201).json({ data: savedVirusTotalData });
  } catch (err) {
    next(err);
  }
};

export { virusTotal as virusTotalController };
