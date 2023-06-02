import React from 'react';
import { ImageBackground, View } from 'react-native';

import { PlayButtonIcon } from '@sz/components';
import { tw } from '@sz/config';

import { VideoUploadCardFooter } from '../VideoUploadCard';

export function VideoThumbnailCard() {
  return (
    <View>
      <View style={tw`h-54.5 rounded-2.5 rounded-bl-[20px] overflow-hidden`}>
        <ImageBackground
          source={{ uri: 'https://i.ibb.co/XFvHx8J/Rectangle-132.png' }}
          resizeMode="cover"
          style={tw`flex-1 items-center justify-center`}>
          <PlayButtonIcon />
        </ImageBackground>
      </View>
      <VideoUploadCardFooter date="04 JUN 2022" cameraAngle="Faceview" results="10 • Pass" />
    </View>
  );
}
