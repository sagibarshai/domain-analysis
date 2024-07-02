import { Request, Response } from "express";
import { NotFoundError } from "../../errors/not-found";

const notFound = (req: Request, res: Response) => {
  const errors = [{ message: "Route not found" }];
  const responseObject = new NotFoundError(errors);
  return res.status(responseObject.statusCode).json(responseObject.parseErrors());
};
export { notFound as notFoundMiddleware };
