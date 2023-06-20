import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import Collapsible from 'react-native-collapsible';
import LinearGradient from 'react-native-linear-gradient';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextAlignment, TextVariant } from '@sz/constants';

export function SwingDataExpandButton() {
  const [isExpanded, setIsExpanded] = useState(true);

  const gradientConfig = {
    colors: ['#1A5C23', '#16501D', '#16501D', '#0A2F0F'],
    locations: [0.2, 0.7375, 0.7375, 0.241],
    start: { x: 0, y: 1.4 },
    end: { x: 0, y: 0 },
  };

  const swingData = [
    {
      label: 'Club speed',
      value: '95',
    },
    {
      label: 'Ball speed',
      value: '123.5',
    },
    {
      label: 'Smash',
      value: '1.3',
    },
    {
      label: 'Launch',
      value: 'ND',
    },
  ];
  return (
    <View style={tw`relative h-auto pt-10 mb-2`}>
      <Pressable
        style={tw`py-2.5 bg-[${Color.Primary.Sz650}] rounded-2.5 absolute z-1 right-0 left-0`}
        onPress={() => setIsExpanded(prevState => !prevState)}>
        <Text variant={TextVariant.Body2SemiBold} color={Color.Neutral.White}>
          {`Swing data ${isExpanded ? '+' : ' -'}`}
        </Text>
      </Pressable>
      <Collapsible collapsed={isExpanded} style={tw`absolute right-0 left-0 -top-2 `}>
        <LinearGradient
          colors={gradientConfig.colors}
          start={gradientConfig.start}
          end={gradientConfig.end}
          locations={gradientConfig.locations}
          style={tw`pt-6.25 pb-1.75 rounded-2.5`}>
          {swingData.map(data => {
            return (
              <View style={tw`justify-center items-center gap-3.75 flex-row mb-.5`} key={data.label}>
                <View style={tw`flex-1 `}>
                  <Text variant={TextVariant.Body2Regular} color={Color.Neutral.Sz100} textAlign={TextAlignment.Right}>
                    {data.label}
                  </Text>
                </View>
                <View style={tw`flex-1`}>
                  <Text variant={TextVariant.Body1SemiBold} color={Color.Neutral.Sz100} textAlign={TextAlignment.Left}>
                    {data.value}
                  </Text>
                </View>
              </View>
            );
          })}
        </LinearGradient>
      </Collapsible>
    </View>
  );
}
