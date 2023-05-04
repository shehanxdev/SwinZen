import React, { ReactElement, useMemo, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { ErrorIcon, Link, Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextVariant } from '@sz/constants';

import { VideoUploadCardFooter } from './VideoUploadCardFooter';

type RenderedData = {
  icon?: ReactElement;
  title: string;
  linkText?: string;
};

//*NOTE:: Following color are colors in the design system but with custom alpha values
const blackColorWithAlpha = Color.Neutral.Black + '33';
const orangeColorWithAlpha = Color.Secondary.Sz900 + '57';

export function VideoUploadCard() {
  //TODO:: Removed this once the upload logic gets implemented

  const [isLoading, setIsLoading] = useState(false);
  const [isError] = useState(true);

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
        icon: <ErrorIcon color={Color.Secondary.Sz900} />,
        title: 'Your video failed to upload!',
        linkText: 'Find out why',
      };
    } else {
      return {
        title: 'No Data to Report. Get Started!',
        linkText: 'Upload a video',
      };
    }
  }, [isLoading, isError]);

  return (
    <View style={tw`rounded-2.5 overflow-hidden `}>
      <View
        style={tw`flex-1 rounded-2.5 overflow-hidden border border-[${
          isError ? orangeColorWithAlpha : Color.Tertiary.Sz900
        }]`}>
        <LinearGradient
          colors={isError ? ['#F6581500', '#F65815'] : [blackColorWithAlpha, blackColorWithAlpha]}
          locations={[0, 0.5433]}
          style={tw`inset-0`}>
          <View style={tw`items-center justify-center flex-1 gap-1 ${isError ? `mt-10.25 mb-13` : `mt-19.5 mb-22`} `}>
            {getRenderedData.icon}
            <Text variant={TextVariant.Body2Regular}>{getRenderedData.title}</Text>
            <View>
              <Link
                textColor={isError ? Color.Neutral.White : Color.Tertiary.Sz900}
                text={getRenderedData?.linkText}
                onPress={onUpload}
                underline
              />
            </View>
          </View>
        </LinearGradient>
      </View>
      {isError && (
        <VideoUploadCardFooter isError date="04 JUN 2022" cameraAngle="Down the line" results="All failed videos" />
      )}
    </View>
  );
}
