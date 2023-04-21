import React, { useEffect } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';

import { tw } from '@sz/config';
import { Color } from '@sz/constants';
import { useDispatch, useSelector } from '@sz/stores';

import { BasePricePlansScreen, SubscriptionCard } from '../components';

export function PricePlansScreen() {
  const dispatch = useDispatch();

  const loading = useSelector(state => state.loading.effects.pricePlansStore.getPricePlans);
  const pricePlans = useSelector(state => state.pricePlansStore.pricePlans);

  // response result has annual plan as the first plan, so need to reverse order
  const orderedPricePlans = [...pricePlans].reverse();

  useEffect(() => {
    dispatch.pricePlansStore.getPricePlans();
  }, []);

  return (
    <BasePricePlansScreen testID="PricePlansScreenTestID">
      {/* TODO:: added temporary loader, have to add proper loader */}
      {loading ? (
        <View style={tw`flex-1`}>
          <ActivityIndicator size="small" color={Color.Neutral.White} />
        </View>
      ) : (
        <ScrollView style={tw`mt-4.5`}>
          {orderedPricePlans.map((data, index) => (
            <View key={index} style={tw`my-2`}>
              <SubscriptionCard
                title={data.name}
                subTitle={data.description}
                price={data.price}
                pricingDescription={data.frequency}
                featureList={data.features}
              />
            </View>
          ))}
        </ScrollView>
      )}
    </BasePricePlansScreen>
  );
}
