import React from 'react';
import { View } from 'react-native';

import { Button, Link, Text } from '@sz/components';
import { tw } from '@sz/config';
import { Route, TextVariant } from '@sz/constants';
import { NavigationService } from '@sz/services';

import { OTPInput } from '../components';
import { BaseAuthScreen } from '../components/BaseAuthScreen';

export function ResetPasswordEmailVerificationScreen() {
  return (
    <BaseAuthScreen>
      <View style={tw`flex-1 justify-between`} testID="ResetPasswordEmailVerificationScreenContainerTestID">
        <View style={tw`mt-[267px] mx-5`}>
          <View style={tw`items-center`}>
            <View style={tw`mt-3 mb-5`}>
              <Text variant={TextVariant.SubTitle2SemiBold}>Email verification</Text>
            </View>
            <View style={tw`mb-13`}>
              <Text variant={TextVariant.Body2Regular}>
                {/*TODO::remove hardcoded values when integrating APIs*/}
                Enter the code received in your email address s**t**z@gmail.com
              </Text>
            </View>
          </View>
          <OTPInput
            onChangeValue={value => {
              console.log(value); //TODO::use these value when integrating APIs
            }}
          />
        </View>
        <View style={tw`items-center mb-5 items-center mx-5`}>
          <View style={tw`mb-3`}>
            <Button
              onPress={() => {
                NavigationService.navigate(Route.ResetPassword);
              }}
              title={'Verify'}
            />
          </View>
          <Link text={'Resend the code'} />
        </View>
      </View>
    </BaseAuthScreen>
  );
}
