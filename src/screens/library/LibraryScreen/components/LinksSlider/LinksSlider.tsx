import React, { useMemo } from 'react';
import { Pressable, View } from 'react-native';
import Swiper from 'react-native-swiper';

import { NextIcon, Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextVariant } from '@sz/constants';

export interface LinksSliderProps {
  sliderData: string[][];
  onItemPress: (item: string) => void;
  testID?: string;
}

export function LinksSlider({ sliderData, onItemPress, testID = 'LinksSliderTestID' }: LinksSliderProps) {
  const slides = useMemo(() => {
    return sliderData.map((slide, index) => {
      return (
        <View key={slide.join('')}>
          {slide.map((text, childIndex) => {
            return (
              <Pressable
                testID={`${testID}-slide-${index}-${text}`}
                style={tw`justify-between py-3.25  mx-1 items-center flex-row border-[#ffffff33] ${
                  slide.length - 1 === childIndex ? 'border-b-0' : 'border-b'
                }`}
                key={`${slide}-${text}`}
                onPress={() => onItemPress(text)}>
                {/* <View style={tw`py-3.25 flex-row justify-between`}> */}
                <Text variant={TextVariant.Body1SemiBold} color={Color.Neutral.White}>
                  {text}
                </Text>
                {/* </View> */}
                <NextIcon />
              </Pressable>
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
