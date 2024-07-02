import { NextFunction, Response } from "express";
import { whoIsModel } from "../../models/whois";
import { WhoIsPayloadRequest } from "../../routes/who-is/types";

const whoIs = async (req: WhoIsPayloadRequest, res: Response, next: NextFunction) => {
  const { createdDate, domainName, expiresDate, registrantOrganization, updatedDate } = req.body;

  try {
    const savedWhoIsData = await whoIsModel({ createdDate, domainName, expiresDate, registrantOrganization, updatedDate });
    console.log("New Who Is row saved on table who_is_data with the data: ", savedWhoIsData);
    return res.status(201).json({ data: savedWhoIsData });
  } catch (err) {
    next(err);
  }
};

export { whoIs as whoIsController };
