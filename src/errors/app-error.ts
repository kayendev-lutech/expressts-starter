export enum ErrorType {
  Validation = 'ValidationError',
  Database = 'DatabaseError',
  Auth = 'AuthError',
  NotFound = 'NotFoundError',
  Unknown = 'UnknownError',
}

export class AppError extends Error {
  public status: number;
  public type: ErrorType;
  public details?: any;

  constructor(type: ErrorType, message: string, status = 400, details?: any) {
    super(message);
    this.type = type;
    this.status = status;
    this.details = details;
  }
}