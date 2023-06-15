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
import { DummyImageUrls, DummyVideoUrls } from './dummyMedia';

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
    return DummyImageUrls.map(slide => {
      return (
        /**
         * NOTE:
         * Pinchable is used to zoom images by pinching
         */
        <Pinchable key={slide}>
          <Image style={tw`w-full h-full`} source={{ uri: slide }} resizeMode="cover" />
        </Pinchable>
      );
    });
  }, [DummyImageUrls]);

  const videoSlides = useMemo(() => {
    return DummyVideoUrls.map((slide, index) => {
      const isPlaying = index === currentVideo;
      return (
        <View key={slide} style={tw`w-full h-[${mediaPaneHeight}px]`}>
          {isPlaying ? (
            <Pressable onPress={() => setCurrentVideo(null)}>
              <Video
                ignoreSilentSwitch="obey"
                style={tw`w-full h-[${mediaPaneHeight}px] absolute bg-Neutral-Black`}
                source={{ uri: slide }}
                resizeMode="cover"
                onEnd={() => setCurrentVideo(null)}
              />
            </Pressable>
          ) : (
            <>
              <Video
                paused={true}
                style={tw`w-full h-[${mediaPaneHeight}px] absolute bg-Neutral-Black`}
                source={{ uri: slide }}
                resizeMode="cover"
              />
              <Pressable style={tw`m-auto`} onPress={() => setCurrentVideo(index)}>
                <VideoPlayIcon />
              </Pressable>
            </>
          )}
        </View>
      );
    });
  }, [DummyVideoUrls, currentVideo]);

  const sideBySideView = useMemo(() => {
    return (
      <>
        <Image style={tw`w-full h-${mediaPaneHeight / 2}px`} source={{ uri: DummyImageUrls[0] }} resizeMode="cover" />
        <View style={tw`w-full h-1 bg-Neutral-Sz900`} />
        <Image style={tw`w-full h-${mediaPaneHeight / 2}px`} source={{ uri: DummyImageUrls[1] }} resizeMode="cover" />
      </>
    );
  }, [DummyImageUrls]);

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
      <View style={tw`flex-1 justify-between`}>
        <View style={tw`mx-4 mb-5`}>
          <Text variant={TextVariant.Body2Regular} color={Color.Neutral.Sz400} textAlign={TextAlignment.Left}>
            {getTipTypeData(tipType).title}
          </Text>
        </View>
        <View style={tw`mb--4 w-full h-[${mediaPaneHeight}px]`}>
          <Swiper
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
