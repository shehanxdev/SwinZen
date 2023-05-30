import React from 'react';
import { View } from 'react-native';

import { Button, Link, Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, Route, TextVariant } from '@sz/constants';
import { NavigationService } from '@sz/services';

import { BaseAccountScreen } from '../../components';
import { ProfileImageUpload, ProfileInfoCard } from './components';

export function ProfileSettingsScreen() {
  return (
    <BaseAccountScreen testID="ProfileSettingsScreenTestID">
      <View style={tw`mt-14.5 mx-4`}>
        <ProfileImageUpload />
        <View style={tw`mt-6 mb-12`}>
          <Text color={Color.Primary.Sz100} variant={TextVariant.SubTitle2SemiBold}>
            Marshall Williams
          </Text>
        </View>
        <View style={tw`mb-10.5`}>
          <Button
            title={'Upgrade Your Plan'}
            onPress={() => {
              NavigationService.navigate(Route.PricePlans);
            }}
          />
        </View>
        <ProfileInfoCard>
          <Text color={Color.Neutral.Sz100} variant={TextVariant.Body1SemiBold}>
            Email address
          </Text>
          <Text color={Color.Neutral.Sz100} variant={TextVariant.Body2Regular}>
            Marshall Williams31@gmail.com
          </Text>
          <View style={tw`flex-row mt-6 justify-between w-full`}>
            <Text color={Color.Neutral.Sz100} variant={TextVariant.Body1SemiBold}>
              Password
            </Text>
            <View style={tw`mt-1`}>
              <Link
                text="Change"
                onPress={() => {
                  NavigationService.navigate(Route.ChangePassword);
                }}
              />
            </View>
          </View>
          <Text color={Color.Neutral.Sz100} variant={TextVariant.Body2Regular}>
            ***********
          </Text>
        </ProfileInfoCard>
        <ProfileInfoCard>
          <View style={tw`flex-row justify-between w-full`}>
            <Text color={Color.Neutral.Sz100} variant={TextVariant.Body1SemiBold}>
              My subscription
            </Text>
            <View style={tw`mt-1`}>
              <Link
                text="Change"
                onPress={() => {
                  NavigationService.navigate(Route.PricePlans);
                }}
              />
            </View>
          </View>
          <View style={tw`flex-row justify-between w-full mt-7`}>
            <Text color={Color.Neutral.Sz100} variant={TextVariant.SubTitle2SemiBold}>
              Annual plan
            </Text>
            <Text color={Color.Neutral.Sz100} variant={TextVariant.Body1SemiBold}>
              $99.99
            </Text>
          </View>
          <View style={tw`flex-row justify-between w-full mt-3`}>
            <Text color={Color.Neutral.Sz100} variant={TextVariant.Body2Regular}>
              Subscription date
            </Text>
            <Text color={Color.Neutral.Sz100} variant={TextVariant.Body2Regular}>
              09.21.2021
            </Text>
          </View>
          <View style={tw`flex-row justify-between w-full mt-1`}>
            <Text color={Color.Neutral.Sz100} variant={TextVariant.Body2Regular}>
              Payment method
            </Text>
            <Text color={Color.Neutral.Sz100} variant={TextVariant.Body2Regular}>
              Credit Card
            </Text>
          </View>
          <View style={tw`flex-row justify-between w-full mt-1`}>
            <Text color={Color.Neutral.Sz100} variant={TextVariant.Body2Regular}>
              Next payment date
            </Text>
            <Text color={Color.Neutral.Sz100} variant={TextVariant.Body2Regular}>
              09.21.2022
            </Text>
          </View>
        </ProfileInfoCard>
      </View>
    </BaseAccountScreen>
  );
}
