import React, { useEffect } from 'react';
import { View } from 'react-native';

import { tw } from '@sz/config';
import { Route, SortDataType } from '@sz/constants';
import { useFetch } from '@sz/hooks';
import { NavigationService, PricePlansService } from '@sz/services';
import { useDispatch, useSelector } from '@sz/stores';

import { PlanSubscriptionCard } from '../components';
import { BaseScreen } from './../../components';

const TEST_ID_PREFIX = 'PricePlansScreenTestID';

export function PricePlansScreen() {
  const dispatch = useDispatch();

  const setLoginState = dispatch.persistentUserStore.setLoginState;

  const userPlan = useSelector(state => state.userStore.userPlan);

  const { data: plansData, isLoading } = useFetch(() => PricePlansService.getPricePlans(SortDataType.PRICE));

  useEffect(() => {
    setLoginState('subsequent');
    dispatch.userStore.getSubscription({}).catch(console.error);
  }, []);

  return (
    <BaseScreen testID={`${TEST_ID_PREFIX}`} isLoading={isLoading}>
      <View style={tw`mt-4 mx-6.25`}>
        {plansData?.results.map(item => (
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
    </BaseScreen>
  );
}
