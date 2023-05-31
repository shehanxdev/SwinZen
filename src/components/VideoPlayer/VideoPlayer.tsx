import React, { useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, Pressable, ScrollView, View } from 'react-native';
import Video from 'react-native-video';

import { tw } from '@sz/config';
import { Color, TextVariant } from '@sz/constants';
import { DURATION_WINDOW_WIDTH, FRAME_PER_SEC, POPLINE_POSITION, TILE_HEIGHT, TILE_WIDTH } from '@sz/constants';

import { ErrorIcon, PauseIcon, PlayIcon } from '../Icon';
import { Text } from '../Typography';
import { FFmpegWrapper } from './FFmpegWrapper';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const blankSpaceWidth = SCREEN_WIDTH / 2 - DURATION_WINDOW_WIDTH / 2;

export function VideoPlayer({ source }) {
  const videoPlayerRef = useRef(null);
  const [progress, setProgress] = useState('00:00');
  const [duration, setDuration] = useState('00:00');
  const [paused, setPaused] = useState(true);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [frames, setFrames] = useState(null);
  const [failedToGenerateFrames, setFailedToGenerateFrames] = useState(false);

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

  const handleOnProgress = ({ currentTime }) => {
    const currentTimeInSeconds = Math.round(currentTime);
    const currentProgress = convertToMinutesAndSeconds(currentTimeInSeconds);
    setProgress(currentProgress);
  };

  const getPopLinePlayTime = offset => {
    return (offset + (DURATION_WINDOW_WIDTH * parseFloat(POPLINE_POSITION)) / 100) / (FRAME_PER_SEC * TILE_WIDTH);
  };
  // const configureDuration = ({ duration }) => {
  //   let localFileName = `${RNFS.CachesDirectoryPath}/${dummySource}.mp4`;
  //   const numberOfFrames = Math.ceil(duration);
  //   const durationInMinsAndSeconds = convertToMinutesAndSeconds(Math.round(duration));
  //   setDuration(durationInMinsAndSeconds);
  // }

  const generateFrames = (filePath, numberOfFrames) => {
    let frames = [];
    for (let i = 0; i < numberOfFrames; i++) {
      frames.push(`${filePath.replace('%4d', String(i + 1).padStart(4, '0'))}.png`);
    }
    setFrames(frames);
  };

  const handleOnScroll = ({ nativeEvent }) => {
    const playbackTime = getPopLinePlayTime(nativeEvent.contentOffset.x);
    //@ts-ignore
    videoPlayerRef.current?.seek(playbackTime);
  };

  const handleOnTouchEnd = () => {
    setPaused(false);
  };
  const handleOnTouchStart = () => {
    setPaused(true);
  };

  const handleVideoLoad = ({ duration }) => {
    setIsVideoLoading(false);
    let localFileName = `someRandomFileNamee`;
    const numberOfFrames = Math.ceil(duration);

    setFrames(
      Array(numberOfFrames).fill({
        status: FRAME_STATUS.LOADING.name.description,
      }),
    );

    FFmpegWrapper.getFrames(
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
    if (frame.status === FRAME_STATUS.LOADING.name.description) {
      return (
        <View style={tw`w-10 h-10 justify-center`} key={index}>
          <ActivityIndicator size="small" color={Color.Tertiary.Sz900} />
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
            width: TILE_WIDTH,
            height: TILE_HEIGHT,
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
            <ActivityIndicator size="large" color={Color.Tertiary.Sz900} />
          </View>
        )}
        <Video
          ref={videoPlayerRef}
          onLoad={handleVideoLoad}
          onProgress={handleOnProgress}
          resizeMode={'cover'}
          source={{ uri: source }}
          paused={paused}
          style={tw`flex-1 w-full rounded-t-7.5 relative`}
        />
        {!isVideoLoading && (
          <View style={tw`absolute bottom-4 flex-row justify-center w-full `}>
            <View style={tw`py-0.5 px-1.75 flex-row items-center w-23 bg-[#00000087] rounded-lg mx-0`}>
              <Pressable onPress={() => setPaused(prevState => !prevState)}>
                {!paused ? <PauseIcon /> : <PlayIcon />}
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
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            onScroll={handleOnScroll}
            onTouchStart={handleOnTouchStart}
            onTouchEnd={handleOnTouchEnd}
            style={tw`w-full`}
            alwaysBounceHorizontal={false}
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
