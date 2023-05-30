import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';

export class PermissionService {
  static async requestNotificationsPermission(): Promise<boolean> {
    const hasPermission = await messaging().hasPermission();

    if (hasPermission === messaging.AuthorizationStatus.AUTHORIZED) return true;

    const isIOS = Platform.OS === 'ios';
    if (isIOS) {
      try {
        const authStatus = await messaging().requestPermission();
        return (
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL
        );
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
