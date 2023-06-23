import React, { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextAlignment, TextVariant } from '@sz/constants';
import { useFetch } from '@sz/hooks';
import { VideoData } from '@sz/models';
import { VideoService } from '@sz/services';

import { PlaylistItem } from '../components';
import { BaseScreen, VideoPlayerWithTimeline } from './../../../screens/components';

export function GolfTipsPlaylistScreen({ route }) {
  const [selectedVideoData, setSelectedVideoData] = useState(null);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const { tipsCategory, tipsCategoryId } = route.params.params;

  const { isLoading, data } = useFetch(() => VideoService.getVideoCategoryData(tipsCategoryId));

  useEffect(() => {
    if (data) {
      setSelectedVideoData(data.videos[0]);
      setSelectedVideoIndex(data?.videos.length > 0 ? 1 : 0);
    }
  }, [data]);

  const handleListItemPress = (item: VideoData, index: number) => {
    setSelectedVideoData(item);
    setSelectedVideoIndex(index + 1);
  };

  const renderPlaylist = data?.videos.map((item, index) => {
    return (
      <Pressable key={item.id} style={tw`mb-2`} onPress={() => handleListItemPress(item, index)}>
        <PlaylistItem
          thumbnail={item.thumbnailUrl}
          videoUrl={item.videoUrl}
          title={item.name}
          isSelected={item.id === selectedVideoData?.id}
          itemNumber={index + 1}
        />
      </Pressable>
    );
  });

  return (
    <BaseScreen testID="GolfTipsPlaylistScreenTestID" wrapWithScrollView isLoading={isLoading}>
      <View style={tw`flex-1 mx-4 mt-6`}>
        {selectedVideoData && <VideoPlayerWithTimeline source={selectedVideoData?.videoUrl} />}
        <View style={tw`my-6.5`}>
          <Text variant={TextVariant.SubTitle1} color={Color.Neutral.Sz100} textAlign={TextAlignment.Left}>
            {tipsCategory}
          </Text>
          <View style={tw`mt-1`}>
            <Text variant={TextVariant.Labels} color={Color.Tertiary.Sz900} textAlign={TextAlignment.Left}>
              {`Video - ${selectedVideoIndex} / ${data?.videos.length}`}
            </Text>
          </View>
        </View>
        {renderPlaylist}
      </View>
    </BaseScreen>
  );
}
