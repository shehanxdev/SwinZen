import { BlurView } from '@react-native-community/blur';
import React, { useMemo, useState } from 'react';
import { ActivityIndicator, ImageBackground, View } from 'react-native';

import { ErrorIcon, PlayButtonIcon, Text, UploadIcon } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextVariant } from '@sz/constants';

export function VideoUploadCard() {
  //TODO:: to be removed once the upload logic implemented
  const [uploaded, setUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError] = useState(false);

  //TODO:: to be removed once the upload logic implemented
  const onUpload = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setUploaded(true);
    }, 2000);
  };

  const renderIcon = useMemo(() => {
    if (!isLoading && !isError) {
      return <UploadIcon />;
    } else if (isLoading) {
      return <ActivityIndicator size="large" />;
    } else {
      return <ErrorIcon />;
    }
  }, [isLoading, isError]);

  const renderTitle = useMemo(() => {
    if (isLoading) {
      return 'Uploading.. Please wait!';
    } else if (!isLoading && !isError) {
      return 'No Data to Report. Get Started!';
    } else {
      return 'Your video failed to upload!';
    }
  }, [isLoading, isError]);

  const renderLinkText = useMemo(() => {
    if (isError) {
      return 'Find out why';
    }
    if (!isLoading && !isError) {
      return 'Upload a video';
    }
  }, [isLoading, isError]);

  return (
    <View style={tw`h-[218px] rounded-[10px] overflow-hidden `}>
      {!uploaded ? (
        <View
          style={tw`flex-1 rounded-[10px] overflow-hidden ${
            !isError ? 'border-2 border-[#E9ECEF] border-dashed' : 'border-none'
          }`}>
          <BlurView
            blurType="dark"
            blurAmount={10}
            reducedTransparencyFallbackColor={Color.Neutral.Sz900}
            style={tw`absolute inset-x-0 inset-y-0 rounded-[10px]`}
          />
          <View style={tw`justify-center items-center flex-1 pt-[40px]`}>
            {renderIcon}
            <View style={tw`mt-3`}>
              <Text variant={TextVariant.Body1Regular}>{renderTitle}</Text>
              <Text onPress={onUpload} variant={TextVariant.Links} color={Color.Primary.Sz400} underline>
                {renderLinkText}
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
