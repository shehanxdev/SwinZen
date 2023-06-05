import React from 'react';
import { Text, View } from 'react-native';

import { tw } from '@sz/config';

import { BaseUploadScreen } from '../components';

export function PreValidationScreen() {
  return (
    <BaseUploadScreen>
      <View style={tw`m-auto`}>
        <Text style={tw`m-10 text-white`}>PreValidation Screen</Text>
      </View>
    </BaseUploadScreen>
  );
}
