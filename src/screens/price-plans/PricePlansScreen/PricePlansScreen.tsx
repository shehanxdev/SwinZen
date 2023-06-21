import React, { useEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import {
  Subscription as InAppPurchaseSubscriptionType,
  flushFailedPurchasesCachedAsPendingAndroid,
  getSubscriptions,
  initConnection,
} from 'react-native-iap';

import { tw } from '@sz/config';
import { Route, SortDataType, subscriptionsSku } from '@sz/constants';
import { useFetch } from '@sz/hooks';
import { FinalPlanData, Plan } from '@sz/models';
import { NavigationService, PricePlansService, ToastService } from '@sz/services';
import { useDispatch, useSelector } from '@sz/stores';

import { PlanSubscriptionCard } from '../components';
import { BaseScreen } from './../../components';

const TEST_ID_PREFIX = 'PricePlansScreenTestID';

function findProductIdByPrice(inAppPuchaseSubscriptions: any, targetPrice: number) {
  for (let i = 0; i < inAppPuchaseSubscriptions.length; i++) {
    if (inAppPuchaseSubscriptions[i].price == targetPrice) {
      return inAppPuchaseSubscriptions[i].productId;
    }
  }
  return ''; // Return empty string if the target price is not found::Edge case for free plan
}

//This function will map the subscriptions received from the BE and inAppPurchase subscriptions in order to create the final subscription list.
//need a refactor from the BE side in order to do a proper mapping.
//Current implementation map and create the final subscriptions using the price.
//TODO::This behaviour should be refactored using both FE and BE.
function mapSubscriptionData(
  plans: Plan[],
  inAppPuchaseSubscriptions: InAppPurchaseSubscriptionType[],
): FinalPlanData[] {
  return plans.map(plan => {
    return {
      ...plan,
      productId: findProductIdByPrice(inAppPuchaseSubscriptions, plan.price),
    };
  });
}

export function PricePlansScreen() {
  const dispatch = useDispatch();

  const [finalSubscriptionData, setFinalSubscriptionData] = useState<Array<FinalPlanData>>([]);

  const setLoginState = dispatch.persistentUserStore.setLoginState;

  const userPlan = useSelector(state => state.userStore.userPlan);

  const { data: plansData, isLoading } = useFetch(() => PricePlansService.getPricePlans(SortDataType.PRICE));

  useEffect(() => {
    setLoginState('subsequent');
    dispatch.userStore.getSubscription({}).catch(console.error);
  }, []);

  useEffect(() => {
    //This function will return all in App Purchases ubscriptions configured in play console and appstoreconnect
    //These subscription should be mapped along side the subscriptions received from the BE in order to create the final subscription list
    const getInAppPurchaseSubscriptions = async () => {
      try {
        await initConnection();

        if (Platform.OS === 'android') {
          await flushFailedPurchasesCachedAsPendingAndroid();
        }

        const subscriptions = await getSubscriptions({
          skus: subscriptionsSku,
        });
        const mappedSubscriptionData = mapSubscriptionData(plansData.results, subscriptions);
        setFinalSubscriptionData(mappedSubscriptionData);
      } catch (e) {
        console.log(e);
        ToastService.error({ message: 'Error!', description: 'Some went wrong!' });
      }
    };

    if (plansData !== undefined) {
      getInAppPurchaseSubscriptions();
    }
  }, [plansData]);

  return (
    <BaseScreen testID={`${TEST_ID_PREFIX}`} isLoading={isLoading || finalSubscriptionData.length === 0}>
      <View style={tw`mt-4 mx-6.25`}>
        {finalSubscriptionData.map(item => (
          <View key={item.id} style={tw`my-2`}>
            <PlanSubscriptionCard
              testID={`${TEST_ID_PREFIX}-SubscriptionCard`}
              selected={userPlan?.plan.id === item.id}
              title={item.name}
              price={item.price}
              frequency={item.frequency}
              featureList={item.features}
              betterValue={item.banner}
              onCardPress={() => {
                NavigationService.navigate(Route.PlanDetails, { item });
              }}
            />
          </View>
        ))}
      </View>
    </BaseScreen>
  );
}
