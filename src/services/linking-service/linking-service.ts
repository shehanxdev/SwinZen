import { Linking } from 'react-native';

export class LinkingService {
  public static linkingMail(email: string): any {
    try {
      Linking.openURL(`mailto:${email}`);
    } catch {
      console.log('Unable to initialize mail service');
    }
  }

  public static linkingPhoneCall(phonenumber: string): any {
    try {
      Linking.openURL(`tel:${phonenumber}`);
    } catch {
      console.log('Unable to initialize call service');
    }
  }
}
