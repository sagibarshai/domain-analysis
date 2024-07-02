import { ValidationError } from "express-validator";
import { BaseError } from "../base";
import { CustomError } from "../base/types";

export class NotFoundError extends BaseError {
  statusCode = 404;
  constructor(errors: CustomError[]) {
    const customErrors: CustomError[] = [{ message: "Route not found" }];
    super(customErrors);
  }
  parseErrors = () => ({ errors: this.errors });
}
