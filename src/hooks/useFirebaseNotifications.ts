import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';

import { PermissionService } from '@sz/services';
import { useDispatch, useSelector } from '@sz/stores';

export function useFirebaseNotifications() {
  const user = useSelector(state => state.userStore.userData);
  const dispatch = useDispatch();

  const registerAppWithFCM = async () => {
    try {
      const token = await messaging().getToken();
      if (token && !user.fcmTokens.includes(token)) {
        await dispatch.userStore.patchUserData({ fcmTokens: [token] });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onFCMTokenUpdate = async (token: string) => {
    try {
      await dispatch.userStore.patchUserData({ fcmTokens: [token] });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    PermissionService.requestNotificationsPermission().catch(console.error);
    registerAppWithFCM().catch(console.error);

    const unsubscribe = messaging().onTokenRefresh(onFCMTokenUpdate);

    return () => {
      unsubscribe();
    };
  }, []);
}
