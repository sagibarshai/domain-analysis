import { ValidationError } from "express-validator";
import { BaseError } from "../base";
import { CustomError } from "../base/types";

export class BadRequestError extends BaseError {
  statusCode = 400;
  constructor(errors: ValidationError[]) {
    const customErrors: CustomError[] = errors.map((err) => ({
      message: err.msg,
      field: err.type === "field" ? err.path : undefined,
      location: err.type === "field" ? err.location : undefined,
    }));

    super(customErrors);
  }
  parseErrors = () => ({ errors: this.errors });
}
