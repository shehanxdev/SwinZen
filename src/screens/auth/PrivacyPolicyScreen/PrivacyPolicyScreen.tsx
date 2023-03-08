import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';

import { tw } from '@config';
import { Route } from '@constants';
import { NavigationService } from '@services';

export const PrivacyPolicyScreen = () => {
  return (
    <View style={tw`m-auto`}>
      <Text style={tw`m-10`}>Privacy Policy</Text>
      <Button mode="contained" onPress={() => NavigationService.navigate(Route.Signup)}>
        Back to Signup
      </Button>
    </View>
  );
};

export default PrivacyPolicyScreen;
