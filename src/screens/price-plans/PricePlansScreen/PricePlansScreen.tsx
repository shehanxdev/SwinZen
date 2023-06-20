import { ParamListBase } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { EmitterSubscription, View } from 'react-native';
import {
  ProductPurchase,
  SubscriptionPurchase,
  endConnection,
  finishTransaction,
  getSubscriptions,
  initConnection,
  purchaseUpdatedListener,
} from 'react-native-iap';

import { tw } from '@sz/config';
import { Route, SortDataType } from '@sz/constants';
import { useFetch } from '@sz/hooks';
import { NavigationService, PricePlansService } from '@sz/services';
import { useDispatch, useSelector } from '@sz/stores';

import { PlanSubscriptionCard } from '../components';
import { BaseScreen } from './../../components';

const TEST_ID_PREFIX = 'PricePlansScreenTestID';

export function PricePlansScreen({ navigation }: StackScreenProps<ParamListBase>) {
  const dispatch = useDispatch();

  const setLoginState = dispatch.persistentUserStore.setLoginState;

  const userPlan = useSelector(state => state.userStore.userPlan);

  const { data: plansData, isLoading } = useFetch(() => PricePlansService.getPricePlans(SortDataType.PRICE));

  const getAllSubscriptions = async () => {
    try {
      const subscriptions = await getSubscriptions({
        skus: [],
      });

      console.log(subscriptions);
    } catch (error) {
      //
    }
  };

  // const subscribe = async (sku: any) => {
  //   try {
  //     requestSubscription({ sku });
  //   } catch (error) {
  //     if (error instanceof PurchaseError) {
  //       //
  //     } else {
  //       //
  //     }
  //   }
  // };

  useEffect(() => {
    setLoginState('subsequent');
    dispatch.userStore.getSubscription({}).catch(console.error);
  }, []);

  useEffect(() => {
    const unsubscribeFocusEvent = navigation.addListener('focus', () => {
      initConnection()
        .then(() => {
          getAllSubscriptions();
        })
        .catch(e => console.log(e));
    });

    return unsubscribeFocusEvent;
  }, [navigation]);

  useEffect(() => {
    const unsubscribeRemoveEvent = navigation.addListener('beforeRemove', () => {
      endConnection();
    });

    return unsubscribeRemoveEvent;
  }, [navigation]);

  useEffect(() => {
    const unsubscribePurchaseEvent: EmitterSubscription = purchaseUpdatedListener(
      async (purchase: ProductPurchase | SubscriptionPurchase) => {
        const receipt = purchase.transactionReceipt
          ? purchase.transactionReceipt
          : (purchase as unknown as { originalJson: string }).originalJson;

        if (receipt) {
          try {
            const acknowledgeResult = await finishTransaction({ purchase });

            console.info('acknowledgeResult', acknowledgeResult);
          } catch (error) {
            //
          }
        }
      },
    );

    return unsubscribePurchaseEvent?.remove();
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
