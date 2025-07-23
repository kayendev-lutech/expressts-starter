export enum ErrorCode {
  ERR_001 = 'ERR_001', // Validation
  ERR_002 = 'ERR_002', // Database
  ERR_003 = 'ERR_003', // Auth
  ERR_004 = 'ERR_004', // NotFound
  ERR_005 = 'ERR_005', // Unknown
  ERR_006 = 'ERR_006', // Conflict
  ERR_007 = 'ERR_007', // Forbidden
  ERR_008 = 'ERR_008', // Unauthorized
}

export class AppError extends Error {
  public status: number;
  public code: ErrorCode;
  public details?: any;

  constructor(code: ErrorCode, message: string, status = 400, details?: any) {
    super(message);
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

export class BadRequestException extends AppError {
  constructor(message = 'Bad Request', details?: any) {
    super(ErrorCode.ERR_001, message, 400, details);
  }
}

export class UnauthorizedException extends AppError {
  constructor(message = 'Unauthorized', details?: any) {
    super(ErrorCode.ERR_008, message, 401, details);
  }
}

export class ForbiddenException extends AppError {
  constructor(message = 'Forbidden', details?: any) {
    super(ErrorCode.ERR_007, message, 403, details);
  }
}

export class ConflictException extends AppError {
  constructor(message = 'Conflict', details?: any) {
    super(ErrorCode.ERR_006, message, 409, details);
  }
}

export class InternalServerErrorException extends AppError {
  constructor(message = 'Internal Server Error', details?: any) {
    super(ErrorCode.ERR_005, message, 500, details);
  }
}