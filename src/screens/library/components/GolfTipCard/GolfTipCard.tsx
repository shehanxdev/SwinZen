import React from 'react';
import { ImageBackground, Pressable, View } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextAlignment, TextVariant } from '@sz/constants';

interface GolfTipCardProps {
  testID?: string;
  disabled?: boolean;
  videosCount: number;
  label: string;
  sourceUri: string;
  onPress: () => void;
}

export function GolfTipCard({ testID, disabled = false, videosCount, label, sourceUri, onPress }: GolfTipCardProps) {
  return (
    <Pressable testID={testID} style={tw`grow-0 shrink-0 basis-[30%]`} disabled={disabled} onPress={onPress}>
      <View style={tw`rounded-2.5 h-26.5`}>
        <ImageBackground
          source={{ uri: sourceUri }}
          resizeMode="cover"
          style={tw`flex-1 justify-end rounded-2.5 bg-Neutral-Sz600`} // TODO:: need a default color when video category has no thumbnail
          imageStyle={tw`rounded-2.5`}>
          <View style={tw`bg-[#000000B2] rounded-2.5 py-3.5 `}>
            <Text variant={TextVariant.Labels} color={Color.Tertiary.Sz900}>
              {videosCount} Videos
            </Text>
          </View>
        </ImageBackground>
      </View>
      <View style={tw`mt-3`}>
        <Text variant={TextVariant.Body2Regular} textAlign={TextAlignment.Left} color={Color.Neutral.Sz100}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
}
