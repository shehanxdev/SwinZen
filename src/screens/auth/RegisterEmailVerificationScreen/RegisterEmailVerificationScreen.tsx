import React from 'react';
import { View } from 'react-native';

import { Button, Link, SwingZenLogoIcon, Text } from '@sz/components';
import { tw } from '@sz/config';
import { Route, TextVariant } from '@sz/constants';
import { NavigationService } from '@sz/services';

import { BaseAuthScreen, OTPInput } from '../components';

export function RegisterEmailVerificationScreen() {
  return (
    <BaseAuthScreen>
      <View style={tw`flex-1 justify-between`} testID="RegisterEmailVerificationScreenContainerTestID">
        <View style={tw`mt-20 mx-5`}>
          <View style={tw`items-center`}>
            <SwingZenLogoIcon />
          </View>
          <View style={tw`items-center`}>
            <View style={tw`mt-3 mb-22.5`}>
              <Text variant={TextVariant.SubTitle2SemiBold}>Email verification</Text>
            </View>
            <View style={tw`mb-6`}>
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
          <View style={tw`items-end mt-2`}>
            <Link
              text="Resend the code"
              onPress={() => {
                //TODO::implement with the API integration
              }}
            />
          </View>
        </View>
        <View style={tw`items-center mb-5 items-center mx-5 mt-15`}>
          <View style={tw`mb-2`}>
            <Button
              onPress={() => {
                //TODO::implement with the API integration
              }}
              title="Verify"
            />
          </View>
          <Text variant={TextVariant.Body2Regular}>
            By continuing, you agree to our{' '}
            <Link
              text="Privacy Policy"
              onPress={() => {
                NavigationService.navigate(Route.PrivacyPolicy);
              }}
            />{' '}
            and our{' '}
            <Link
              text="Terms of Use"
              onPress={() => {
                NavigationService.navigate(Route.TermsOfUse);
              }}
            />
          </Text>
        </View>
      </View>
    </BaseAuthScreen>
  );
}
