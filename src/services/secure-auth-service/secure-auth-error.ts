type SecureAuthErrorCodes =
  | 'AUTHENTICATED_USER_PRESENCE_AUTH_FAILED'
  | 'AUTHENTICATED_USER_PRESENCE_SETUP_FAILED'
  | 'UPDATE_TOKENS_FAILED'
  | 'UNEXPECTED_ERROR';

export class SecureAuthError<T> extends Error {
  public message: SecureAuthErrorCodes;
  public data?: T;
  constructor(message: SecureAuthErrorCodes, data?: T) {
    super(message);

    this.message = message;
    this.data = data;
  }
}
