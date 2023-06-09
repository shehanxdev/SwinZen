import React, { useMemo } from 'react';
import { Pressable, View } from 'react-native';
import Swiper from 'react-native-swiper';

import { NextIcon, Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, LibrarySliderData, Route, TextVariant, UTAInfo } from '@sz/constants';
import { NavigationService } from '@sz/services';

interface LinksSliderProps {
  sliderData: string[][];
  testID?: string;
}

export function LinksSlider({ sliderData }: LinksSliderProps) {
  const testID = 'LinksSliderTestID';

  const onTopicPress = data => {
    switch (data) {
      case LibrarySliderData.usingTheApp[0][0]:
        NavigationService.navigate(Route.LibraryInfo, UTAInfo[0]);
        break;
      case LibrarySliderData.usingTheApp[0][1]:
        NavigationService.navigate(Route.LibraryInfo, UTAInfo[1]);
        break;
      case LibrarySliderData.usingTheApp[0][2]:
        NavigationService.navigate(Route.LibraryInfo, UTAInfo[2]);
        break;
      case LibrarySliderData.usingTheApp[0][3]:
        NavigationService.navigate(Route.LibraryInfo, UTAInfo[3]);
        break;
      case LibrarySliderData.usingTheApp[0][4]:
        NavigationService.navigate(Route.LibraryInfo, UTAInfo[4]);
        break;
      case LibrarySliderData.usingTheApp[1][0]:
        NavigationService.navigate(Route.LibraryInfo, UTAInfo[5]);
        break;
      case LibrarySliderData.usingTheApp[1][1]:
        NavigationService.navigate(Route.LibraryInfo, UTAInfo[6]);
        break;
      case LibrarySliderData.usingTheApp[1][2]:
        NavigationService.navigate(Route.LibraryInfo, UTAInfo[7]);
        break;
      case LibrarySliderData.usingTheApp[1][3]:
        NavigationService.navigate(Route.LibraryInfo, UTAInfo[8]);
        break;
      case LibrarySliderData.usingTheApp[1][4]:
        NavigationService.navigate(Route.LibraryInfo, UTAInfo[9]);
        break;
      case LibrarySliderData.usingTheApp[2][0]:
        NavigationService.navigate(Route.LibraryInfo, UTAInfo[10]);
        break;
      case LibrarySliderData.usingTheApp[2][1]:
        NavigationService.navigate(Route.LibraryInfo, UTAInfo[11]);
        break;
      case LibrarySliderData.usingTheApp[2][2]:
        NavigationService.navigate(Route.LibraryInfo, UTAInfo[12]);
        break;
    }
  };

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
                <Pressable style={tw`py-3.25 flex-row justify-between`} onPress={() => onTopicPress(text)}>
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
