import { NextFunction, Response } from "express";
import { GetDomainRequest } from "../../routes/domain/types";
import { createRequestModel } from "../../models/request";
import { createDomainModel } from "../../models/domain";
import { AxiosError } from "axios";
import { SavedDomainData } from "../../models/domain/types";
import { getDomainAnalysisModel } from "../../models/domain-analysis-data";

const getDomain = async (req: GetDomainRequest, res: Response, next: NextFunction) => {
  const { domain } = req.params;
  let requestId: number;

  try {
    const request = await createRequestModel({
      ip: req.ip,
      method: req.method,
      url: req.originalUrl,
      body: req.body,
      params: req.params,
      domain_requested: domain,
    });
    requestId = request.id;
  } catch (err) {
    next(err);
  }
  try {
    await createDomainModel({ domain, requestId: requestId! });
    return res.status(201).json({ message: `domain ${domain} is added for future scan` });
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status === 400) {
      const domainData = error.response.data as { data: SavedDomainData };

      if (domainData.data.status === "pending") return res.status(200).json({ message: "this domain is pending to be process, try again later" });
      else if (domainData.data.status === "failure") return res.status(200).json({ message: "this domain failure to be processed" });
      else if (domainData.data.status === "scanned") {
        const domainAnalysis = await getDomainAnalysisModel(domain);
        return res.status(200).json({ data: domainAnalysis });
      }
    }
    next(error);
  }
};
export { getDomain as getDomainController };
