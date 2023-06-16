import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Dimensions, Image, Pressable, View } from 'react-native';
import Pinchable from 'react-native-pinchable';
import Swiper from 'react-native-swiper';
import Video from 'react-native-video';

import { SliderLeftIcon, SliderRightIcon, Text, VideoPlayIcon } from '@sz/components';
import { tw } from '@sz/config';
import { Checkpoint, Color, ProTipsInfo, TextAlignment, TextVariant, TipType } from '@sz/constants';

import { BaseAnalysisScreen, TipsBottomCard } from '../components';
import { DummyMedia } from './dummyMedia';

const TEST_ID_PREFIX = 'ProTipsScreenTestID';

export function ProTipsScreen({ route }) {
  const [tipType, setTipType] = useState(TipType.PGA_PRO_TIPS);
  const [currentVideo, setCurrentVideo] = useState(null);

  const { videoType, checkpoint, subCheckpoint } = route.params.params;

  const screenHeight = Dimensions.get('window').height;
  const mediaPaneHeight = screenHeight * 0.55; // Need to give specific height for the swiper and also into media container

  const swiperRef = useRef(null);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: checkpoint,
    });
  });

  useEffect(() => {
    // Reset swiper index when tipType is changing
    swiperRef.current.scrollTo(0);
  }, [tipType]);

  const imageSlides = useMemo(() => {
    return DummyMedia.map(slide => {
      return (
        /**
         * NOTE:
         * Pinchable is used to zoom images by pinching
         */
        <Pinchable key={slide}>
          <Image style={tw`w-full h-full`} source={{ uri: slide.thumbnail }} resizeMode="cover" />
        </Pinchable>
      );
    });
  }, [DummyMedia]);

  const videoSlides = useMemo(() => {
    return DummyMedia.map((slide, index) => {
      const isPlaying = index === currentVideo;
      return (
        <View testID={`${TEST_ID_PREFIX}-video`} key={slide.thumbnail} style={tw`w-full h-[${mediaPaneHeight}px]`}>
          {isPlaying ? (
            <Pressable onPress={() => setCurrentVideo(null)}>
              <Video
                ignoreSilentSwitch="obey"
                style={tw`w-full h-[${mediaPaneHeight}px] absolute bg-Neutral-Black`}
                source={{ uri: slide.video }}
                resizeMode="cover"
                onEnd={() => setCurrentVideo(null)}
              />
            </Pressable>
          ) : (
            <>
              <Video
                paused={true}
                style={tw`w-full h-[${mediaPaneHeight}px] absolute bg-Neutral-Black`}
                source={{ uri: slide.video }}
                resizeMode="cover"
                poster={slide.thumbnail}
                posterResizeMode="cover"
              />
              <Pressable style={tw`m-auto`} onPress={() => setCurrentVideo(index)}>
                <VideoPlayIcon />
              </Pressable>
            </>
          )}
        </View>
      );
    });
  }, [DummyMedia, currentVideo]);

  const sideBySideView = useMemo(() => {
    return (
      <>
        <Image
          style={tw`w-full h-${mediaPaneHeight / 2}px`}
          source={{ uri: DummyMedia[0].thumbnail }}
          resizeMode="cover"
        />
        <View style={tw`w-full h-1 bg-Neutral-Sz900`} />
        <Image
          style={tw`w-full h-${mediaPaneHeight / 2}px`}
          source={{ uri: DummyMedia[1].thumbnail }}
          resizeMode="cover"
        />
      </>
    );
  }, [DummyMedia]);

  const getTipTypeData = (tipType: TipType) => {
    switch (tipType) {
      case 'pga-pro-tips':
        return {
          title:
            checkpoint === Checkpoint.SETUP
              ? 'Take a look at how a PGA Pro would fix this swing fault'
              : 'Take a quick look on how to fix this swing fault.',
          content: videoSlides,
        };
      case 'ai-pro-tips':
        return { title: "Here's an AI Pro Tip on how to improve your swing!", content: imageSlides };
      case 'side-by-side':
        return { title: 'Compare your swing to a pro’s!', content: sideBySideView };
    }
  };

  return (
    <BaseAnalysisScreen>
      <View testID={`${TEST_ID_PREFIX}`} style={tw`flex-1 justify-between`}>
        <View style={tw`mx-4 mb-5`}>
          <Text variant={TextVariant.Body2Regular} color={Color.Neutral.Sz400} textAlign={TextAlignment.Left}>
            {getTipTypeData(tipType).title}
          </Text>
        </View>
        <View style={tw`mb--4 w-full h-[${mediaPaneHeight}px]`}>
          <Swiper
            testID={`${TEST_ID_PREFIX}-swiper`}
            ref={swiperRef}
            showsButtons={tipType !== 'side-by-side'}
            showsPagination={false}
            loop={false}
            height={mediaPaneHeight}
            onScroll={() => setCurrentVideo(null)}
            scrollEventThrottle={0}
            prevButton={<SliderLeftIcon />}
            nextButton={<SliderRightIcon />}>
            {getTipTypeData(tipType).content}
          </Swiper>
        </View>
        <TipsBottomCard
          description={ProTipsInfo[videoType][checkpoint][subCheckpoint]}
          tipType={tipType}
          onSetTipType={(item: TipType) => setTipType(item)}
        />
      </View>
    </BaseAnalysisScreen>
  );
}
