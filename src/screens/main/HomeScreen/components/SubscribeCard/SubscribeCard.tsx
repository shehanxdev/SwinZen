import React from 'react';
import { ImageBackground, View } from 'react-native';

import { images } from '@sz/assets';
import { SquareTickIcon, Text } from '@sz/components';
import { tw } from '@sz/config';
import { TextAlignment, TextVariant } from '@sz/constants';

import { SubscribeButton } from '../SubscribeButton/SubscribeButton';

export function SubscribeCard() {
  return (
    <View style={tw`h-[380px] w-full rounded-[10px]`}>
      <ImageBackground style={tw`flex-1 py-12 px-6 `} source={images.subscribeCardBackground}>
        <View style={tw`mb-6 w-[244px]`}>
          <Text variant={TextVariant.SubTitle2SemiBold} textAlign={TextAlignment.Left}>
            Excel at the game
          </Text>
          <Text variant={TextVariant.Body2Regular} textAlign={TextAlignment.Left}>
            Subscribe today and start analyzing your swing.
          </Text>
        </View>
        <View style={tw`flex-row items-center gap-2`}>
          <SquareTickIcon />
          <Text variant={TextVariant.Body2Regular}>Analyzing your swing</Text>
        </View>
        <View style={tw`flex-row items-center gap-2`}>
          <SquareTickIcon />
          <Text variant={TextVariant.Body2Regular}>Keep your performance noted</Text>
        </View>
        <View style={tw`flex-row items-center gap-2`}>
          <SquareTickIcon />
          <Text variant={TextVariant.Body2Regular}>Unlimited video uploading</Text>
        </View>
        <SubscribeButton />
      </ImageBackground>
    </View>
  );
}
