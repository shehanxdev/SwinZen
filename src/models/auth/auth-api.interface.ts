/**
 * The common structure for all auth API responses.
 * TODO::refactor this is use within other domains if possible after sync with the Back End
 */
export interface AuthApiBaseResponse {
  /**
   * Status code of the request
   */
  statusCode: string;

  /**
   * User readable status of the request
   */
  message: string;
}

export interface AuthApiResponses<Data> extends AuthApiBaseResponse {
  /*
   * Response data specific to the request
   */
  data: Data;
}

export interface AuthApiErrorResponses<Error> extends AuthApiBaseResponse {
  /*
   * Error data specific to the request
   */
  error: Error;
}
