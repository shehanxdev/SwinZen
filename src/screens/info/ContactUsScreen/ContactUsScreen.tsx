import React from 'react';
import { Text, View } from 'react-native';

import { Link } from '@sz/components';
import { tw } from '@sz/config';
import { NavigationService } from '@sz/services';

import { BaseScreen } from './../../../screens/account/components';

export function ContactUsScreen() {
  return (
    <BaseScreen>
      <View style={tw`m-auto`}>
        <Text style={tw`m-10`}>Contact Us Screen</Text>
        <Link text="Go Back" onPress={() => NavigationService.goBack()} />
      </View>
    </BaseScreen>
  );
}
