import { SecureAuthService } from './SecureAuthService';

export class SecureAuthServiceInstance {
  private static secureAuthServiceInstance: SecureAuthService;

  public static setSecureAuthServiceInstance = (instance: SecureAuthService) => {
    SecureAuthServiceInstance.secureAuthServiceInstance = instance;
  };

  public static getSecureAuthServiceInstance = () => {
    if (!SecureAuthServiceInstance.secureAuthServiceInstance) {
      throw new Error('Secure auth service is not defined. Set the service instance prior to this call.');
    }
    return SecureAuthServiceInstance.secureAuthServiceInstance;
  };
}
