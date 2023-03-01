import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

import { tw } from '@config';
import { Route } from '@constants';
import { NavigationService } from '@services';

export function LoginScreen() {
  return (
    <View style={tw`m-auto`}>
      <Button mode="contained" onPress={() => NavigationService.navigate(Route.Signup)}>
        Navigate to sign up
      </Button>
    </View>
  );
}

export default LoginScreen;
