import { MessageOptions, showMessage } from 'react-native-flash-message';

import { Color } from '@sz/constants';

type ToastParams = {
  message: string;
  description: string | string[];
  otherConfigs?: Omit<MessageOptions, 'message' | 'description'>;
};

/*
 * This contains all the variants of toasts("success", "warning",etc...) as static methods
 * Further can be expand to have more variants
 */
export abstract class ToastService {
  /*
   * Generates an final error message with bullet points only if the description message consists multiple errors(ex: array of errors)
   *
   * @param description {String|string[]}
   */
  private static generateCustomErrorDescription(description: string | string[]) {
    if (typeof description == 'string') return description;
    if (description.length === 1) return description[0];

    let customErrorDescription = '';

    for (let message of description) {
      customErrorDescription += `• ${message} \n`;
    }

    return customErrorDescription;
  }

  /**
   * Show success toast alert
   *
   * @param title {String}  Alert title text
   * @param description {String}   Alert body text
   * @param otherConfigs {Partial<MessageOptions>}   Partially picked props from 'react-native-flash-message' that can be use to further modify the toast
   */
  public static success({ message, description, otherConfigs }: ToastParams) {
    showMessage({
      message: message,
      description: ToastService.generateCustomErrorDescription(description),
      backgroundColor: Color.Primary.SzSuccess,
      ...otherConfigs,
    });
  }

  /**
   * Show information toast alert
   *
   * @param title {String}  Alert title text
   * @param description {String}   Alert body text
   * @param otherConfigs {Partial<MessageOptions>}   Partially picked props from 'react-native-flash-message' that can be use to further modify the toast
   */
  public static information({ message, description, otherConfigs }: ToastParams) {
    showMessage({
      message: message,
      description: ToastService.generateCustomErrorDescription(description),
      backgroundColor: Color.Primary.SzInfo,
      ...otherConfigs,
    });
  }

  /**
   * Show error toast alert
   *
   * @param title {String}  Alert title text
   * @param description {String}   Alert body text
   * @param otherConfigs {Partial<MessageOptions>}   Partially picked props from 'react-native-flash-message' that can be use to further modify the toast
   */
  public static error({ message, description, otherConfigs }: ToastParams) {
    showMessage({
      message: message,
      description: ToastService.generateCustomErrorDescription(description),
      backgroundColor: Color.Primary.SzError,
      ...otherConfigs,
    });
  }

  /**
   * Show warning toast alert
   *
   * @param title {String}  Alert title text
   * @param description {String}   Alert body text
   * @param otherConfigs {Partial<MessageOptions>}   Partially picked props from 'react-native-flash-message' that can be use to further modify the toast
   */
  public static warning({ message, description, otherConfigs }: ToastParams) {
    showMessage({
      message: message,
      description: ToastService.generateCustomErrorDescription(description),
      backgroundColor: Color.Primary.SzWarning,
      ...otherConfigs,
    });
  }
}
