import React from 'react';
import { View } from 'react-native';

import { Button, PricePlanFeatureListTickIcon, Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, Route, TextAlignment, TextVariant } from '@sz/constants';
import { Plan } from '@sz/models';
import { NavigationService, ToastService } from '@sz/services';
import { useDispatch } from '@sz/stores';

import { BaseScreen } from './../../components';

const TEST_ID_PREFIX = 'PlanDetailsScreen';

export function PlanDetailsScreen({ route }) {
  const data = route.params.params.item as Plan;
  const dispatch = useDispatch();

  const onProceed = async (data: Plan) => {
    try {
      await dispatch.userStore.addSubscription({ planId: data.id });
      //TODO:: handle payments for paid plans
      NavigationService.navigate(Route.HomeTab);
    } catch (error) {
      ToastService.error({ message: 'Failed!', description: error.data.message });
    } finally {
      await dispatch.userStore.getSubscription({});
    }
  };

  return (
    <BaseScreen testID={TEST_ID_PREFIX}>
      <View style={tw`flex-1 justify-between mx-4`}>
        <View style={tw`flex-1`}>
          <View style={tw`mt-2`}>
            <Text variant={TextVariant.Labels}>You have chosen the</Text>
          </View>
          <View style={tw`mt-1`}>
            <Text variant={TextVariant.SubTitle1}>{data.name}</Text>
          </View>
          <View style={tw`items-start`}>
            <View style={tw`mt-10`}>
              <Text variant={TextVariant.Body2Regular}>{data.description + ':'}</Text>
            </View>
            <View style={tw`mx-6 mt-3 items-start`}>
              {data.actions?.map(feature => {
                return (
                  <View style={tw`flex-row gap-2 mt-2`} key={`${TEST_ID_PREFIX}-Feature-${feature}`}>
                    <View style={tw`mt-1.5`}>
                      <PricePlanFeatureListTickIcon />
                    </View>
                    <Text textAlign={TextAlignment.Left} variant={TextVariant.Labels} color={Color.Neutral.Sz100}>
                      {feature}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
        <View style={tw`items-center mt-18 mb-5`}>
          <View style={tw`flex-row gap-2 items-center`}>
            <Text variant={TextVariant.Heading1} color={Color.Neutral.Sz100}>
              {`$${data.price}`}
            </Text>
            <View style={tw`mt-6`}>
              <Text variant={TextVariant.Body2Regular} color={Color.Neutral.Sz100}>
                {data.price === 0 ? '' : '/ ' + data.frequency}
              </Text>
            </View>
          </View>
          <View style={tw`mt-8 mb-3`}>
            <Button
              onPress={() => onProceed(data)}
              title={data.price === 0 ? 'next' : 'proceed to pay'}
              testID={`${TEST_ID_PREFIX}-PayButton`}
            />
          </View>
        </View>
      </View>
    </BaseScreen>
  );
}
