import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';

import { tw } from '@config';
import { Route } from '@constants';
import { NavigationService } from '@services';

export const LoginScreen = () => {
  return (
    <View style={tw`m-auto`}>
      <Text style={tw`m-10`}>Login</Text>
      <Button mode="contained" onPress={() => NavigationService.navigate(Route.Signup)}>
        Sign Up
      </Button>
    </View>
  );
};

export default LoginScreen;
