/**
 * The common structure for all API responses.
 */
export interface BaseResponse {
  /**
   * Status code of the request
   */
  statusCode: number;

  /**
   * User readable status of the request
   */
  message: string | string[];
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

  //TODO::These error related data will be recieved only within the auth flow requiests. Create domain specific ApiErrorResponse
  errorCode?: 'INACTIVE_USER' | 'OTP_TO_MANY_REQUEST'; //TODO::extract to a model
  nextActionToken?: string;
}
