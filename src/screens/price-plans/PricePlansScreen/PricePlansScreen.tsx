import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { tw } from '@sz/config';
import { Color, Route, SortDataType } from '@sz/constants';
import { useFetch } from '@sz/hooks';
import { NavigationService, PricePlansService } from '@sz/services';
import { useDispatch } from '@sz/stores';

import { BasePricePlansScreen, PlanSubscriptionCard } from '../components';

const TEST_ID_PREFIX = 'PricePlansScreenTestID';

export function PricePlansScreen() {
  const { data, isLoading } = useFetch(() => PricePlansService.getPricePlans(SortDataType.PRICE));

  const setLoginState = useDispatch().persistentUserStore.setLoginState;

  useEffect(() => {
    setLoginState('subsequent');
  }, []);

  return (
    <BasePricePlansScreen testID={`${TEST_ID_PREFIX}`}>
      {/* TODO:: added temporary loader, have to add proper loader */}
      {isLoading ? (
        <View style={tw`flex-1`}>
          <ActivityIndicator size="small" color={Color.Neutral.White} />
        </View>
      ) : (
        <View style={tw`mt-4 mx-6.25`}>
          {data?.results.map(item => (
            <View key={item.id} style={tw`my-2`}>
              <PlanSubscriptionCard
                testID={`${TEST_ID_PREFIX}-SubscriptionCard`}
                title={item.name}
                price={item.price}
                frequency={item.frequency}
                featureList={item.features}
                betterValue={item.banner}
                onCardPress={
                  item.price === 0
                    ? () => NavigationService.navigate(Route.MainStack)
                    : () => NavigationService.navigate(Route.PlanDetails, { item })
                }
              />
            </View>
          ))}
        </View>
      )}
    </BasePricePlansScreen>
  );
}
