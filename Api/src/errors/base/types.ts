export interface CustomError {
  message: string;
  field?: string;
  location?: string;
}

export interface ErrorResponse {
  errors: CustomError[];
  statusCode: number;
}
