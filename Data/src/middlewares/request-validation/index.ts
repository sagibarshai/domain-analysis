import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { BadRequestError } from "../../errors/bad-request";

const requestValidationError = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorsArray = errors.array();
    const responseError = new BadRequestError(errorsArray);
    return next(responseError);
  }
  next();
};
export { requestValidationError as requestValidationErrorMiddleware };
