import React from 'react';
import { Text, View } from 'react-native';
import RNRestart from 'react-native-restart';

import { Button } from '@sz/components';
import { tw } from '@sz/config';

interface UnexpectedErrorScreenProps {
  error: Error;
  resetError: any;
}

//TODO::This is dummy screen. Replace with a relevant screen.
export function UnexpectedErrorScreen({ error, resetError }: UnexpectedErrorScreenProps) {
  return (
    <View style={tw`m-20`}>
      <Text style={tw`m-10`}>UnexpectedError Screen</Text>
      <Text>{error.toString()}</Text>
      <View style={tw`mt-2`} />
      <Button onPress={resetError} title={'Try again'} />
      <View style={tw`mt-2`} />
      <Button
        title={'Reload App'}
        onPress={() => {
          RNRestart.restart();
        }}
      />
    </View>
  );
}
