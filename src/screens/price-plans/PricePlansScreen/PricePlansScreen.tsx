import React from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';

import { tw } from '@sz/config';
import { Color, Route, SortDataType } from '@sz/constants';
import { useFetch } from '@sz/hooks';
import { NavigationService, PricePlansService } from '@sz/services';

import { BasePricePlansScreen, CustomHeader, PlanSubscriptionCard } from '../components';

export function PricePlansScreen({ route }) {
  const { data, isLoading } = useFetch(() => PricePlansService.getPricePlans(SortDataType.PRICE));

  // TODO:: when user press the PricePlan screen button on profile settings screen, make sure to pass any dummy param in navigation
  // Registration flow PricePlan heander back button should be routed into MainStack and profile settings screen to PricePlan screen header back button should be riuted into profile settings screen
  const params = route.params;

  return (
    <BasePricePlansScreen testID="PricePlansScreenTestID" wrapWithScrollView={false}>
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
        <ScrollView style={tw`mt-10 mx-6.25`}>
          {data &&
            data.results.map((item, index) => (
              <View key={index} style={tw`my-2`}>
                <PlanSubscriptionCard
                  title={item.name}
                  price={item.price}
                  frequency={item.frequency}
                  featureList={item.features}
                  betterValue={item.banner}
                  onCardPress={
                    item.frequency
                      ? () => NavigationService.navigate(Route.PlanDetails, { item })
                      : () => NavigationService.navigate(Route.MainStack)
                  }
                />
              </View>
            ))}
        </ScrollView>
      )}
    </BasePricePlansScreen>
  );
}
