import React from 'react';
import { ImageBackground, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { PlayButtonIcon } from '@sz/components';
import { tw } from '@sz/config';

import { CircularScoreIndicator } from '../../../components/CircularScoreIndicator';
import { VideoUploadCardFooter } from '../VideoUploadCard';

export function VideoThumbnailCard() {
  return (
    <View style={tw`relative`}>
      <ImageBackground
        style={tw`h-54.5 rounded-2.5 rounded-bl-[20px] overflow-hidden`}
        source={{ uri: 'https://i.ibb.co/XFvHx8J/Rectangle-132.png' }}
        resizeMode="cover">
        <LinearGradient
          colors={['#A2FD2F00', '#A2FD2F79', '#A2FD2F']}
          locations={[0, 0.8603, 0.9737]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}>
          <View style={tw`h-full flex justify-center items-center`}>
            <PlayButtonIcon />
            <CircularScoreIndicator score={3} diameter={40} />
          </View>
        </LinearGradient>
      </ImageBackground>

      <VideoUploadCardFooter date="04 JUN 2022" cameraAngle="Faceview" results="Pass" />
    </View>
  );
}
