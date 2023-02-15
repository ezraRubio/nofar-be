import {ErrorCodes} from "./error.codes";
import {ErrorType} from "./error.types";

export interface SchemaValidationError {
  key: string;
  path: string;
  value: string;
}

export class AppError extends Error {
  type: ErrorType;
  details?: unknown;
  code: ErrorCodes;
  errors?: SchemaValidationError[];
}

export class UnprocessableDataError extends AppError {
  constructor(
    public code: ErrorCodes,
    public details: unknown,
    public errors?: SchemaValidationError[]
  ) {
    super();
  }
}
