import { NextFunction, Response } from "express";
import { CreateDomainRequest, GetDomainRequest } from "../../routes/domain/types";
import { createRequestModel } from "../../models/request";
import { createDomainModel } from "../../models/domain";
import { AxiosError } from "axios";

const createDomain = async (req: CreateDomainRequest, res: Response, next: NextFunction) => {
  const { domain } = req.body;
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
    if (error.response?.status === 400) return res.status(400).json({ message: "This domain already registered" });
    next(error);
  }
};
export { createDomain as createDomainController };
