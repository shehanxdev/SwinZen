import React from 'react';
import { View } from 'react-native';

import { Button } from '@sz/components';
import { tw } from '@sz/config';
import { Route } from '@sz/constants';
import { NavigationService } from '@sz/services';

import { BaseAccountScreen } from '../../components';
import { ProfileImageUpload } from './components';

export function ProfileSettingsScreen() {
  return (
    <BaseAccountScreen>
      <View style={tw`mt-14.5 mx-4 mb-20`}>
        <ProfileImageUpload />
      </View>
      {/* TODO::Add other component */}
      <Button
        title={'change password'}
        onPress={() => {
          NavigationService.navigate(Route.ChangePassword);
        }}
      />
    </BaseAccountScreen>
  );
}
