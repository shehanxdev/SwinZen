import React, { useRef, useState } from 'react';
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, View } from 'react-native';
//TODO::create a common image component wrapper using react-native-fast-image
import FastImage from 'react-native-fast-image';
import Video, { OnProgressData } from 'react-native-video';

import { ErrorIcon, LoadingIndicator, PauseIcon, PlayIcon, ReplayIcon, Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextVariant, videoPlayerWithTimelineConfigs } from '@sz/constants';
import { FFmpegService } from '@sz/services';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const BLANK_SPACE_WIDTH = SCREEN_WIDTH / 2 - videoPlayerWithTimelineConfigs.durationWindowWidth / 2;

const getPopLinePlayTime = (offset: number) => {
  return (
    (offset +
      (videoPlayerWithTimelineConfigs.durationWindowWidth *
        parseFloat(videoPlayerWithTimelineConfigs.poplinePosition)) /
        100) /
    (videoPlayerWithTimelineConfigs.framesPerSecond * videoPlayerWithTimelineConfigs.frameWidth)
  );
};

const getOffSetFromPopLinePlayTime = (playtime: number) => {
  return (
    playtime * (videoPlayerWithTimelineConfigs.framesPerSecond * videoPlayerWithTimelineConfigs.frameWidth) -
    (videoPlayerWithTimelineConfigs.durationWindowWidth * parseFloat(videoPlayerWithTimelineConfigs.poplinePosition)) /
      1000
  );
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

const renderFrame = (frame, index: number) => {
  if (frame.status === FRAME_STATUS.LOADING.name.description) {
    return (
      <View style={tw`w-10 h-10 justify-center m-auto`} key={index}>
        <LoadingIndicator size="small" color={Color.Tertiary.Sz900} />
      </View>
    );
  } else {
    return (
      // There is a known issue with the RN Image component, that cannot control cache options in Android.
      // This is a tempory workaround to get rid of the caching issue
      // TODO::create a common image component wrapper using react-native-fast-image
      <FastImage
        key={index}
        source={{
          uri: 'file://' + frame,
          cache: 'web',
        }}
        style={{
          width: videoPlayerWithTimelineConfigs.frameWidth,
          height: videoPlayerWithTimelineConfigs.frameHeight,
        }}
      />
    );
  }
};

interface VideoPlayerWithTimelineProps {
  source: string;
}

export function VideoPlayerWithTimeline({ source }: VideoPlayerWithTimelineProps) {
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

  const handleOnProgress = (data: OnProgressData) => {
    const currentTime = data.currentTime;
    const currentTimeInSeconds = Math.round(currentTime);

    if (!paused) {
      const xOffset = getOffSetFromPopLinePlayTime(currentTime);
      scrollViewRef.current.scrollTo({ x: xOffset, animated: true });
    }

    const currentProgress = convertToMinutesAndSeconds(currentTimeInSeconds);
    setProgress(currentProgress);
  };

  const generateFrames = (filePath: string, numberOfFrames: number) => {
    let frames = [];
    for (let i = 0; i < numberOfFrames - 1; i++) {
      frames.push(`${filePath.replace('%4d', String(i + 1).padStart(4, '0'))}`);
    }
    setFrames(frames);
  };

  const handleTimelineScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const playbackTime = getPopLinePlayTime(event.nativeEvent.contentOffset.x);

    if (paused) {
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
    setIsVideoEnded(false);
    setPaused(false);
  };

  const handleOnTouchStart = () => {
    setIsVideoEnded(false);
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

  const handleVideoEnding = () => {
    setIsVideoEnded(true);
    setIsVideoRepeating(false);
  };

  const renderControllerIcon = () => {
    if (isVideoEnded) return <ReplayIcon />;
    else if (paused) return <PlayIcon />;
    else return <PauseIcon />;
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
                {renderControllerIcon()}
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
            <View style={tw`w-[${BLANK_SPACE_WIDTH}px] bg-black`} />
            {frames && frames.map((frame, index) => renderFrame(frame, index))}
            <View style={tw`w-[${BLANK_SPACE_WIDTH}px] bg-black`} />
          </ScrollView>
        </View>
      )}
      {failedToGenerateFrames && renderFrameGenerationError()}
    </View>
  );
}
