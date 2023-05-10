import React from 'react';
import { View } from 'react-native';

import { tw } from '@sz/config';
import { Color } from '@sz/constants';

import { VideoCountCard } from './components';

interface UploadedVideoCountBannerProps {
  _VideoCount: number; //refers to total uploaded video count from a specific month.
  SwinZenUniVideoCount: number; //refers to total uploaded video count from all the times. Not just for a specific month.
}

export function UploadedVideoCountBanner({ _VideoCount = 0, SwinZenUniVideoCount = 0 }: UploadedVideoCountBannerProps) {
  return (
    <View style={[tw`flex flex-row justify-between min-h-15`]} testID="UploadedVideoCountBannerComponentTestID">
      <VideoCountCard count={_VideoCount} description={`Video\nUploads`} />
      <View style={tw`w-2.5`} />
      <VideoCountCard
        count={SwinZenUniVideoCount}
        description={`SwingZen\nUniversity`}
        backgroundColor={Color.Tertiary.Sz900}
        countTextColor={Color.Neutral.Sz1000}
        descriptionTextColor={Color.Neutral.Sz1000}
      />
    </View>
  );
}
