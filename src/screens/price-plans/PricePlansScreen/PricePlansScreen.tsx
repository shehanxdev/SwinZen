import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { tw } from '@sz/config';
import { Color, Route } from '@sz/constants';
import { useFetch } from '@sz/hooks';
import { PricePlansService } from '@sz/services';
import { NavigationService } from '@sz/services';

import { BasePricePlansScreen, CustomHeader, SubscriptionCard } from '../components';

export function PricePlansScreen({ route }) {
  const { data, isLoading } = useFetch(PricePlansService.getPricePlans);

  // TODO:: when user press the PricePlan screen button on profile settings screen, make sure to pass any dummy param in navigation
  // Registration flow PricePlan heander back button should be routed into MainStack and profile settings screen to PricePlan screen header back button should be riuted into profile settings screen
  const params = route.params;

  return (
    <BasePricePlansScreen testID="PricePlansScreenTestID">
      <CustomHeader
        title="Join us today!"
        onBackPress={() => (params ? NavigationService.goBack() : NavigationService.navigate(Route.MainStack))}
      />
      {/* TODO:: added temporary loader, have to add proper loader */}
      {isLoading ? (
        <View style={tw`flex-1`}>
          <ActivityIndicator size="small" color={Color.Neutral.White} />
        </View>
      ) : (
        <View style={tw`mt-10 mx-6.25`}>
          {data &&
            data.results.map((data, index) => (
              <View key={index} style={tw`my-2`}>
                <SubscriptionCard
                  title={data.name}
                  price={data.price}
                  frequency={data.frequency}
                  featureList={data.features}
                  betterValue={data.banner}
                />
              </View>
            ))}
        </View>
      )}
    </BasePricePlansScreen>
  );
}
