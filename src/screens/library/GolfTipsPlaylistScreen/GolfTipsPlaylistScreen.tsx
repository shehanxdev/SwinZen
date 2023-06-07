import React, { useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';

import { Text, VideoPlayer } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextAlignment, TextVariant } from '@sz/constants';

import { PlaylistItem } from '../components';
import { BaseScreen } from './../../../screens/components';
import { golfTipsPlaylistDummyData } from './GolfTipsPlaylistDummyData';

export function GolfTipsPlaylistScreen({ route }) {
  //TODO:: These states can be changed according to the integrations
  const [, setPlayingVideoSource] = useState(golfTipsPlaylistDummyData[0].videoSource);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleListItemPress = (itemIndex: number) => {
    setCurrentVideoIndex(itemIndex);
    setPlayingVideoSource(golfTipsPlaylistDummyData[itemIndex].videoSource);
  };

  return (
    <BaseScreen wrapWithScrollView={false}>
      <View style={tw`flex-1 mx-4 mt-6`}>
        <View style={tw``}>
          <VideoPlayer source="https://www.w3schools.com/html/mov_bbb.mp4" />
        </View>
        <View style={tw`my-6.5`}>
          <Text variant={TextVariant.SubTitle1} color={Color.Neutral.Sz100} textAlign={TextAlignment.Left}>
            {route.params.tipsCategory}
          </Text>
          <View style={tw`mt-1`}>
            <Text variant={TextVariant.Labels} color={Color.Tertiary.Sz900} textAlign={TextAlignment.Left}>
              {`Video - ${currentVideoIndex + 1} / ${golfTipsPlaylistDummyData.length}`}
            </Text>
          </View>
        </View>
        <FlatList
          data={golfTipsPlaylistDummyData}
          ItemSeparatorComponent={() => <View style={tw`h-2`}></View>}
          renderItem={({ item, index }) => (
            <Pressable onPress={() => handleListItemPress(index)}>
              <PlaylistItem
                thumbnail={item.thumbnail}
                duration={item.duration}
                title={item.title}
                isSelected={index === currentVideoIndex}
                itemNumber={index + 1}
              />
            </Pressable>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </BaseScreen>
  );
}
