import React, { ReactElement, useMemo, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { ErrorIcon, Link, Text, UploadIcon } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextVariant } from '@sz/constants';

import { VideoUploadCardFooter } from './VideoUploadCardFooter';

type RenderedData = {
  icon: ReactElement;
  title: string;
  linkText?: string;
};
const blackColorWithAlpha = Color.Neutral.Black + '33'; //TODO:: Decide
const orangeColorWithAlpha = Color.Secondary.Sz900 + '57';

export function VideoUploadCard() {
  //TODO:: Removed this once the upload logic gets implemented

  const [isLoading, setIsLoading] = useState(false);
  const [isError] = useState(false);

  //TODO:: Removed this once the upload logic gets implemented
  const onUpload = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const getRenderedData: RenderedData = useMemo(() => {
    if (isLoading) {
      return {
        icon: <ActivityIndicator size="large" />,
        title: 'Uploading.. Please wait!',
      };
    } else if (isError) {
      return {
        icon: <ErrorIcon />,
        title: 'Your video failed to upload!',
        linkText: 'Find out why',
      };
    } else {
      return {
        icon: <UploadIcon />,
        title: 'No Data to Report. Get Started!',
        linkText: 'Upload a video',
      };
    }
  }, [isLoading, isError]);

  return (
    <View style={tw`h-54.5 rounded-2.5 overflow-hidden `}>
      <View
        style={tw`flex-1 rounded-2.5 overflow-hidden border border-[${
          isError ? orangeColorWithAlpha : Color.Tertiary.Sz900
        }]`}>
        {/* <BlurView
          blurType="dark"
          blurAmount={1} //TODO::extract these magic values to a common file
          reducedTransparencyFallbackColor="#00000033"
          style={tw`absolute inset-x-0 inset-y-0 rounded-2.5`}
        /> */}
        <LinearGradient colors={[blackColorWithAlpha, blackColorWithAlpha]} style={tw`absolute inset-0`}>
          <View style={tw`items-center justify-center flex-1`}>
            <View style={tw`mt-[16.67px]`}>
              <Text variant={TextVariant.Body2Regular}>{getRenderedData.title}</Text>
              <View style={tw`mt-1`}>
                <Link text={getRenderedData?.linkText} onPress={onUpload} underline />
              </View>
            </View>
            {isError && (
              <VideoUploadCardFooter
                isError
                date="04 JUN 2022"
                cameraAngle="Down the line"
                results="All failed videos"
              />
            )}
          </View>
        </LinearGradient>
      </View>
    </View>
  );
}
