import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';

export class PermissionService {
  static async requestNotificationsPermission(): Promise<boolean> {
    const isIOS = Platform.OS === 'ios';
    if (isIOS) {
      try {
        const authStatus = await messaging().requestPermission();
        const granted =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        return granted;
      } catch (error) {
        return false;
      }
    } else {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS, {
          title: 'Notification Permission',
          message: 'This app needs permission to send push notifications.',
          buttonPositive: 'Ok',
        });

        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (error) {
        return false;
      }
    }
  }
}
