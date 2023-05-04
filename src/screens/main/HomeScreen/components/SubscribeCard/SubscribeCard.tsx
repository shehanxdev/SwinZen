import React from 'react';
import { ImageBackground, View } from 'react-native';

import { images } from '@sz/assets';
import { SquareTickIcon, Text } from '@sz/components';
import { tw } from '@sz/config';
import { TextAlignment, TextVariant } from '@sz/constants';

import { SubscribeButton } from '../SubscribeButton/SubscribeButton';

const Benefits = ['Analyzing your swing', 'Keep your performance noted', 'Unlimited video uploading'];

export function SubscribeCard() {
  return (
    <View style={tw`h-[380px] border w-full`}>
      <ImageBackground style={tw`flex-1 py-12 px-6 `} source={images.subscribeCardBackground}>
        <View style={tw`mb-6`}>
          <Text variant={TextVariant.SubTitle2SemiBold} textAlign={TextAlignment.Left}>
            Excel at the game
          </Text>
          <Text variant={TextVariant.Body2Regular} textAlign={TextAlignment.Left}>
            Subscribe today and start analyzing your swing.
          </Text>
        </View>

        {Benefits.map(benefit => {
          return (
            <View style={tw`flex-row items-center gap-2`}>
              <SquareTickIcon />
              <Text variant={TextVariant.Body2Regular}>{benefit}</Text>
            </View>
          );
        })}

        <SubscribeButton />
      </ImageBackground>
    </View>
  );
}
