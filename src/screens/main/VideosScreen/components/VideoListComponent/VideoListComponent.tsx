import React from 'react';
import { View } from 'react-native';

import { tw } from '@sz/config';
import { VideoData } from '@sz/models';

import { VideoThumbnailCard } from '../../../HomeScreen/components/VideoThumbnailCard';

export interface VideoListProps {
  videos: Array<VideoData>;
}

export function VideoListComponent({ videos }: VideoListProps) {
  console.log(videos);
  return (
    <View>
      <View style={tw`mb-16`}>
        <VideoThumbnailCard />
      </View>
      <View style={tw`mb-16`}>
        <VideoThumbnailCard />
      </View>
      <View style={tw`mb-16`}>
        <VideoThumbnailCard />
      </View>
    </View>
  );
}
