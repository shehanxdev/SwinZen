/**
 * The common structure for all API responses.
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

export interface ApiErrorResponse<T = string> extends BaseResponse {
  /*
   * Error data specific to the request
   */
  error: T;
}
