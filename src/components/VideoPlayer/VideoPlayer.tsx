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

import { ErrorIcon, PauseIcon, PlayIcon, ReplayIcon } from '../Icon';
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
  // console.log('vide')
  const videoPlayerRef = useRef(null);
  const scrollViewRef = useRef(null);

  const [progress, setProgress] = useState('00:00');
  const [duration, setDuration] = useState('00:00');
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [, setIsVideoRepeating] = useState(false);
  const [paused, setPaused] = useState(true);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [frames, setFrames] = useState(null);
  const [failedToGenerateFrames, setFailedToGenerateFrames] = useState(false);

  const handleOnProgress = ({ currentTime }) => {
    const currentTimeInSeconds = Math.round(currentTime);

    if (!paused) {
      // const xOffset = getOffSetFromPopLinePlayTime(currentTime + 1);
      const xOffset = getOffSetFromPopLinePlayTime(currentTime);
      console.log('paused is false xoffset is', xOffset);

      const poplinePlaytimeByXOffset = getPopLinePlayTime(xOffset);
      console.log('poplinePlaytimeByXOffset', poplinePlaytimeByXOffset);
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

  const handleTimelineScroll = ({ nativeEvent }) => {
    const playbackTime = getPopLinePlayTime(nativeEvent.contentOffset.x);

    if (paused) {
      console.log('paused is true video will seek to', playbackTime);
      videoPlayerRef.current?.seek(playbackTime);
    }
  };

  const handelControllerPress = () => {
    if (isVideoEnded) {
      setIsVideoEnded(false);
      setProgress('00:00');
      scrollViewRef.current.scrollTo({ x: 0.25, animated: true });
      videoPlayerRef.current.seek(0);
      setPaused(false);
    } else {
      setPaused(prevState => !prevState);
    }
  };

  const handleOnTouchEnd = () => {
    console.log('handleOnTouchEnd pause is false');
    setIsVideoEnded(false);
    setPaused(false);
  };

  const handleOnTouchStart = () => {
    setIsVideoEnded(false);
    setPaused(true);
  };

  const handleVideoLoad = async ({ duration }) => {
    setIsVideoLoading(false);
    let localFileName = `someRandomFileNamee`; //TODO:: replace with something meaningful
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

  const handleVideoEnding = () => {
    setIsVideoEnded(true);
    setIsVideoRepeating(false);
  };

  const renderFrame = (frame, index) => {
    const currentDate = new Date();
    const currentTimestamp = currentDate.getTime();
    console.log('frame', 'file://' + frame + '?' + currentTimestamp);

    if (frame.status === FRAME_STATUS.LOADING.name.description) {
      return (
        <View style={tw`w-10 h-10 justify-center`} key={index}>
          <LoadingIndicator size="small" color={Color.Tertiary.Sz900} />
        </View>
      );
    } else {
      return (
        <Image
          key={index}
          source={{
            uri: 'file://' + frame + '?' + currentTimestamp,
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
          onEnd={handleVideoEnding}
          // repeat={isVideoRepeating}
          onProgress={handleOnProgress}
          resizeMode={'cover'}
          source={{ uri: source }}
          paused={paused}
          style={tw`flex-1 w-full rounded-t-7.5 relative`}
        />
        {!isVideoLoading && (
          <View style={tw`absolute bottom-4 flex-row justify-center w-full `}>
            <Pressable onPress={handelControllerPress}>
              <View style={tw`py-0.5 px-1.75 flex-row items-center w-23 bg-[#00000087] rounded-lg mx-0`}>
                {isVideoEnded ? <ReplayIcon /> : !paused ? <PauseIcon /> : <PlayIcon />}
                <View style={tw`pl-1 items-center flex-row`}>
                  <Text variant={TextVariant.LabelsAlt} color={Color.Neutral.Sz100}>
                    {progress} /
                  </Text>
                  <Text variant={TextVariant.LabelsAlt} color={Color.Neutral.Sz500}>
                    {` ${duration}`}
                  </Text>
                </View>
              </View>
            </Pressable>
          </View>
        )}
      </View>
      {frames && !failedToGenerateFrames && (
        <View style={tw`w-full h-15 justify-center`}>
          {!frames.some(frame => frame.status === FRAME_STATUS.LOADING.name.description) && (
            <View style={tw`absolute self-center z-1 w-1.25 h-15`}>
              <View style={tw`w-0.75 rounded-sm h-15 bg-[${Color.Neutral.Sz100}]`} />
            </View>
          )}
          <ScrollView
            ref={scrollViewRef}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            onScroll={handleTimelineScroll}
            onTouchStart={handleOnTouchStart}
            onTouchEnd={handleOnTouchEnd}
            style={tw`w-full`}
            alwaysBounceHorizontal={false}
            bounces={false}
            scrollEventThrottle={1}>
            <View style={tw`w-[${blankSpaceWidth}px] bg-black`} />
            {frames && frames.map((frame, index) => renderFrame(frame, index))}
            <View style={tw`w-[${blankSpaceWidth}px] bg-black`} />
          </ScrollView>
        </View>
      )}
      {failedToGenerateFrames && renderFrameGenerationError()}
    </View>
  );
}
