import * as React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Card } from 'react-native-paper';
import tw from 'twrnc';

import { PricePlanFeatureListTickIcon } from '@sz/components';
import { Button } from '@sz/components';
import { Text } from '@sz/components';
import { Color, TextAlignment, TextVariant } from '@sz/constants';

export interface SubscriptionCardProps {
  testID?: string;
  title: string;
  subTitle: string;
  loading?: boolean;
  price: number;
  pricingDescription: string;
  featureList: string[];
  buttonColor?: Color;
  onCardPress?: () => void;
  onGetStarted?: () => void;
  isSelected?: boolean;
}

export function SubscriptionCard({
  title,
  featureList,
  subTitle,
  price,
  pricingDescription,
  testID = 'SubscriptionCardTestID',
  onCardPress,
  onGetStarted,
  isSelected,
}: SubscriptionCardProps) {
  return (
    <Card
      onPress={onCardPress}
      testID={testID}
      style={tw`bg-[${Color.Transparency.full}] ${
        isSelected ? `border-[${Color.Neutral.Sz500}] border` : ''
      } shadow-none`}>
      <LinearGradient
        colors={['#8EFF001F', '#95FF101D', '#FFFFFF1F']} //TODO :: these colors are not in the design system
        locations={[0, 0.0719, 1]}
        style={tw`flex-col items-center px-8 py-4 rounded-[10px]`}>
        <View style={tw`mt-4`}>
          <Text variant={TextVariant.SubTitle1} color={Color.Primary.Sz200}>
            {title}
          </Text>
          <Text variant={TextVariant.Labels} color={Color.Neutral.Sz100}>
            {subTitle}
          </Text>
        </View>
        <View style={tw`mt-8`}>
          <Text variant={TextVariant.Heading2} color={Color.Primary.Sz400}>
            {`$${price}`}
          </Text>
          <Text variant={TextVariant.Body2Regular} color={Color.Neutral.Sz100}>
            {pricingDescription}
          </Text>
        </View>
        <View style={tw`mt-8`}>
          {featureList.map((feature, index) => {
            return (
              <View style={tw`flex-row items-start gap-2`} key={index}>
                <View style={tw`mt-2`}>
                  <PricePlanFeatureListTickIcon width={12} height={12} />
                </View>
                <Text textAlign={TextAlignment.Left} variant={TextVariant.Labels} color={Color.Neutral.Sz100}>
                  {feature}
                </Text>
              </View>
            );
          })}
        </View>
        <View style={tw`mt-8 w-50`}>
          <Button
            backgroundColor={isSelected ? Color.Neutral.Sz500 : Color.Primary.Sz600}
            onPress={onGetStarted}
            title="Get Started"
            fullWidth={true}
          />
        </View>
      </LinearGradient>
    </Card>
  );
}