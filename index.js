/* eslint-disable import/no-extraneous-dependencies */

/**
 * @format
 */
import messaging from '@react-native-firebase/messaging';
import { AppRegistry } from 'react-native';

import { name as appName } from './app.json';
import Main from './src/main';

// Register background handler for messaging
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => Main);
