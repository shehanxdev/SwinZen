import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Card } from 'react-native-paper';
import tw from 'twrnc';

import { PricePlanFeatureListTickIcon } from '@sz/components';
import { Text } from '@sz/components';
import { Color, TextAlignment, TextVariant } from '@sz/constants';

export interface SubscriptionCardProps {
  testID?: string;
  title: string;
  price: number;
  frequency: string;
  featureList: string[];
  onCardPress?: () => void;
  betterValue?: boolean;
}

export function SubscriptionCard({
  testID = 'SubscriptionCardTestID',
  title,
  price,
  frequency,
  featureList,
  onCardPress,
  betterValue = false,
}: SubscriptionCardProps) {
  return (
    <TouchableOpacity testID={testID} onPress={onCardPress}>
      <Card style={tw`bg-[${Color.Primary.Sz700}]/50 rounded-2.5 content-center`}>
        {betterValue && (
          <View style={tw`bg-[${Color.Tertiary.Sz900}] h-6.25 w-fit rounded-t-2.5`}>
            <Text variant={TextVariant.Labels} color={Color.Primary.Sz900}>
              Better value!
            </Text>
          </View>
        )}
        <View style={tw`my-7.5`}>
          <Text variant={TextVariant.SubTitle2SemiBold} color={Color.Primary.Sz100}>
            {title}
          </Text>
          <View style={tw`flex-row justify-center items-center gap-2`}>
            <Text variant={TextVariant.Heading3} color={Color.Tertiary.Sz900}>
              {`$${price}`}
            </Text>
            <Text variant={TextVariant.Body2Regular} color={Color.Neutral.Sz100}>
              {frequency}
            </Text>
          </View>
          <View style={tw`bg-[${Color.Neutral.Sz700}] self-center mt-3.5 h-0.25 w-61`} />
          <View style={tw`mt-3.75`}>
            {featureList.map((feature, index) => {
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
      </Card>
    </TouchableOpacity>
  );
}
