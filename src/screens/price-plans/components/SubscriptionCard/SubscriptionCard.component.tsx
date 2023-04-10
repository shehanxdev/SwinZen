import * as React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Card } from 'react-native-paper';
import tw from 'twrnc';

import { PricePlanFeatureListTickIcon } from '@sz/components';
import { Button } from '@sz/components';
import { Text } from '@sz/components';
import { Color, TextAlignment, TextVariant } from '@sz/constants';

import { CardProps } from './SubscriptionCard.types';

function FeatureList(featureList) {
  return featureList.map((feature, index) => {
    return (
      <View style={tw`flex-row  items-start gap-2 `} key={index}>
        <View style={tw`mt-2`}>
          <PricePlanFeatureListTickIcon width={12} height={12} />
        </View>
        <Text textAlign={TextAlignment.Left} variant={TextVariant.Labels} color={Color.Neutral.Sz100}>
          {feature}
        </Text>
      </View>
    );
  });
}

export function SubscriptionCard({
  buttonColor,
  buttontextColor,
  hasBorder,
  borderColor = Color.Neutral.Sz500,
  title,
  featureList,
  subTitle,
  price,
  pricingDescription,
  testID = 'RNCardSubscriptionCard',
  colors = ['#8EFF001F', '#95FF101D', '#FFFFFF1F'], //TODO :: these colors are not in the design system
}: CardProps) {
  return (
    <View style={tw`mx-12  `}>
      <Card testID={testID} style={tw`bg-transparent  shadow-none`}>
        <LinearGradient
          colors={colors}
          locations={[0, 0.0719, 1]}
          style={tw`flex-col items-center px-8 py-4 ${
            hasBorder ? `border-2 border-[${borderColor}] border-[0.5]` : ''
          }  rounded-xl`}>
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
          <View style={tw`mt-8`}>{FeatureList(featureList)}</View>

          <View style={tw`mt-8 w-50 `}>
            <Button backgroundColor={buttonColor} textColor={buttontextColor} title="Get Started" fullWidth={true} />
          </View>
        </LinearGradient>
      </Card>
    </View>
  );
}
