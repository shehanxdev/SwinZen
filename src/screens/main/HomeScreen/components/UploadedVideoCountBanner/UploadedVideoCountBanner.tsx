import React from 'react';
import { View } from 'react-native';

import { tw } from '@sz/config';
import { Color } from '@sz/constants';

import { VideoCountCard } from './components';

interface UploadedVideoCountBannerProps {
  VideoCount: number | string;
  SwinZenUniVideoCount: number | string;
}

export function UploadedVideoCountBanner({ VideoCount = 0, SwinZenUniVideoCount = 0 }: UploadedVideoCountBannerProps) {
  return (
    <View style={[tw`flex flex-row justify-between min-h-15`]} testID="UploadedVideoCountBannerComponentTestID">
      <VideoCountCard count={VideoCount} description={`Video\nUploads`} />
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
