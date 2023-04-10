import React from 'react';
import { ImageBackground, View } from 'react-native';

import { PlayButtonIcon } from '@sz/components';
import { tw } from '@sz/config';

import { VideoUploadCardFooter } from '../VideoUploadCard';

export function VideoThumbnailCard() {
  return (
    <View style={tw`h-54.5 rounded-2.5 overflow-hidden`}>
      <ImageBackground
        source={{ uri: 'https://i.ibb.co/XFvHx8J/Rectangle-132.png' }}
        resizeMode="cover"
        style={tw`flex-1 items-center justify-center`}>
        <PlayButtonIcon />
      </ImageBackground>
      <VideoUploadCardFooter date="04 JUN 2022 • Faceview" results="10 • Pass" />
    </View>
  );
}
