import React from 'react';
import { View } from 'react-native';

import { Button, Link, Text } from '@sz/components';
import { szdayjs, tw } from '@sz/config';
import { Color, Route, TextVariant } from '@sz/constants';
import { NavigationService } from '@sz/services';
import { useSelector } from '@sz/stores';

import { BaseAccountScreen } from '../../components';
import { ProfileImageUpload, ProfileInfoCard } from './components';

export function ProfileSettingsScreen() {
  const userData = useSelector(state => state.userStore.userData);
  const userPlan = useSelector(state => state.userStore.userPlan);

  return (
    <BaseAccountScreen testID="ProfileSettingsScreenTestID">
      <View style={tw`mt-14.5 mx-4`}>
        <ProfileImageUpload />
        <View style={tw`mt-6 mb-12`}>
          <Text color={Color.Primary.Sz100} variant={TextVariant.SubTitle2SemiBold}>
            {userData?.name}
          </Text>
          <Text color={Color.Primary.Sz100} variant={TextVariant.Body1SemiBold}>
            {userData?.city}
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
            {userData?.email}
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
              {userPlan?.plan.name}
            </Text>
            <Text color={Color.Neutral.Sz100} variant={TextVariant.Body1SemiBold}>
              {'$' + userPlan?.plan.price}
            </Text>
          </View>
          <View style={tw`flex-row justify-between w-full mt-3`}>
            <Text color={Color.Neutral.Sz100} variant={TextVariant.Body2Regular}>
              Subscription date
            </Text>
            <Text color={Color.Neutral.Sz100} variant={TextVariant.Body2Regular}>
              {szdayjs(userPlan?.startDate).format('DD.MM.YYYY')}
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
              {szdayjs(userPlan?.endDate).format('DD.MM.YYYY')}
            </Text>
          </View>
        </ProfileInfoCard>
      </View>
    </BaseAccountScreen>
  );
}
