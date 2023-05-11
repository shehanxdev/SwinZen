import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { tw } from '@sz/config';
import { Color, Route, SortDataType } from '@sz/constants';
import { useFetch } from '@sz/hooks';
import { NavigationService, PricePlansService } from '@sz/services';

import { BasePricePlansScreen, PlanSubscriptionCard } from '../components';

const TEST_ID_PREFIX = 'PricePlansScreen';

export function PricePlansScreen() {
  const { data, isLoading } = useFetch(() => PricePlansService.getPricePlans(SortDataType.PRICE));

  return (
    <BasePricePlansScreen testID={`${TEST_ID_PREFIX}`}>
      {/* TODO:: added temporary loader, have to add proper loader */}
      {isLoading ? (
        <View style={tw`flex-1`}>
          <ActivityIndicator size="small" color={Color.Neutral.White} />
        </View>
      ) : (
        <View style={tw`mt-4 mx-6.25`}>
          {data &&
            data.results.map(item => (
              <View key={item.id} style={tw`my-2`}>
                <PlanSubscriptionCard
                  testID={`${TEST_ID_PREFIX}-SubscriptionCard`}
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
        </View>
      )}
    </BasePricePlansScreen>
  );
}
