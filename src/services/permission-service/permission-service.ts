/* eslint-disable import/no-extraneous-dependencies */
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';

export class PermissionService {
  static async requestNotificationsPermission() {
    const isIOS = Platform.OS === 'ios';
    if (isIOS) {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    } else {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS, {
        title: 'Notification Permission',
        message: 'This app needs permission to send push notifications.',
        buttonPositive: 'Ok',
      });

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Permission granted');
      } else {
        console.log('Permission denied');
      }
    }
  }
}
