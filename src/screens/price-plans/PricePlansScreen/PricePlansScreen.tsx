import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { tw } from '@sz/config';
import { Color, Route, SortDataType } from '@sz/constants';
import { useFetch } from '@sz/hooks';
import { NavigationService, PricePlansService, ToastService } from '@sz/services';
import { useDispatch, useSelector } from '@sz/stores';

import { BasePricePlansScreen, PlanSubscriptionCard } from '../components';

const TEST_ID_PREFIX = 'PricePlansScreenTestID';

export function PricePlansScreen() {
  const { data, isLoading } = useFetch(() => PricePlansService.getPricePlans(SortDataType.PRICE));

  const dispatch = useDispatch();

  const setLoginState = dispatch.persistentUserStore.setLoginState;

  const userPlan = useSelector(state => state.userStore.userPlan);

  useEffect(() => {
    setLoginState('subsequent');
  }, []);

  useEffect(() => {
    if (data) {
      dispatch.pricePlansStore.savePricePlans(data.results);

      // if there is no user plan selected user automatically registering under free plan
      if (!userPlan) {
        const freePlan = data.results.find(item => item.price === 0);
        try {
          dispatch.userStore.addSubscription({ planId: freePlan.id });
        } catch (error) {
          ToastService.error({ message: 'Failed!', description: error.data.message });
        } finally {
          dispatch.userStore.getSubscription({});
        }
      }
    }
  }, [data]);

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
                selected={userPlan?.plan.id === item.id}
                title={item.name}
                price={item.price}
                frequency={item.frequency}
                featureList={item.features}
                betterValue={item.banner}
                onCardPress={
                  item.price === 0
                    ? () => NavigationService.navigate(Route.HomeTab)
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
