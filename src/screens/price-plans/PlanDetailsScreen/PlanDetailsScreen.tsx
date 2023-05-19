import React from 'react';
import { View } from 'react-native';

import { Button, PricePlanFeatureListTickIcon, Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, Route, TextAlignment, TextVariant } from '@sz/constants';
import { Plan } from '@sz/models';
import { NavigationService } from '@sz/services';

import { BasePricePlansScreen } from '../components';

const TEST_ID_PREFIX = 'PlanDetailsScreen';

export function PlanDetailsScreen({ route }) {
  const data = route.params.params.item as Plan;

  const onProceed = () => {
    //TODO:: handle payment proceed and change routes later
    NavigationService.navigate(Route.MainStack);
    console.log('Pressed Payment Proceed');
  };

  return (
    <BasePricePlansScreen testID={TEST_ID_PREFIX}>
      <View style={tw`flex-1 justify-between mx-4`}>
        <View style={tw`mx-5 flex-1`}>
          <View style={tw`mt-2`}>
            <Text variant={TextVariant.Labels}>You have chosen the</Text>
          </View>
          <View style={tw`mt-1`}>
            <Text variant={TextVariant.SubTitle1}>{data.name}</Text>
          </View>
          <View style={tw`mt-10`}>
            <Text variant={TextVariant.Body2Regular}>{data.description}</Text>
          </View>
          <View style={tw`mt-4`}>
            {data.features.map((feature, index) => {
              return (
                <View
                  style={tw`flex-row justify-center items-center gap-2 mt-2`}
                  key={`${TEST_ID_PREFIX}-Feature-${index}`}>
                  <PricePlanFeatureListTickIcon />
                  <Text textAlign={TextAlignment.Center} variant={TextVariant.Labels} color={Color.Neutral.Sz100}>
                    {feature}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
        <View style={tw`items-center mb-5`}>
          <View style={tw`flex-row gap-2 items-center`}>
            <Text variant={TextVariant.Heading1} color={Color.Neutral.Sz100}>
              {`$${data.price}`}
            </Text>
            <View style={tw`mt-6`}>
              <Text variant={TextVariant.Body2Regular} color={Color.Neutral.Sz100}>
                {data.frequency !== undefined && '/' + data.frequency}
              </Text>
            </View>
          </View>
          <View style={tw`mt-16 mb-3`}>
            <Button onPress={onProceed} title="proceed to pay" testID={`${TEST_ID_PREFIX}-PayButton`} />
          </View>
        </View>
      </View>
    </BasePricePlansScreen>
  );
}
