import React, { useState } from 'react';
import { Image, Pressable, ScrollView, View } from 'react-native';
import RNFS from 'react-native-fs';
import Video from 'react-native-video';

import { tw } from '@sz/config';
import { Color, TextVariant } from '@sz/constants';

import { PauseIcon, PlayIcon } from '../Icon';
import { Text } from '../Typography';
import FFmpegWrapper from './FFmpegWrapper';

export function VideoPlayer({ source }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState('00:00');
  const [duration, setDuration] = useState('00:00');

  const [newFrames, setNewFrames] = useState(null);
  const FRAME_STATUS = Object.freeze({
    LOADING: { name: Symbol('LOADING') },
    READY: { name: Symbol('READY') },
  });

  const convertToMinutesAndSeconds = seconds => {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    let formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    let formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
    return formattedMinutes + ':' + formattedSeconds;
  };

  const setCurrentProgress = ({ currentTime }) => {
    const currentTimeInSeconds = Math.round(currentTime);
    const currentProgress = convertToMinutesAndSeconds(currentTimeInSeconds);
    setProgress(currentProgress);
  };

  const configureDuration = ({ duration }) => {
    let localFileName = `${RNFS.CachesDirectoryPath}/${source}.mp4`;
    const numberOfFrames = Math.ceil(duration);
    const durationInMinsAndSeconds = convertToMinutesAndSeconds(Math.round(duration));
    setDuration(durationInMinsAndSeconds);

    setNewFrames(
      Array(numberOfFrames).fill({
        status: FRAME_STATUS.LOADING.name.description,
      }),
    );

    FFmpegWrapper.getFrames(localFileName, source, numberOfFrames, filePath => {
      let frames = [];
      for (let i = 0; i < numberOfFrames; i++) {
        frames.push(`${filePath.replace('%4d', String(i + 1).padStart(4, '0'))}.png`);
      }
      setNewFrames(frames);
    });
  };

  return (
    <View style={tw`h-62.5 rounded-t-7.5 w-full`}>
      <Video
        onLoad={configureDuration}
        onProgress={setCurrentProgress}
        resizeMode={'stretch'}
        source={source} //TODO:: Find out the issue with using urls as the source
        paused={!isPlaying}
        style={tw`flex-1 w-full rounded-t-7.5 relative`}
      />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        style={tw`w-screen`}
        alwaysBounceHorizontal={true}
        scrollEventThrottle={1}>
        {newFrames?.map((frame, index) => {
          if (frame.status === FRAME_STATUS.LOADING.name.description) {
            return <View style={tw`w-10 h-10 border-2`} key={index}></View>;
          } else {
            return (
              <Image
                key={index}
                source={{
                  uri: 'file://' + frame,
                }}
                style={tw`w-10 h-10`}
              />
            );
          }
        })}
      </ScrollView>
      <View style={tw`absolute bottom-2.5 flex-row justify-center w-full `}>
        <View style={tw`py-0.5 px-1.75 flex-row items-center w-23 bg-[#00000087] rounded-lg mx-0`}>
          <Pressable onPress={() => setIsPlaying(prevState => !prevState)}>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </Pressable>
          <View style={tw`pl-1 items-center flex-row`}>
            <Text variant={TextVariant.Labels2} color={Color.Neutral.Sz100}>
              {progress} /
            </Text>
            <Text variant={TextVariant.Labels2} color={Color.Neutral.Sz500}>
              {` ${duration}`}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
