import { NextFunction, Request, Response } from "express";
import { SaveDomainPayloadRequest, UpdateDomainPayloadRequest } from "../../routes/domain/types";
import { createDomainModel, getDomainModel, getDomainsModel, updateDomainModel } from "../../models/domain";

const createDomain = async (req: SaveDomainPayloadRequest, res: Response, next: NextFunction) => {
  const { domain, requestId } = req.body;

  try {
    const existingDomain = await getDomainModel({ domain });
    if (!existingDomain) {
      const savedDomain = await createDomainModel({ domain, requestId });
      console.log("new Domain saved on domains_to_scan table with the data: ", savedDomain);

      return res.status(201).json({ data: savedDomain });
    } else {
      return res.status(400).json({ message: "Domain is already exists", data: existingDomain });
    }
  } catch (err) {
    next(err);
  }
};

const updateDomain = async (req: UpdateDomainPayloadRequest, res: Response, next: NextFunction) => {
  const { domain, status, last_scan } = req.body;

  try {
    const updatedDomain = await updateDomainModel({ domain, status, last_scan });
    console.log("Update Domain status, last_scan properties on domains_to_scan table with the data: ", updatedDomain);

    return res.status(201).json({ data: updatedDomain });
  } catch (err) {
    next(err);
  }
};

const getDomain = async (req: SaveDomainPayloadRequest, res: Response, next: NextFunction) => {
  const { domain } = req.params;

  try {
    const domainData = await getDomainModel({ domain });
    console.log("New domain saved to domains_to_scan table with data : ", domainData);

    return res.status(201).json({ data: domainData });
  } catch (err) {
    next(err);
  }
};

const getDomains = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const domainsList = await getDomainsModel();
    return res.status(200).json({ data: domainsList });
  } catch (err) {
    next(err);
  }
};

export {
  createDomain as createDomainController,
  getDomain as getDomainController,
  getDomains as getDomainsController,
  updateDomain as updateDomainController,
};
