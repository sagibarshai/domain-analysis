import { ErrorResponse, CustomError } from "./types";

export abstract class BaseError {
  abstract parseErrors: () => { errors: ErrorResponse["errors"] };
  abstract statusCode: number;

  protected errors: CustomError[];
  constructor(errors: CustomError[]) {
    this.errors = errors;
  }
}
