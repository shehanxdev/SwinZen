import { BlurView } from '@react-native-community/blur';
import React, { useState } from 'react';
import { ActivityIndicator, ImageBackground, View } from 'react-native';

import { ErrorIcon, PlayButtonIcon, Text, UploadIcon } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextVariant } from '@sz/constants';

export function VideoUploadCard() {
  const [uploaded, setUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError] = useState(true);

  const onUpload = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setUploaded(true);
    }, 2000);
  };

  return (
    <View style={tw`h-[218px] rounded-[10px] overflow-hidden`}>
      {!uploaded ? (
        <View
          style={tw.style(
            !isError
              ? 'flex-1, rounded-[10px], overflow-hidden, border-2, border-[#E9ECEF], border-dashed, isError && border-non'
              : 'flex-1  rounded-[10px] overflow-hidden border-none',
          )}>
          <BlurView
            blurType="dark"
            blurAmount={10}
            reducedTransparencyFallbackColor={Color.Neutral.Sz900}
            style={tw`absolute inset-x-0 inset-y-0 rounded-[10px]`}
          />
          <View style={tw`justify-center items-center flex-1 pt-[40px]`}>
            {!isLoading && !isError && <UploadIcon width={45} height={45} />}
            {isLoading && <ActivityIndicator size="large" />}
            {isError && <ErrorIcon width={45} height={45} />}
            <View style={tw`mt-3`}>
              <Text variant={TextVariant.Body1Regular}>
                {isLoading && 'Uploading.. Please wait!'}
                {!isLoading && !isError && 'No Data to Report. Get Started!'}
                {isError && 'Your video failed to upload!'}
              </Text>
              <Text onPress={onUpload} variant={TextVariant.Links} color={Color.Primary.Sz400} underline>
                {!isLoading && !isError && 'Upload a video'}
                {isError && 'Find out why'}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={tw`flex-1`}>
          <ImageBackground
            source={{ uri: 'https://i.ibb.co/XFvHx8J/Rectangle-132.png' }}
            resizeMode="cover"
            style={tw`flex-1 items-center justify-center`}>
            <PlayButtonIcon width={45} height={45} />
          </ImageBackground>
          <View style={tw`absolute bottom-0 right-0 left-0`}>
            <View style={tw`flex-row items-center  justify-between w-full pb-5 px-5`}>
              <Text variant={TextVariant.Body1SemiBold}>04 JUN 2022 • Faceview</Text>
              <Text variant={TextVariant.Body2SemiBold}>10 • Pass</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
