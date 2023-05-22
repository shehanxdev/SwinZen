import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Text } from '@sz/components';
import { Route, TextAlignment, TextVariant } from '@sz/constants';
import {
  AboutUsScreen,
  ContactUsScreen,
  FAQScreen,
  PrivacyPolicyScreen,
  TermsOfUseScreen,
  UTAInfoEightScreen,
  UTAInfoElevenScreen,
  UTAInfoFiveScreen,
  UTAInfoFourScreen,
  UTAInfoNineScreen,
  UTAInfoOneScreen,
  UTAInfoSevenScreen,
  UTAInfoSixScreen,
  UTAInfoTenScreen,
  UTAInfoThirteenScreen,
  UTAInfoThreeScreen,
  UTAInfoTwelveScreen,
  UTAInfoTwoScreen,
} from '@sz/screens';

import { HeaderBackButton } from '../components';

export type InfoStackParamList = {
  [Route.AboutUs]: {
    // Can be used for future props
  };
  [Route.ContactUs]: {
    // Can be used for future props
  };
  [Route.FAQ]: {
    // Can be used for future props
  };
  [Route.PrivacyPolicy]: {
    // Can be used for future props
  };
  [Route.TermsOfUse]: {
    // Can be used for future props
  };

  [Route.UsingTheAppInfoEight]: {
    // Can be used for future props
  };
  [Route.UsingTheAppInfoEleven]: {
    // Can be used for future props
  };
  [Route.UsingTheAppInfoFive]: {
    // Can be used for future props
  };
  [Route.UsingTheAppInfoFour]: {
    // Can be used for future props
  };
  [Route.UsingTheAppInfoNine]: {
    // Can be used for future props
  };
  [Route.UsingTheAppInfoOne]: {
    // Can be used for future props
  };
  [Route.UsingTheAppInfoSeven]: {
    // Can be used for future props
  };
  [Route.UsingTheAppInfoSix]: {
    // Can be used for future props
  };
  [Route.UsingTheAppInfoTen]: {
    // Can be used for future props
  };
  [Route.UsingTheAppInfoThirteen]: {
    // Can be used for future props
  };
  [Route.UsingTheAppInfoThree]: {
    // Can be used for future props
  };
  [Route.UsingTheAppInfoTwelve]: {
    // Can be used for future props
  };
  [Route.UsingTheAppInfoTwo]: {
    // Can be used for future props
  };
};

const Stack = createNativeStackNavigator<InfoStackParamList>();

export function InfoStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: TextAlignment.Center,
        headerBackTitleVisible: false,
        headerBackVisible: false,
        headerTransparent: true,
        headerTitle: ({ children }) => <Text variant={TextVariant.SubTitle2SemiBold}>{children}</Text>,
        headerLeft: () => <HeaderBackButton />,
      }}>
      <Stack.Screen name={Route.AboutUs} component={AboutUsScreen} options={{ title: 'What is SwingZen?' }} />
      <Stack.Screen name={Route.ContactUs} component={ContactUsScreen} options={{ title: 'Contact us' }} />
      <Stack.Screen name={Route.FAQ} component={FAQScreen} options={{ title: 'FAQ' }} />
      <Stack.Screen name={Route.PrivacyPolicy} component={PrivacyPolicyScreen} options={{ title: 'Privacy policy' }} />
      <Stack.Screen name={Route.TermsOfUse} component={TermsOfUseScreen} options={{ title: 'Terms of use' }} />

      <Stack.Screen
        name={Route.UsingTheAppInfoEight}
        component={UTAInfoEightScreen}
        options={{ title: 'Swing Analysis Results' }}
      />
      <Stack.Screen
        name={Route.UsingTheAppInfoEleven}
        component={UTAInfoElevenScreen}
        options={{ title: 'Pass/Fail' }}
      />
      <Stack.Screen
        name={Route.UsingTheAppInfoFive}
        component={UTAInfoFiveScreen}
        options={{ title: 'Video Processing Time' }}
      />
      <Stack.Screen
        name={Route.UsingTheAppInfoFour}
        component={UTAInfoFourScreen}
        options={{ title: 'Uploading A Video' }}
      />
      <Stack.Screen name={Route.UsingTheAppInfoNine} component={UTAInfoNineScreen} options={{ title: 'Swing Data' }} />
      <Stack.Screen
        name={Route.UsingTheAppInfoOne}
        component={UTAInfoOneScreen}
        options={{ title: 'How To Use The App' }}
      />
      <Stack.Screen
        name={Route.UsingTheAppInfoSeven}
        component={UTAInfoSevenScreen}
        options={{ title: 'Failed Reviews' }}
      />
      <Stack.Screen
        name={Route.UsingTheAppInfoSix}
        component={UTAInfoSixScreen}
        options={{ title: 'Successful Reviews' }}
      />
      <Stack.Screen
        name={Route.UsingTheAppInfoTen}
        component={UTAInfoTenScreen}
        options={{ title: 'Swing Priority List' }}
      />
      <Stack.Screen
        name={Route.UsingTheAppInfoThirteen}
        component={UTAInfoThirteenScreen}
        options={{ title: 'Swing Analysis Report' }}
      />
      <Stack.Screen
        name={Route.UsingTheAppInfoThree}
        component={UTAInfoThreeScreen}
        options={{ title: 'Shooting Hacks' }}
      />
      <Stack.Screen
        name={Route.UsingTheAppInfoTwelve}
        component={UTAInfoTwelveScreen}
        options={{ title: 'AI-Pro Tips' }}
      />
      <Stack.Screen
        name={Route.UsingTheAppInfoTwo}
        component={UTAInfoTwoScreen}
        options={{ title: 'Shooting Environments' }}
      />
    </Stack.Navigator>
  );
}
