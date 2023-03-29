/**
 * The common structure for all API responses.
 * TODO:::refactor only if this cannot be shared between the domains(Auth, etc....)
 */
export interface BaseResponse {
  /**
   * Status code of the request
   */
  statusCode: string;

  /**
   * User readable status of the request
   */
  message: string;
}

export interface ApiResponse<T> extends BaseResponse {
  /*
   * Response data specific to the request
   */
  data: T;
}

export interface ApiErrorResponse<T> extends BaseResponse {
  /*
   * Error data specific to the request
   */
  error: T;
}
