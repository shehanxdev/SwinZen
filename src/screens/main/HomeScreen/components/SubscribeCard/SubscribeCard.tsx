import React from 'react';
import { ImageBackground, View } from 'react-native';

import { images } from '@sz/assets';
import { SquareTickIcon, Text } from '@sz/components';
import { tw } from '@sz/config';
import { TextAlignment, TextVariant } from '@sz/constants';

import { SubscribeButton } from './components/SubscribeButton';

interface SubscribeCardProps {
  features: string[];
}

export function SubscribeCard({ features }: SubscribeCardProps) {
  return (
    <View style={tw`min-h-95 w-full rounded-2.5`}>
      <ImageBackground style={tw`py-12 px-6`} source={images.subscribeCardBackground} resizeMode="stretch">
        <View style={tw`mb-6 w-61`}>
          <Text variant={TextVariant.SubTitle2SemiBold} textAlign={TextAlignment.Left}>
            Excel at the game
          </Text>
          <Text variant={TextVariant.Body2Regular} textAlign={TextAlignment.Left}>
            Subscribe today and start analyzing your swing.
          </Text>
        </View>
        <View style={tw`mb-18`}>
          {features.map((feature, index) => (
            <View style={tw`flex-row items-center gap-2`} key={index}>
              <SquareTickIcon />
              <Text variant={TextVariant.Body2Regular} textAlign={TextAlignment.Left}>
                {feature}
              </Text>
            </View>
          ))}
        </View>
        <SubscribeButton
          onPress={() => {
            //TODO::implement
          }}
        />
      </ImageBackground>
    </View>
  );
}
