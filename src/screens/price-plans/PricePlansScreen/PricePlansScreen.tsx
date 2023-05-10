import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';

import { BackIcon } from '@sz/components';
import { tw } from '@sz/config';
import { Color, Route, SortDataType } from '@sz/constants';
import { useFetch } from '@sz/hooks';
import { NavigationService, PricePlansService } from '@sz/services';

import { BasePricePlansScreen, PlanSubscriptionCard } from '../components';

export function PricePlansScreen({ route }) {
  const navigation = useNavigation();
  const { data, isLoading } = useFetch(() => PricePlansService.getPricePlans(SortDataType.PRICE));

  // TODO:: when user press the PricePlan screen button on profile settings screen, make sure to pass any dummy param in navigation
  // Registration flow PricePlan heander back button should be routed into MainStack and profile settings screen to PricePlan screen header back button should be riuted into profile settings screen
  const params = route.params;

  // custom action for navigation header back button
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => (params ? NavigationService.goBack() : NavigationService.navigate(Route.MainStack))}>
          <BackIcon />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <BasePricePlansScreen testID="PricePlansScreenTestID">
      {/* TODO:: added temporary loader, have to add proper loader */}
      {isLoading ? (
        <View style={tw`flex-1`}>
          <ActivityIndicator size="small" color={Color.Neutral.White} />
        </View>
      ) : (
        <View style={tw`mt-4 mx-6.25`}>
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
        </View>
      )}
    </BasePricePlansScreen>
  );
}
