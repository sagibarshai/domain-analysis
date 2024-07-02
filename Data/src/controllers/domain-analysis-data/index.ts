import { NextFunction, Response } from "express";
import { getDomainModel } from "../../models/domain";
import { GetDomainAnalysisDataRequest } from "../../routes/domain-analysis-data/types";
import { getDomainAnalysisDataModel } from "../../models/domain-analysis";

const getDomainAnalysisData = async (req: GetDomainAnalysisDataRequest, res: Response, next: NextFunction) => {
  const { domain } = req.params;

  try {
    const domainAnalysisData = await getDomainAnalysisDataModel(domain);

    return res.status(200).json({ data: domainAnalysisData });
  } catch (err) {
    next(err);
  }
};

export { getDomainAnalysisData as domainAnalysisDataController };
