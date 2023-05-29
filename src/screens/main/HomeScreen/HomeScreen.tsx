import React, { useEffect } from 'react';
import { Platform, Text, View } from 'react-native';

import { tw } from '@sz/config';
import { PermissionService } from '@sz/services';
import { useDispatch, useSelector } from '@sz/stores';

import { BaseMainScreen } from '../components';
import { DataChart } from './components/DataChart/DataChart';
import { ProfileImageBanner } from './components/ProfileImageBanner';

export function HomeScreen() {
  const dispatch = useDispatch();

  const loading = useSelector(state => state.loading.effects.userStore.fetchUserProfileData);
  const useData = useSelector(state => state.userStore.profileData);

  // To request notifications permissions
  useEffect(() => {
    //TODO::add proper error pop up to the user
    PermissionService.requestNotificationsPermission().catch(console.error);

    //fetch user profile data
    dispatch.userStore.fetchUserProfileData();
  }, []);

  return (
    // TODO::remove this BaseAuthScreen and wrap with relative component
    <BaseMainScreen>
      {loading ? (
        <Text style={tw`m-10`}>Loading</Text>
      ) : (
        //NOTE::There is an issue with the headerTransparent option with IOS devices which causes header height to be ingored by the content. This is a tempory workaround to get rid of that.
        <View style={[tw`mx-4`, { ...(Platform.OS === 'android' && { marginTop: 28 }) }]}>
          <ProfileImageBanner />
          {/* TODO::fix positioning ambiguity issue*/}
          <View style={tw`mt-16.25`}>
            <DataChart
              overall={{ passes: 10, fails: 5, label: 'overall' }}
              setup={{ passes: 6, fails: 5, label: 'overall' }}
              backswing={{ passes: 6, fails: 5, label: 'overall' }}
              downswing={{ passes: 6, fails: 5, label: 'overall' }}
            />
          </View>
          <Text style={tw`m-10`}>Home Screen - {JSON.stringify(useData)}</Text>
        </View>
      )}
    </BaseMainScreen>
  );
}
