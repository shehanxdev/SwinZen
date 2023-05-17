import React from 'react';
import { View } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextVariant } from '@sz/constants';

interface VideoUploadCardFooterProps {
  isError?: boolean;
  results: string;
  date: string;
  cameraAngle: string;
}

export function VideoUploadCardFooter({ isError, results, date, cameraAngle }: VideoUploadCardFooterProps) {
  return (
    <View>
      <View style={tw`flex-row items-center  justify-between w-full`}>
        <Text variant={TextVariant.Body2SemiBold} color={isError && Color.Secondary.Sz900}>
          {results.toUpperCase()}
        </Text>
        <Text variant={TextVariant.Body2SemiBold}>{`${date} • ${cameraAngle}`}</Text>
      </View>
    </View>
  );
}
