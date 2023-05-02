import React from 'react';
import { Text, View } from 'react-native';

import { Link } from '@sz/components';
import { tw } from '@sz/config';
import { NavigationService } from '@sz/services';

import { BaseAccountScreen } from '../components';

export function FollowersScreen() {
  return (
    <BaseAccountScreen>
      <View style={tw`m-auto`}>
        <Text style={tw`m-10`}>Followers Screen</Text>
        <Link text="Go Back" onPress={() => NavigationService.goBack()} />
      </View>
    </BaseAccountScreen>
  );
}
