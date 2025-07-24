export enum ErrorCode {
  ERR_001 = 'ERR_001', // Validation
  ERR_002 = 'ERR_002', // Database
  ERR_003 = 'ERR_003', // Auth
  ERR_004 = 'ERR_004', // NotFound
  ERR_005 = 'ERR_005', // Unknown
  ERR_006 = 'ERR_006', // Conflict
  ERR_007 = 'ERR_007', // Forbidden
  ERR_008 = 'ERR_008', // Unauthorized
  ERR_009 = 'ERR_009', // NotFoundResource
  ERR_010 = 'ERR_010', // TokenExpired
  ERR_011 = 'ERR_011', // PermissionDenied
  // Thêm các mã lỗi khác nếu cần
}

export const ErrorDetails: Record<ErrorCode, { en: string; vi: string }> = {
  [ErrorCode.ERR_001]: { en: 'Validation error', vi: 'Lỗi xác thực dữ liệu' },
  [ErrorCode.ERR_002]: { en: 'Database error', vi: 'Lỗi cơ sở dữ liệu' },
  [ErrorCode.ERR_003]: { en: 'Authentication error', vi: 'Lỗi xác thực' },
  [ErrorCode.ERR_004]: { en: 'Not found', vi: 'Không tìm thấy' },
  [ErrorCode.ERR_005]: { en: 'Unknown error', vi: 'Lỗi không xác định' },
  [ErrorCode.ERR_006]: { en: 'Conflict', vi: 'Xung đột dữ liệu' },
  [ErrorCode.ERR_007]: { en: 'Forbidden', vi: 'Không được phép' },
  [ErrorCode.ERR_008]: { en: 'Unauthorized', vi: 'Không có quyền truy cập' },
  [ErrorCode.ERR_009]: { en: 'Resource not found', vi: 'Không tìm thấy tài nguyên' },
  [ErrorCode.ERR_010]: { en: 'Token expired', vi: 'Token đã hết hạn' },
  [ErrorCode.ERR_011]: { en: 'Permission denied', vi: 'Từ chối quyền truy cập' },
};

export class AppError extends Error {
  public status: number;
  public code: ErrorCode;
  public details?: any;
  public message_vi?: string;

  constructor(code: ErrorCode, message: string, status = 400, details?: any) {
    super(message);
    this.code = code;
    this.status = status;
    this.details = details;
    this.message_vi = ErrorDetails[code]?.vi || '';
  }
}

export class BadRequestException extends AppError {
  constructor(message = ErrorDetails[ErrorCode.ERR_001].en, details?: any) {
    super(ErrorCode.ERR_001, message, 400, details);
  }
}

export class UnauthorizedException extends AppError {
  constructor(message = ErrorDetails[ErrorCode.ERR_008].en, details?: any) {
    super(ErrorCode.ERR_008, message, 401, details);
  }
}

export class ForbiddenException extends AppError {
  constructor(message = ErrorDetails[ErrorCode.ERR_007].en, details?: any) {
    super(ErrorCode.ERR_007, message, 403, details);
  }
}

export class ConflictException extends AppError {
  constructor(message = ErrorDetails[ErrorCode.ERR_006].en, details?: any) {
    super(ErrorCode.ERR_006, message, 409, details);
  }
}

export class NotFoundException extends AppError {
  constructor(message = ErrorDetails[ErrorCode.ERR_004].en, details?: any) {
    super(ErrorCode.ERR_004, message, 404, details);
  }
}

export class InternalServerErrorException extends AppError {
  constructor(message = ErrorDetails[ErrorCode.ERR_005].en, details?: any) {
    super(ErrorCode.ERR_005, message, 500, details);
  }
}