import React from 'react';
import { View } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextAlignment, TextVariant } from '@sz/constants';

interface VideoCountCardProps {
  count: number | string;
  description: string;
  backgroundColor?: Color;
  countTextColor?: Color;
  descriptionTextColor?: Color;
}

export function VideoCountCard({
  count,
  description,
  backgroundColor = '#1A5C23' as Color,
  countTextColor = Color.Neutral.White,
  descriptionTextColor = Color.Neutral.White,
}: VideoCountCardProps) {
  return (
    <View style={tw`flex-row justify-start items-center flex-1 rounded-2.5 bg-[${backgroundColor}]`}>
      <View style={tw`mr-4 ml-2.5`}>
        <Text variant={TextVariant.Heading2} color={countTextColor}>
          {count}
        </Text>
      </View>
      <Text variant={TextVariant.Body2Regular} textAlign={TextAlignment.Left} color={descriptionTextColor}>
        {description}
      </Text>
    </View>
  );
}

//Video {'\n'}Uploads
