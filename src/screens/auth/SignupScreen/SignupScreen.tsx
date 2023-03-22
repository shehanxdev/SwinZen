import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';

import { tw } from '@sz/config';
import { Route } from '@sz/constants';
import { NavigationService } from '@sz/services';

export function SignupScreen() {
  return (
    <View style={tw`m-auto`}>
      <Text style={tw`m-20`}>Sign Up</Text>
      <Button
        style={tw`m-5`}
        mode="contained"
        onPress={() => NavigationService.navigate(Route.RegisterEmailVerification)}>
        Verify Email
      </Button>
      <Button style={tw`m-5`} mode="contained" onPress={() => NavigationService.navigate(Route.PrivacyPolicy)}>
        Privacy Policy
      </Button>
      <Button style={tw`m-5`} mode="contained" onPress={() => NavigationService.navigate(Route.TermsOfUse)}>
        Terms Of Use
      </Button>
      <Button style={tw`m-10`} mode="contained" onPress={() => NavigationService.navigate(Route.Login)}>
        Back to Login
      </Button>
    </View>
  );
}

export default SignupScreen;
