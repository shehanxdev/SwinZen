import React, { useRef, useState } from 'react';
import { Dimensions, Image, Pressable, ScrollView, View } from 'react-native';
import Video from 'react-native-video';

import { tw } from '@sz/config';
import {
  Color,
  DURATION_WINDOW_WIDTH,
  FRAMES_PER_SECOND,
  FRAME_HEIGHT,
  FRAME_WIDTH,
  POPLINE_POSITION,
  TextVariant,
} from '@sz/constants';
import { FFmpegService } from '@sz/services';

import { ErrorIcon, PauseIcon, PlayIcon } from '../Icon';
import { LoadingIndicator } from '../LoadingIndicator';
import { Text } from '../Typography';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const blankSpaceWidth = SCREEN_WIDTH / 2 - DURATION_WINDOW_WIDTH / 2;

const getPopLinePlayTime = offset => {
  return (offset + (DURATION_WINDOW_WIDTH * parseFloat(POPLINE_POSITION)) / 100) / (FRAMES_PER_SECOND * FRAME_WIDTH);
};

const getOffSetFromPopLinePlayTime = playtime => {
  return playtime * (FRAMES_PER_SECOND * FRAME_WIDTH) - (DURATION_WINDOW_WIDTH * parseFloat(POPLINE_POSITION)) / 1000;
};

const convertToMinutesAndSeconds = (seconds: number) => {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;
  let formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  let formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
  return formattedMinutes + ':' + formattedSeconds;
};

const FRAME_STATUS = Object.freeze({
  LOADING: { name: Symbol('LOADING') },
  READY: { name: Symbol('READY') },
});

export function VideoPlayer({ source }) {
  const videoPlayerRef = useRef(null);
  const scrollViewRef = useRef(null);

  const [progress, setProgress] = useState('00:00');
  const [duration, setDuration] = useState('00:00');
  const [paused, setPaused] = useState(true);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [frames, setFrames] = useState(null);
  const [failedToGenerateFrames, setFailedToGenerateFrames] = useState(false);

  const handleOnProgress = ({ currentTime }) => {
    const currentTimeInSeconds = Math.round(currentTime);

    if (!paused) {
      const xOffset = getOffSetFromPopLinePlayTime(currentTime + 1);

      scrollViewRef.current.scrollTo({ x: xOffset, animated: true });
    }

    const currentProgress = convertToMinutesAndSeconds(currentTimeInSeconds);
    setProgress(currentProgress);
  };

  const generateFrames = (filePath, numberOfFrames) => {
    let frames = [];
    for (let i = 0; i < numberOfFrames - 1; i++) {
      frames.push(`${filePath.replace('%4d', String(i + 1).padStart(4, '0'))}`);
    }
    setFrames(frames);
  };

  const handleOnScroll = ({ nativeEvent }) => {
    const playbackTime = getPopLinePlayTime(nativeEvent.contentOffset.x);
    console.log('playbackTime', playbackTime);

    if (paused) {
      videoPlayerRef.current?.seek(playbackTime);
    }
  };

  const handleOnTouchEnd = () => {
    setPaused(false);
  };

  const handleOnTouchStart = () => {
    setPaused(true);
  };

  const handleVideoLoad = async ({ duration }) => {
    setIsVideoLoading(false);
    let localFileName = `someRandomFileNamee`;
    const numberOfFrames = Math.ceil(duration);

    setFrames(
      Array(numberOfFrames).fill({
        status: FRAME_STATUS.LOADING.name.description,
      }),
    );

    await FFmpegService.generateFramesFromVideo(
      localFileName,
      source,
      numberOfFrames,
      filePath => generateFrames(filePath, numberOfFrames),
      () => setFailedToGenerateFrames(true),
    );

    const durationInMinsAndSeconds = convertToMinutesAndSeconds(Math.round(duration));
    setDuration(durationInMinsAndSeconds);

    setFrames(
      Array(numberOfFrames).fill({
        status: FRAME_STATUS.LOADING.name.description,
      }),
    );
  };

  const renderFrame = (frame, index) => {
    console.log('frame', frame);
    if (frame.status === FRAME_STATUS.LOADING.name.description) {
      return (
        <View style={tw`w-10 h-10 justify-center`} key={index}>
          {/* <ActivityIndicator size="small" color={Color.Tertiary.Sz900} /> */}
          <LoadingIndicator size="small" color={Color.Tertiary.Sz900} />
        </View>
      );
    } else {
      return (
        <Image
          key={index}
          source={{
            uri: 'file://' + frame,
          }}
          style={{
            width: FRAME_WIDTH,
            height: FRAME_HEIGHT,
          }}
        />
      );
    }
  };

  const renderFrameGenerationError = () => {
    return (
      <View style={tw`justify-center items-center`}>
        <ErrorIcon width={50} height={50} />
        <Text variant={TextVariant.Body2Regular}>Something went wrong while generating frames !</Text>
        <Text variant={TextVariant.Body2Regular}>Please try again</Text>
      </View>
    );
  };

  return (
    <View style={tw`rounded-t-7.5 w-full`}>
      <View style={tw`h-62.5 relative`}>
        {isVideoLoading && (
          <View style={tw`flex-row justify-center items-center absolute inset-0 z-2`}>
            <LoadingIndicator size="large" color={Color.Tertiary.Sz900} />
          </View>
        )}
        <Video
          ref={videoPlayerRef}
          onLoad={handleVideoLoad}
          auto
          onProgress={handleOnProgress}
          resizeMode={'cover'}
          source={{ uri: source }}
          paused={paused}
          style={tw`flex-1 w-full rounded-t-7.5 relative`}
        />
        {!isVideoLoading && (
          <View style={tw`absolute bottom-4 flex-row justify-center w-full `}>
            <Pressable
              onPress={() => setPaused(prevState => !prevState)}
              style={tw`py-0.5 px-1.75 flex-row items-center w-23 bg-[#00000087] rounded-lg mx-0`}>
              <View>{!paused ? <PauseIcon /> : <PlayIcon />}</View>
              <View style={tw`pl-1 items-center flex-row`}>
                <Text variant={TextVariant.LabelsAlt} color={Color.Neutral.Sz100}>
                  {progress} /
                </Text>
                <Text variant={TextVariant.LabelsAlt} color={Color.Neutral.Sz500}>
                  {` ${duration}`}
                </Text>
              </View>
            </Pressable>
          </View>
        )}
      </View>
      {frames && !failedToGenerateFrames && (
        <View style={tw`w-full h-20 justify-center z-10`}>
          {!frames.some(frame => frame.status === FRAME_STATUS.LOADING.name.description) && (
            <View style={tw`absolute self-center z-6.5 w-1.25 h-25 pt-3`}>
              <View style={tw`w-0.75 rounded-sm h-20 bg-[${Color.Neutral.Sz100}]`} />
            </View>
          )}
          <ScrollView
            ref={scrollViewRef}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            onScroll={handleOnScroll}
            onTouchStart={handleOnTouchStart}
            onTouchEnd={handleOnTouchEnd}
            style={tw`w-full`}
            alwaysBounceHorizontal={false}
            bounces={false}
            scrollEventThrottle={1}>
            <View style={tw`w-[${blankSpaceWidth}px] bg-black`} />
            {frames.map((frame, index) => renderFrame(frame, index))}
            <View style={tw`w-[${blankSpaceWidth}px] bg-black`} />
          </ScrollView>
        </View>
      )}
      {failedToGenerateFrames && renderFrameGenerationError()}
    </View>
  );
}
