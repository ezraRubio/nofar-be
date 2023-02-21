import { NextFunction, Request, Response } from "express";
import { ErrorCodes } from "./error.codes";
import { AppError } from "./error.module";

interface ErrorHandler {
  (
    error: Error | AppError,
    request: Request,
    response: Response,
    next: NextFunction
  ): void;
}

export const httpErrorHandler: ErrorHandler = (
  error: AppError,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const status = error.status;
  const { code, details, errors } = error;

  const res = {
    code: code || ErrorCodes.INTERNAL_SERVER_ERROR,
    ...(details ? { details } : {}),
    ...(errors ? { errors } : {}),
  };

  response.status(status).json(res);
};
