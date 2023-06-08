import dayjs from 'dayjs';
import React from 'react';
import { ImageBackground, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { PlayButtonIcon } from '@sz/components';
import { tw } from '@sz/config';
import { VideoMetaData } from '@sz/models';

import { CircularScoreIndicator } from '../../../components/CircularScoreIndicator';
import { VideoUploadCardFooter } from '../VideoUploadCard';

export interface VideoThumbnailCardProps {
  video: VideoMetaData;
}

export function VideoThumbnailCard({ video }: VideoThumbnailCardProps) {
  const gradientConfig = {
    //Note:: consider adding a function to color constant file to make eacg color transparent when neccessary. Reason is we cannot use tailwind situations like below
    colors: video.grading > 5 ? ['#A2FD2F00', '#A2FD2F79', '#A2FD2F'] : ['#F6581500', '#F65815'],
    //Note:: example for second gradient is not available in the design system
    locations: video.grading > 5 ? [0.7279, 0.9051, 1] : [0.74, 1],
    //Note:: folowing two properties are in case of future changes to the gradient
    start: { x: 1, y: 0 },
    end: { x: 0, y: 0 },
  };
  return (
    <View testID="VideoThumbnailCardTestID" style={tw`relative`}>
      <ImageBackground
        style={tw`h-54.5 rounded-2.5 rounded-bl-[20px] overflow-hidden`}
        source={{ uri: 'https://i.ibb.co/XFvHx8J/Rectangle-132.png' }}
        resizeMode="cover">
        <LinearGradient
          colors={gradientConfig.colors}
          locations={gradientConfig.locations}
          start={gradientConfig.start}
          end={gradientConfig.end}>
          <View style={tw`h-full flex justify-center items-center`}>
            <PlayButtonIcon />
            <CircularScoreIndicator score={video.grading} diameter={40} />
          </View>
        </LinearGradient>
      </ImageBackground>

      <VideoUploadCardFooter
        isError={video.grading < 5}
        date={dayjs(video.createdAt).format('DD MMM YYYY').toUpperCase()}
        cameraAngle={video.videoType}
        results={video.grading > 5 ? 'pass' : 'fail'}
      />
    </View>
  );
}
