import React from 'react';
import { View } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextVariant } from '@sz/constants';

interface VideoUploadCardFooterProps {
  isError?: boolean;
  results: string;
  date: string;
}

export function VideoUploadCardFooter({ isError, results, date }: VideoUploadCardFooterProps) {
  return (
    <View style={tw`absolute bottom-0 right-0 left-0`}>
      <View style={tw`flex-row items-center  justify-between w-full pb-5 px-5`}>
        <Text variant={TextVariant.Body2SemiBold}>{date}</Text>
        <Text variant={TextVariant.Body2SemiBold} color={isError && Color.Secondary.Sz900}>
          {results}
        </Text>
      </View>
    </View>
  );
}
