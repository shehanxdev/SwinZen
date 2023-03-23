import React from 'react';
import { Image, ScrollView, View } from 'react-native';

import { IMAGES } from '@sz/assets';
import {
  AccountLockIcon,
  Button,
  Link,
  MailIcon,
  PasswordRevealIcon,
  ProfileIcon,
  SecurityIcon,
  Text,
  TextField,
} from '@sz/components';
import { tw } from '@sz/config';
import { Route, TextVariant } from '@sz/constants';
import { NavigationService } from '@sz/services';

import { GradientBackground } from '../components/GradientBackground';

export function SignupScreen() {
  return (
    <GradientBackground>
      <View style={tw`flex-1 justify-between`} testID="SignupScreenTestID">
        <View style={tw`flex mt-20 mx-5`}>
          <View style={tw`items-center`}>
            {/*TODO:: Remove this images and replace with SVG later*/}
            <Image source={IMAGES.footerLogo} />
          </View>
          <View style={tw`items-center`}>
            <View style={tw`mt-3 mb-10`}>
              <Text variant={TextVariant.SubTitle2SemiBold}>Register with us</Text>
            </View>
          </View>
        </View>
        <ScrollView style={tw`flex-1 mx-5`}>
          <TextField label="Your Name" leftIcon={<ProfileIcon />} />
          <TextField label="Your Email" leftIcon={<MailIcon />} />
          <TextField label="Your Password" leftIcon={<AccountLockIcon />} rightIcon={<PasswordRevealIcon />} />
          <TextField
            label="Please Confirm Your Password"
            leftIcon={<AccountLockIcon />}
            rightIcon={<PasswordRevealIcon />}
          />
          <TextField label="Your Promotion Code" leftIcon={<SecurityIcon />} />
        </ScrollView>
        <View style={tw`items-center mt-10 mb-5 mx-5`}>
          <View style={tw`mb-2`}>
            <Button
              onPress={() => {
                //TODO:: Implement with the API integration
              }}
              title={'Register'}
            />
          </View>
          <Text variant={TextVariant.Body2Regular}>
            Already have an account?
            <Link
              text=" Sign in"
              onPress={() => {
                NavigationService.navigate(Route.Login);
              }}
            />
          </Text>
        </View>
      </View>
    </GradientBackground>
  );
}
