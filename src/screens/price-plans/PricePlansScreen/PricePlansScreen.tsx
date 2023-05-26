import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { tw } from '@sz/config';
import { Color, Route, SortDataType } from '@sz/constants';
import { useFetch } from '@sz/hooks';
import { NavigationService, PricePlansService } from '@sz/services';
import { useDispatch, useSelector } from '@sz/stores';

import { BasePricePlansScreen, PlanSubscriptionCard } from '../components';

const TEST_ID_PREFIX = 'PricePlansScreen';

export function PricePlansScreen() {
  const { data, isLoading } = useFetch(() => PricePlansService.getPricePlans(SortDataType.PRICE));

  const dispatch = useDispatch();

  const setLoginState = dispatch.persistentUserStore.setLoginState;
  const userPlan = useSelector(state => state.userStore.userPlan);

  useEffect(() => {
    setLoginState('subsequent');
    return () => {
      // if user press back button and enter the app, user is registering under the free plan
      if (!userPlan && data) {
        const freePlan = data?.results.find(item => item.price === 0);
        dispatch.userStore.addSubscription({ planId: freePlan.id });
      }
    };
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
                selected={userPlan?.id === item.id}
                title={item.name}
                price={item.price}
                frequency={item.frequency}
                featureList={item.features}
                betterValue={item.banner}
                onCardPress={
                  item.price === 0
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
