import React from 'react';
import { Image, View } from 'react-native';

import { Button, Link, Text } from '@sz/components';
import { tw } from '@sz/config';
import { TextVariant } from '@sz/constants';

import { OTPInput } from '../components';

export function EmailVerificationScreen() {
  return (
    <View style={tw`flex-1 justify-between`} testID="EmailVerificationScreenContainerTestID">
      <View style={tw`mt-20 mx-5`}>
        <View style={tw`items-center`}>
          {/*TODO::remove this image and replace with SVG once the svg configurations get merged*/}
          <Image source={require('./../../../assets/logo/swingzen-logo.png')} />
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
        <View style={tw`mt-30 mb-3`}>
          <Button
            onPress={() => {
              //TODO::handle navigation
            }}
            title={'Verify'}
          />
        </View>
        <View style={tw`items-center`}>
          <Link text={'Resend the code'} />
        </View>
      </View>
      <View style={tw`items-center mb-5 items-center`}>
        <Text variant={TextVariant.Body2Regular}>
          By continuing, you agree to our <Link text={'Privacy Policy'} /> and our <Link text="Terms of Use" />
          {/* TODO::handle link on press redirects */}
        </Text>
      </View>
    </View>
  );
}
