import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';

import { tw } from '@sz/config';
import { Route } from '@sz/constants';
import { NavigationService } from '@sz/services';

export function ForgotPasswordScreen() {
  return (
    <View style={tw`m-auto`}>
      <Text style={tw`m-10`}>Forgot Password</Text>
      <Button mode="contained" onPress={() => NavigationService.navigate(Route.Login)}>
        Back to Login
      </Button>
    </View>
  );
}

export default ForgotPasswordScreen;
