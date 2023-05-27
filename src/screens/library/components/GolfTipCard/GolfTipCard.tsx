import React from 'react';
import { ImageBackground, Pressable, View } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, Route, TextAlignment, TextVariant } from '@sz/constants';
import { NavigationService } from '@sz/services';

export function GolfTipCard({ videosCount, label, backgroundImage }) {
  return (
    <Pressable onPress={() => NavigationService.navigate(Route.GolfTipsPlaylist, { tipsCategory: label })}>
      <View style={tw`rounded-2.5 h-26.5 w-[106px]`}>
        <ImageBackground
          source={backgroundImage}
          resizeMode="cover"
          style={tw`flex-1 justify-end`}
          imageStyle={tw`rounded-2.5`}>
          <View style={tw`bg-[#000000B2] rounded rounded-b-2.5 py-3.5 `}>
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
