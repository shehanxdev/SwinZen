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

export interface ApiResponse<Data> extends BaseResponse {
  /*
   * Response data specific to the request
   */
  data: Data;
}

export interface ApiErrorResponse<Error> extends BaseResponse {
  /*
   * Error data specific to the request
   */
  error: Error;
}
