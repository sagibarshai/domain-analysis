import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "./bad-request";
import { BaseError } from "./base";
import { NotFoundError } from "./not-found";
import { ErrorResponse } from "./base/types";

export const errorHandler = (err: BaseError, req: Request, res: Response, next: NextFunction) => {
  console.log("Error occurred: ", err);
  if (err instanceof BadRequestError || err instanceof NotFoundError) return res.status(err.statusCode).json(err.parseErrors());
  const errorResponse: ErrorResponse = { errors: [{ message: "Something went wrong.." }], statusCode: 500 };
  return res.status(errorResponse.statusCode).json(errorResponse.errors);
};
