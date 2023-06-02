import React, { useMemo } from 'react';
import { Pressable, View } from 'react-native';
import Swiper from 'react-native-swiper';

import { NextIcon, Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, LibrarySliderData, Route, TextVariant } from '@sz/constants';
import { NavigationService } from '@sz/services';

interface LinksSliderProps {
  sliderData: string[][];
}

export function LinksSlider({ sliderData }: LinksSliderProps) {
  const testID = 'LinksSliderTestID';

  const onTopicPress = data => {
    switch (data) {
      case LibrarySliderData.usingTheApp[0][0]:
        NavigationService.navigate(Route.UsingTheAppInfoOne);
        break;
      case LibrarySliderData.usingTheApp[0][1]:
        NavigationService.navigate(Route.UsingTheAppInfoTwo);
        break;
      case LibrarySliderData.usingTheApp[0][2]:
        NavigationService.navigate(Route.UsingTheAppInfoThree);
        break;
      case LibrarySliderData.usingTheApp[0][3]:
        NavigationService.navigate(Route.UsingTheAppInfoFour);
        break;
      case LibrarySliderData.usingTheApp[0][4]:
        NavigationService.navigate(Route.UsingTheAppInfoFive);
        break;
      case LibrarySliderData.usingTheApp[1][0]:
        NavigationService.navigate(Route.UsingTheAppInfoSix);
        break;
      case LibrarySliderData.usingTheApp[1][1]:
        NavigationService.navigate(Route.UsingTheAppInfoSeven);
        break;
      case LibrarySliderData.usingTheApp[1][2]:
        NavigationService.navigate(Route.UsingTheAppInfoEight);
        break;
      case LibrarySliderData.usingTheApp[1][3]:
        NavigationService.navigate(Route.UsingTheAppInfoNine);
        break;
      case LibrarySliderData.usingTheApp[1][4]:
        NavigationService.navigate(Route.UsingTheAppInfoTen);
        break;
      case LibrarySliderData.usingTheApp[2][0]:
        NavigationService.navigate(Route.UsingTheAppInfoEleven);
        break;
      case LibrarySliderData.usingTheApp[2][1]:
        NavigationService.navigate(Route.UsingTheAppInfoTwelve);
        break;
      case LibrarySliderData.usingTheApp[2][2]:
        NavigationService.navigate(Route.UsingTheAppInfoThirteen);
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
    <View testID={testID} style={tw`h-80`}>
      <Swiper activeDotStyle={tw`w-2.5 h-2.5 bg-white`} dotStyle={tw`bg-white opacity-50  w-2.5 h-2.5`}>
        {slides}
      </Swiper>
    </View>
  );
}
