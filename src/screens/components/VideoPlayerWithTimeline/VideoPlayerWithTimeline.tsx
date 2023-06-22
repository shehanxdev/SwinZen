import React, { useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
//TODO::create a common image component wrapper using react-native-fast-image
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import Video, { OnLoadData, OnProgressData } from 'react-native-video';

import { ErrorIcon, LoadingIndicator, PauseIcon, PlayIcon, ReplayIcon, Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextVariant, VideoViewType, videoPlayerWithTimelineConfigs } from '@sz/constants';
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

const renderFrameGenerationError = () => {
  return (
    <View style={tw`justify-center items-center`}>
      <ErrorIcon />
      <Text variant={TextVariant.Body2Regular}>Something went wrong while generating frames !</Text>
      <Text variant={TextVariant.Body2Regular}>Please try again</Text>
    </View>
  );
};

interface VideoPlayerWithTimelineProps {
  source: string;
  score?: number;
  viewType?: VideoViewType;
  showGradient?: boolean;
}

export function VideoPlayerWithTimeline({ source, score, viewType, showGradient }: VideoPlayerWithTimelineProps) {
  const videoPlayerRef = useRef(null);
  const scrollViewRef = useRef(null);

  const [progress, setProgress] = useState(videoPlayerWithTimelineConfigs.startPosition);
  const [duration, setDuration] = useState(videoPlayerWithTimelineConfigs.startPosition);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [paused, setPaused] = useState(true);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [frames, setFrames] = useState(null);
  const [failedToGenerateFrames, setFailedToGenerateFrames] = useState(false);

  const handleOnProgress = (data: OnProgressData) => {
    const currentTime = data.currentTime;
    const currentTimeInSeconds = Math.round(currentTime);

    if (!paused) {
      const xOffset = getOffSetFromPopLinePlayTime(currentTime);
      /**
       * Note: setting animated: false for iOS because UI gets unresponsive while the video is playing
       * TODO: https://surgeglobal.atlassian.net/browse/SWIN-748
       */
      scrollViewRef.current.scrollTo({ x: xOffset, animated: Platform.OS === 'android' });
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
      setProgress(videoPlayerWithTimelineConfigs.startPosition);
      scrollViewRef.current.scrollTo({ x: 0.25, animated: true });
      videoPlayerRef.current.seek(0);
      setPaused(false);
      if (Platform.OS === 'android') {
        //NOTE:: To prevent the timeline from scrolling until it reaches the starting position
        setTimeout(() => {
          videoPlayerRef.current.setNativeProps({ paused: false });
        }, 500);
      }
    } else {
      setPaused(prevState => !prevState);
    }
  };

  const handleOnScrollEndDrag = () => {
    setIsVideoEnded(false);
    setPaused(false);
  };

  const handleOnScrollBeginDrag = () => {
    setIsVideoEnded(false);
    setPaused(true);
  };

  const handleVideoLoad = async (data: OnLoadData) => {
    setIsVideoLoading(false);

    if (Platform.OS === 'android') {
      videoPlayerRef.current.seek(0);
    }

    let localFileName = `someRandomFileNamee`;
    const numberOfFrames = Math.ceil(data.duration);

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

    const durationInMinsAndSeconds = convertToMinutesAndSeconds(Math.round(data.duration));
    setDuration(durationInMinsAndSeconds);

    setFrames(
      Array(numberOfFrames).fill({
        status: FRAME_STATUS.LOADING.name.description,
      }),
    );
  };

  const handleVideoEnding = () => {
    setIsVideoEnded(true);
  };

  const renderControllerIcon = () => {
    if (isVideoEnded) return <ReplayIcon />;
    else if (paused) return <PlayIcon />;
    else return <PauseIcon />;
  };

  const renderGradient = useMemo(() => {
    const getColors = () => {
      if (score <= 4) {
        return ['#F6581500', '#F65815'];
      } else if (score > 4 && score < 7) {
        return ['#FDDC2F00', '#F1D33178', '#E1C42C'];
      } else {
        return ['#A2FD2F00', '#A2FD2F50', '#45FD2F'];
      }
    };

    const gradientConfig = {
      colors: getColors(),
      locations: score > 4 ? [0.7279, 0.9051, 1] : [0.74, 1],
      start: { x: 1, y: 0 },
      end: { x: 0, y: 0 },
    };

    return (
      <LinearGradient
        colors={gradientConfig.colors}
        locations={gradientConfig.locations}
        start={gradientConfig.start}
        end={gradientConfig.end}
        style={tw`flex-1 absolute inset-0 z-4 rounded-t-7.5`}
      />
    );
  }, [score]);

  const scoreCircleBackgroundColor = useMemo(() => {
    if (score <= 4) {
      return Color.Secondary.Sz900;
    } else if (score > 4.1 && score < 7) {
      return Color.Tertiary.Sz750;
    } else {
      return Color.Primary.Sz700;
    }
  }, [score]);

  const renderScoreAndViewType = useMemo(() => {
    return (
      <>
        {score !== undefined && (
          <View style={tw`absolute z-5 w-15 h-15 rounded-7.5 bg-[${scoreCircleBackgroundColor}] justify-center`}>
            <Text
              variant={TextVariant.Heading3}
              color={score > 4.1 && score < 7 ? Color.Neutral.Sz1000 : Color.Neutral.White}>
              {score}
            </Text>
          </View>
        )}
        {viewType !== undefined && (
          <View style={tw`bg-[${Color.Neutral.Black}] justify-center absolute right-0 z-1 px-7 py-.75 rounded-2.5`}>
            <Text variant={TextVariant.LabelsAlt} color={Color.Neutral.White}>
              {viewType.toLocaleUpperCase()}
            </Text>
          </View>
        )}
      </>
    );
  }, [score, viewType]);

  return (
    <View style={tw`rounded-t-7.5 w-full`}>
      <View style={tw`h-62.5 relative`}>
        {isVideoLoading && (
          <View style={tw`flex-row justify-center items-center absolute inset-0 z-2`}>
            <LoadingIndicator size="large" color={Color.Tertiary.Sz900} />
          </View>
        )}
        {!isVideoLoading ? (
          <>
            {renderScoreAndViewType}
            {showGradient && renderGradient}
          </>
        ) : null}
        <Video
          ref={videoPlayerRef}
          onLoad={handleVideoLoad}
          onEnd={handleVideoEnding}
          onProgress={handleOnProgress}
          resizeMode={'cover'}
          source={{ uri: source }}
          paused={paused}
          style={tw`flex-1 w-full relative ${viewType ? 'rounded-tr-2.5 rounded-tl-7.5' : 'rounded-t-7.5'}`}
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
              <View style={tw`w-0.75 rounded-sm h-15 bg-Neutral-Sz100`} />
            </View>
          )}
          <ScrollView
            ref={scrollViewRef}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            onScroll={handleTimelineScroll}
            onScrollBeginDrag={handleOnScrollBeginDrag}
            onScrollEndDrag={handleOnScrollEndDrag}
            style={tw`w-full`}
            alwaysBounceHorizontal={false}
            bounces={false}
            scrollEventThrottle={1}>
            <View style={tw`w-[${BLANK_SPACE_WIDTH}px] bg-Neutral-Black`} />
            {frames?.map((frame, index) => renderFrame(frame, index))}
            <View style={tw`w-[${BLANK_SPACE_WIDTH}px] bg-Neutral-Black`} />
          </ScrollView>
        </View>
      )}
      {failedToGenerateFrames && renderFrameGenerationError()}
    </View>
  );
}
