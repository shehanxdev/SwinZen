import React, { useMemo } from 'react';
import { ImageBackground, View } from 'react-native';

import { images } from '@sz/assets';
import { SquareTickIcon, Text } from '@sz/components';
import { tw } from '@sz/config';
import { TextAlignment, TextVariant } from '@sz/constants';

import { SubscribeButton } from '../SubscribeButton';

export function SubscribeCard() {
  const onSubscribe = () => {
    //TODO:: Implement the subscription logic
  };

  const features = ['Analyzing your swing', 'Keep your performance noted', 'Unlimited video uploading'];

  const renderFeaturesList = useMemo(() => {
    return features.map((feature, index) => {
      return (
        <View style={tw`flex-row items-center gap-2`} key={index}>
          <SquareTickIcon />
          <Text variant={TextVariant.Body2Regular}>{feature}</Text>
        </View>
      );
    });
  }, [features]);

  return (
    <View style={tw`h-95 w-full rounded-2.5`}>
      <ImageBackground style={tw`flex-1 py-12 px-6 `} source={images.subscribeCardBackground}>
        <View style={tw`mb-6 w-61`}>
          <Text variant={TextVariant.SubTitle2SemiBold} textAlign={TextAlignment.Left}>
            Excel at the game
          </Text>
          <Text variant={TextVariant.Body2Regular} textAlign={TextAlignment.Left}>
            Subscribe today and start analyzing your swing.
          </Text>
        </View>
        <View style={tw`mb-18`}>{renderFeaturesList}</View>
        <SubscribeButton onPress={onSubscribe} />
      </ImageBackground>
    </View>
  );
}
