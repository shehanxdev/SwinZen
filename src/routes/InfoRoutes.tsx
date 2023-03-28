import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import { BackIcon } from '@sz/components';
import { tw } from '@sz/config';
import { Route, TextAlignment } from '@sz/constants';
import { PrivacyPolicyScreen, TermsOfUseScreen } from '@sz/screens';
import { NavigationService } from '@sz/services';

export type InfoStackParamList = {
  [Route.PrivacyPolicy]: {
    // Can be used for future props
  };
  [Route.TermsOfUse]: {
    // Can be used for future props
  };
};

const Stack = createNativeStackNavigator<InfoStackParamList>();

export function InfoStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        title: '',
        headerShown: true,
        headerTitleStyle: tw`flex-1 text-white text-[21px] font-bold text-center`,
        headerTitleAlign: TextAlignment.Center,
        headerBackTitleVisible: false,
        headerTransparent: true,
        headerLeft: () => (
          <TouchableOpacity onPress={() => NavigationService.goBack()}>
            <BackIcon />
          </TouchableOpacity>
        ),
      }}>
      <Stack.Screen name={Route.PrivacyPolicy} component={PrivacyPolicyScreen} options={{ title: 'Privacy policy' }} />
      <Stack.Screen name={Route.TermsOfUse} component={TermsOfUseScreen} options={{ title: 'Terms of use' }} />
    </Stack.Navigator>
  );
}
