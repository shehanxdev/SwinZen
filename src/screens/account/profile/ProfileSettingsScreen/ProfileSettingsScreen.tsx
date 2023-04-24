import React from 'react';
import { Text, View } from 'react-native';

import { Button, Link } from '@sz/components';
import { tw } from '@sz/config';
import { Route } from '@sz/constants';
import { NavigationService } from '@sz/services';

import { BaseScreen } from '../../components';

export function ProfileSettingsScreen() {
  return (
    <BaseScreen>
      <View style={tw`m-auto`}>
        <Text style={tw`m-10`}>Profile Settings Screen</Text>
        <Link text="Go Back" onPress={() => NavigationService.goBack()} />
        <Button title={'Change password'} onPress={() => NavigationService.navigate(Route.ChangePassword)} />
      </View>
    </BaseScreen>
  );
}
