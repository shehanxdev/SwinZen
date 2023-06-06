import React from 'react';
import { ImageBackground, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { PlayButtonIcon } from '@sz/components';
import { tw } from '@sz/config';
import { VideoData } from '@sz/models';

import { CircularScoreIndicator } from '../../../components/CircularScoreIndicator';
import { VideoUploadCardFooter } from '../VideoUploadCard';

export interface VideoThumbnailCardProps {
  video: VideoData;
}

export function VideoThumbnailCard({ video }: VideoThumbnailCardProps) {
  const gradientConfig = {
    colors: video.grading > 5 ? ['#A2FD2F00', '#A2FD2F79', '#A2FD2F'] : ['#F6581500', '#F65815'],
    locations: video.grading > 5 ? [0.6919, 0.8603, 0.9737] : [0.58, 0.97],
  };
  return (
    <View style={tw`relative`}>
      <ImageBackground
        style={tw`h-54.5 rounded-2.5 rounded-bl-[20px] overflow-hidden`}
        source={{ uri: 'https://i.ibb.co/XFvHx8J/Rectangle-132.png' }}
        resizeMode="cover">
        <LinearGradient
          // Note:: consider adding a function to color constant file to make eacg color transparent when neccessary. Reason is we cannot use tailwind situations like below
          colors={gradientConfig.colors}
          locations={gradientConfig.locations}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}>
          <View style={tw`h-full flex justify-center items-center`}>
            <PlayButtonIcon />
            <CircularScoreIndicator score={video.grading} diameter={40} />
          </View>
        </LinearGradient>
      </ImageBackground>

      <VideoUploadCardFooter isError={video.grading < 5} date="04 JUN 2022" cameraAngle="Faceview" results="Pass" />
    </View>
  );
}
