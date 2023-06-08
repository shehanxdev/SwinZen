import React, { useMemo } from 'react';
import { Pressable, View } from 'react-native';
import Swiper from 'react-native-swiper';

import { NextIcon, Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextVariant } from '@sz/constants';

interface LinksSliderProps {
  sliderData: string[][];
  testID?: string;
}

export function LinksSlider({ sliderData, testID }: LinksSliderProps) {
  const onTopicPress = () => {}; //TODO:: Handle navigation to the relevant content page

  const slides = useMemo(() => {
    return sliderData.map(slide => {
      return (
        <View key={`${testID}-${slide}`}>
          {slide.map((text, childIndex) => {
            return (
              <View
                style={tw`justify-between  mx-1 items-center flex-row border-[#ffffff33] ${
                  slide.length - 1 === childIndex ? 'border-b-0' : 'border-b-[1px]'
                }`}
                key={`${testID}-${slide}-${text}`}>
                <Pressable style={tw`py-3.25 flex-row justify-between`} onPress={onTopicPress}>
                  <Text variant={TextVariant.Body1SemiBold} color={Color.Neutral.White}>
                    {text}
                  </Text>
                </Pressable>
                <NextIcon />
              </View>
            );
          })}
        </View>
      );
    });
  }, [sliderData]);

  return (
    <View style={tw`h-80`} testID={testID}>
      <Swiper activeDotStyle={tw`w-2.5 h-2.5 bg-white`} dotStyle={tw`bg-white opacity-50  w-2.5 h-2.5`}>
        {slides}
      </Swiper>
    </View>
  );
}
