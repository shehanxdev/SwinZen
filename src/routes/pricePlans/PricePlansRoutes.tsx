import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Text } from '@sz/components';
import { Route, TextAlignment, TextVariant } from '@sz/constants';
import { PlanDetailsScreen, PricePlansScreen } from '@sz/screens';

import { HeaderBackButton } from '../components';

export type PricePlansStackParamList = {
  [Route.PricePlans]: {
    // Can be used for future props
  };
  [Route.PlanDetails]: {
    // Can be used for future props
  };
};

const Stack = createNativeStackNavigator<PricePlansStackParamList>();

export function PricePlansStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: TextAlignment.Center,
        headerBackVisible: false,
        headerBackTitleVisible: false,
        headerTransparent: true,
        headerTitle: ({ children }) => <Text variant={TextVariant.SubTitle2SemiBold}>{children}</Text>,
        headerLeft: () => <HeaderBackButton />,
      }}>
      <Stack.Screen name={Route.PricePlans} component={PricePlansScreen} options={{ title: 'Join us today!' }} />
      <Stack.Screen name={Route.PlanDetails} component={PlanDetailsScreen} options={{ title: '' }} />
    </Stack.Navigator>
  );
}
