import React from 'react';
import { View } from 'react-native';

import { Button, PricePlanFeatureListTickIcon, Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, Route, TextAlignment, TextVariant } from '@sz/constants';
import { NavigationService } from '@sz/services';

import { BasePricePlansScreen } from '../components';

export function PlanDetailsScreen({ route }) {
  const data = route.params.params;
  console.log('$$$$$$$$$$', data);

  const onProceed = () => {
    //TODO:: handle payment proceed and change routes later
    NavigationService.navigate(Route.MainStack);
    console.log('Pressed Payment Proceed');
  };

  return (
    <BasePricePlansScreen testID="PlanDetailsScreenTestID">
      <View style={tw`flex-1 justify-between`}>
        <View style={tw`mx-5 flex-1 content-center items-center`}>
          <View style={tw`mt-20`}>
            <Text variant={TextVariant.Labels}>You have chosen the</Text>
          </View>
          <View style={tw`mt-1`}>
            <Text variant={TextVariant.SubTitle1}>{data.name}</Text>
          </View>
          <View style={tw`mt-10`}>
            <Text variant={TextVariant.Body2Regular}>{data.longDescription}</Text>
          </View>
          <View style={tw`mt-6`}>
            {data.featureList.map((feature, index) => {
              return (
                <View style={tw`flex-row justify-center items-center gap-2`} key={index}>
                  <View style={tw`mt-1`}>
                    <PricePlanFeatureListTickIcon />
                  </View>
                  <Text textAlign={TextAlignment.Center} variant={TextVariant.Labels} color={Color.Neutral.Sz100}>
                    {feature}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
        <View style={tw`items-center mb-5 content-center`}>
          <View style={tw`flex-row justify-center items-center gap-2`}>
            <Text variant={TextVariant.Heading1} color={Color.Neutral.Sz100}>
              {`$${data.price}`}
            </Text>
            <Text variant={TextVariant.Body2Regular} color={Color.Neutral.Sz100}>
              {data.frequency}
            </Text>
          </View>
          <View style={tw`mt-16 mb-3`}>
            <Button onPress={onProceed} title="PROCEED TO PAY" />
          </View>
        </View>
      </View>
    </BasePricePlansScreen>
  );
}
