import { BlurView } from '@react-native-community/blur';
import React, { useMemo, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { ErrorIcon, Link, Text, UploadIcon } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextVariant } from '@sz/constants';

import { VideoUploadCardFooter } from './VideoUploadCardFooter';

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

  const renderIcon = useMemo(() => {
    if (!isLoading && !isError) {
      return <UploadIcon />;
    } else if (isLoading) {
      return <ActivityIndicator size="large" />;
    } else if (isError) {
      return <ErrorIcon />;
    }
  }, [isLoading, isError]);

  const renderTitle = useMemo(() => {
    if (isLoading) {
      return 'Uploading.. Please wait!';
    } else if (!isLoading && !isError) {
      return 'No Data to Report. Get Started!';
    } else if (isError) {
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
    <View style={tw`h-54.5 rounded-2.5 overflow-hidden`}>
      <View
        style={tw`flex-1 rounded-2.5 overflow-hidden  ${
          !isError ? `border border-dashed border-[${Color.Neutral.Sz200}]` : 'border-0'
        }`}>
        <BlurView
          blurType="light"
          blurAmount={1} //TODO::extract these magic values to a common file
          reducedTransparencyFallbackColor={Color.Neutral.Sz900}
          style={tw`absolute inset-x-0 inset-y-0 rounded-2.5`}
        />
        <View style={tw`items-center flex-1 mt-[${isError ? '31.67px' : '90.67px'}]`}>
          {renderIcon}
          <View style={tw`mt-[16.67px]`}>
            <Text variant={TextVariant.Body2Regular}>{renderTitle}</Text>
            <View style={tw`mt-1`}>
              <Link text={renderLinkText} onPress={onUpload} underline />
            </View>
          </View>
          {isError && (
            <VideoUploadCardFooter isError date="04 JUN 2022" cameraAngle="Down the line" results="All failed videos" />
          )}
        </View>
      </View>
    </View>
  );
}
