import React from 'react';
import { ImageBackground, ImageSourcePropType, View } from 'react-native';

import { PlayIcon, Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextAlignment, TextVariant } from '@sz/constants';

interface PlaylistItemProps {
  thumbnail: ImageSourcePropType;
  duration: string;
  title: string;
  itemNumber: number;
  isSelected: boolean;
}

export function PlaylistItem({ thumbnail, duration, title, itemNumber, isSelected }: PlaylistItemProps) {
  return (
    <View style={tw`flex-row items-center`}>
      <View style={tw`w-5.25 flex-row items-center`}>
        {isSelected ? (
          <PlayIcon color={Color.Tertiary.Sz900} width={11} height={13} />
        ) : (
          <Text variant={TextVariant.Labels} color={Color.Neutral.White}>
            {itemNumber}
          </Text>
        )}
      </View>
      <View style={tw`w-27.5 h-18 rounded-xl mr-4`}>
        <ImageBackground source={thumbnail} resizeMode="cover" style={tw`flex-1 relative`}>
          <View
            style={tw`rounded-lg bg-[#00000087] flex-row gap-1 items-center justify-center w-15 h-4.5 absolute right-2 bottom-2 px-1.75`}>
            <PlayIcon />
            <Text variant={TextVariant.Labels2}>{duration}</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={tw`flex-1`}>
        <Text variant={TextVariant.Body2SemiBold} color={Color.Neutral.White} textAlign={TextAlignment.Left}>
          {title}
        </Text>
      </View>
    </View>
  );
}
