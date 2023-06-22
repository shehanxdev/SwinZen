import React, { useState } from 'react';
import { View } from 'react-native';
import Video from 'react-native-video';

import { PlayIcon, Text } from '@sz/components';
import { szdayjs, tw } from '@sz/config';
import { Color, TextAlignment, TextVariant } from '@sz/constants';
import { addPadToNumber } from '@sz/utils';

interface PlaylistItemProps {
  thumbnail: string;
  videoUrl: string;
  title: string;
  itemNumber: number;
  isSelected: boolean;
}

export function PlaylistItem({ thumbnail, videoUrl, title, itemNumber, isSelected }: PlaylistItemProps) {
  const [videoDuration, setVideoDuration] = useState('00:00');

  const onVideoLoad = item => {
    const duration = szdayjs.duration(item.duration, 'seconds');
    const minutes = duration.minutes();
    const remainingSeconds = duration.seconds();
    setVideoDuration(`${addPadToNumber(minutes)}:${addPadToNumber(remainingSeconds)}`);
  };

  return (
    <View style={tw`flex-row items-center`}>
      <View style={tw`w-5.25 flex-row items-center`}>
        {isSelected ? (
          <PlayIcon color={Color.Tertiary.Sz900} width={11} height={13} />
        ) : (
          <Text variant={TextVariant.Labels} color={Color.Neutral.White}>
            {itemNumber}
          </Text>
        )}
      </View>
      <View style={tw`w-27.5 h-18 mr-4`}>
        <Video
          paused={true}
          style={tw`w-27.5 h-18 rounded-xl relative bg-Neutral-Black`}
          source={{ uri: videoUrl }}
          resizeMode="cover"
          poster={thumbnail}
          posterResizeMode="cover"
          onLoad={onVideoLoad}
        />
        <View
          style={tw`rounded-lg bg-[#00000087] flex-row gap-1 items-center justify-center w-15 h-4.5 absolute right-2 bottom-2 px-1.75`}>
          <PlayIcon />
          <Text variant={TextVariant.LabelsAlt}>{videoDuration}</Text>
        </View>
      </View>
      <View style={tw`flex-1`}>
        <Text variant={TextVariant.Body2SemiBold} color={Color.Neutral.White} textAlign={TextAlignment.Left}>
          {title}
        </Text>
      </View>
    </View>
  );
}
