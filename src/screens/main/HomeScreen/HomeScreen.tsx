import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

import { tw } from '@sz/config';
import { Route } from '@sz/constants';
import { NavigationService, PermissionService, ToastService } from '@sz/services';
import { useDispatch, useSelector } from '@sz/stores';

import { BaseMainScreen } from '../components';

export function HomeScreen() {
  const initialLogin = useSelector(state => state.persistentUserStore.loginState) === 'initial';

  const dispatch = useDispatch();

  useEffect(() => {
    //TODO::add proper error pop up to the user
    PermissionService.requestNotificationsPermission().catch(console.error);

    /**
     * Delaying the invocation of the NavigationService.navigate() function within a setTimeout with a timeout set to 0.
     * This ensures that the Navigation object is fully initialized before invoking the navigation.
     */
    if (initialLogin) {
      setTimeout(() => NavigationService.navigate(Route.PricePlans), 0);
    } else {
      try {
        dispatch.userStore.getSubscription({});
      } catch (error) {
        ToastService.error({ message: 'Failed!', description: error.data.message });
      }
    }
  }, []);

  return (
    // TODO::remove this BaseAuthScreen and wrap with relative component
    <BaseMainScreen>
      <View style={tw`m-auto`}>
        <Text style={tw`m-10`}>Home Screen</Text>
      </View>
    </BaseMainScreen>
  );
}
