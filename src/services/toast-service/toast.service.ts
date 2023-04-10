import { showMessage } from 'react-native-flash-message';

import { Color } from '@sz/constants';

export class ToastService {
  /**
   * Show success toast alert
   *
   * @param title {String}  Alert title text
   * @param description {String}   Alert body text
   */
  public static success(message: string, description: string) {
    showMessage({
      message: message,
      description: description,
      backgroundColor: Color.Primary.SzSuccess,
    });
  }

  /**
   * Show information toast alert
   *
   * @param title {String}  Alert title text
   * @param description {String}   Alert body text
   */
  public static information(message: string, description: string) {
    showMessage({
      message: message,
      description: description,
      backgroundColor: Color.Primary.SzInfo,
    });
  }

  /**
   * Show error toast alert
   *
   * @param title {String}  Alert title text
   * @param description {String}   Alert body text
   */
  public static error(message: string, description: string) {
    showMessage({
      message: message,
      description: description,
      backgroundColor: Color.Primary.SzError,
    });
  }

  /**
   * Show warning toast alert
   *
   * @param title {String}  Alert title text
   * @param description {String}   Alert body text
   */
  public static warning(message: string, description: string) {
    showMessage({
      message: message,
      description: description,
      backgroundColor: Color.Primary.SzWarning,
    });
  }
}
