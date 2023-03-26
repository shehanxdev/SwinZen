import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';

import { tw } from '@sz/config';
import { Route } from '@sz/constants';
import { NavigationService } from '@sz/services';

export function ResetPasswordScreen() {
  return (
    <View style={tw`m-auto`}>
      <Text style={tw`m-10`}>Reset Password Screen</Text>
      <Button mode="contained" onPress={() => NavigationService.navigate(Route.Signup)}>
        Back to Signup
      </Button>
    </View>
  );
}
