import React, { useState } from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextAlignment, TextVariant } from '@sz/constants';

import { PlaylistItem } from '../components';
import { BaseScreen, VideoPlayerWithTimeline } from './../../../screens/components';
import { golfTipsPlaylistDummyData } from './GolfTipsPlaylistDummyData';

export function GolfTipsPlaylistScreen({ route }) {
  //TODO:: These states can be changed according to the integrations
  const [, setPlayingVideoSource] = useState(golfTipsPlaylistDummyData[0].videoSource);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const { tipsCategory } = route.params.params;

  const handleListItemPress = (itemIndex: number) => {
    setCurrentVideoIndex(itemIndex);
    setPlayingVideoSource(golfTipsPlaylistDummyData[itemIndex].videoSource);
  };

  const renderPlaylist = golfTipsPlaylistDummyData.map((item, index) => {
    return (
      <Pressable onPress={() => handleListItemPress(index)} key={item.id} style={tw`mb-2`}>
        <PlaylistItem
          thumbnail={item.thumbnail}
          duration={item.duration}
          title={item.title}
          isSelected={index === currentVideoIndex}
          itemNumber={index + 1}
        />
      </Pressable>
    );
  });
  return (
    <BaseScreen wrapWithScrollView>
      <View style={tw`flex-1 mx-4 mt-6`}>
        <View style={tw``}>
          <VideoPlayerWithTimeline source="https://www.w3schools.com/html/mov_bbb.mp4" />
        </View>
        <View style={tw`my-6.5`}>
          <Text variant={TextVariant.SubTitle1} color={Color.Neutral.Sz100} textAlign={TextAlignment.Left}>
            {tipsCategory}
          </Text>
          <View style={tw`mt-1`}>
            <Text variant={TextVariant.Labels} color={Color.Tertiary.Sz900} textAlign={TextAlignment.Left}>
              {`Video - ${currentVideoIndex + 1} / ${golfTipsPlaylistDummyData.length}`}
            </Text>
          </View>
        </View>
        {renderPlaylist}
      </View>
    </BaseScreen>
  );
}
