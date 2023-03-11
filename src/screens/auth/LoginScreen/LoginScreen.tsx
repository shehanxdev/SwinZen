import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';

import { tw } from '@sz/config';
import { Route } from '@sz/constants';
import { NavigationService } from '@sz/services';

export function LoginScreen() {
  return (
    <View style={tw`m-auto`}>
      <Text style={tw`m-10`}>Login</Text>
      <Button mode="contained" onPress={() => NavigationService.navigate(Route.Signup)}>
        Sign Up
      </Button>
    </View>
  );
}

export default LoginScreen;
