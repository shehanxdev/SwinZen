import React from 'react';
import { View } from 'react-native';
import RNRestart from 'react-native-restart';

import { Button, Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextVariant } from '@sz/constants';

import { BaseScreen } from './../../components';

interface UnexpectedErrorScreenProps {
  error: Error;
  resetError: any;
}

export function UnexpectedErrorScreen({ resetError }: UnexpectedErrorScreenProps) {
  return (
    // TODO:::This BaseAuthScreen should be renamed and sharable among the multiple domains without repeating the code. Update here once this done.
    <BaseScreen>
      <View style={tw`flex-1 items-center mx-5 justify-between`}>
        <View style={tw`m-auto`}>
          <View style={tw`mb-6`}>
            <Text variant={TextVariant.SubTitle1}>Something went wrong!</Text>
          </View>
          <Text variant={TextVariant.Body2Regular}>
            OH NO! Error occurred. Click Try Again button to have another go or click Reload App. If this keeps
            happening please try contacting our team.
          </Text>
        </View>
        <View style={tw`mb-5`}>
          <View style={tw`mb-4`}>
            <Button onPress={resetError} title={'try again'} />
          </View>
          <Button
            borderColor={Color.Primary.Sz650}
            backgroundColor={Color.Transparency.full}
            textColor={Color.Tertiary.Sz900}
            activeStateBackgroundColor={Color.Primary.Sz400} //NOTE::not defined within the design system.
            title={'reload app'}
            onPress={() => {
              RNRestart.restart();
            }}
          />
        </View>
      </View>
    </BaseScreen>
  );
}
