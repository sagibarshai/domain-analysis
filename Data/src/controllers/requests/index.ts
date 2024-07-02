import { NextFunction, Response } from "express";
import { SaveRequestPayloadRequest } from "../../routes/requests/types";
import { createRequestModel } from "../../models/request";

const requests = async (req: SaveRequestPayloadRequest, res: Response, next: NextFunction) => {
  const { body, domain_requested, ip, method, params, url } = req.body;

  try {
    const savedRequest = await createRequestModel({
      body,
      ip,
      method,
      params,
      url,
      domain_requested,
    });
    console.log("new Request saved on requests table with the data: ", savedRequest);
    res.status(201).json({ data: savedRequest });
  } catch (err) {
    next(err);
  }
};

export { requests as requestsController };
