import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { tw } from '@sz/config';
import { Color, Route, SortDataType } from '@sz/constants';
import { NavigationService, ToastService } from '@sz/services';
import { useDispatch, useSelector } from '@sz/stores';

import { BasePricePlansScreen, PlanSubscriptionCard } from '../components';

const TEST_ID_PREFIX = 'PricePlansScreenTestID';

export function PricePlansScreen() {
  const dispatch = useDispatch();

  const setLoginState = dispatch.persistentUserStore.setLoginState;

  const isLoading = useSelector(state => state.loading.effects.pricePlansStore.getPricePlans);
  const userPlan = useSelector(state => state.userStore.userPlan);
  const plansData = useSelector(state => state.pricePlansStore.pricePlans);

  const getPlans = async () => {
    await dispatch.userStore.getSubscription({});
    dispatch.pricePlansStore.getPricePlans(SortDataType.PRICE);
  };

  useEffect(() => {
    setLoginState('subsequent');
    getPlans().catch(console.error);
  }, []);

  useEffect(() => {
    //TODO:: will be removed when SWIN-610 ticket is addressed
    // if there is no user plan selected user automatically registering under free plan
    if (!userPlan && plansData) {
      const freePlan = plansData.find(item => item.price === 0);
      try {
        dispatch.userStore.addSubscription({ planId: freePlan.id });
      } catch (error) {
        ToastService.error({ message: 'Failed!', description: error.data.message });
      } finally {
        dispatch.userStore.getSubscription({});
      }
    }
  }, [plansData]);

  return (
    <BasePricePlansScreen testID={`${TEST_ID_PREFIX}`}>
      {/* TODO:: added temporary loader, have to add proper loader */}
      {isLoading ? (
        <View style={tw`flex-1`}>
          <ActivityIndicator size="small" color={Color.Neutral.White} />
        </View>
      ) : (
        <View style={tw`mt-4 mx-6.25`}>
          {plansData?.map(item => (
            <View key={item.id} style={tw`my-2`}>
              <PlanSubscriptionCard
                testID={`${TEST_ID_PREFIX}-SubscriptionCard`}
                selected={userPlan?.plan.id === item.id}
                title={item.name}
                price={item.price}
                frequency={item.frequency}
                featureList={item.features}
                betterValue={item.banner}
                onCardPress={() => NavigationService.navigate(Route.PlanDetails, { item })}
              />
            </View>
          ))}
        </View>
      )}
    </BasePricePlansScreen>
  );
}
