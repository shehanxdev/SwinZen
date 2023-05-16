import React, { useState } from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { ErrorIcon } from '@sz/components';
import { tw } from '@sz/config';

import { VideoUploadCardContent } from './VideoUploadCardContent';
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

  return (
    <View style={tw`rounded-2.5 overflow-hidden`}>
      <View
        style={tw`flex-1 rounded-2.5 overflow-hidden border ${
          isError ? 'border-Secondary-Sz900/57' : 'border-Tertiary-Sz900'
        }`}>
        {isError ? (
          <LinearGradient colors={['#F6581500', '#F65815']} locations={[0, 0.5433]} style={tw`inset-0`}>
            <VideoUploadCardContent
              title={'Your video failed to upload!'}
              linkText="Find out why"
              onLinkPress={() => {}}
              isError
              icon={ErrorIcon}
            />
          </LinearGradient>
        ) : (
          <View style={tw`bg-Neutral-Black/33`}>
            <VideoUploadCardContent
              title="No Data to Report. Get Started!"
              linkText="Upload a video"
              onLinkPress={onUpload}
              loading={isLoading}
            />
          </View>
        )}
      </View>
      {isError && (
        //TODO:: replace static prop values
        <VideoUploadCardFooter isError date="04 JUN 2022" cameraAngle="Down the line" results="All failed videos" />
      )}
    </View>
  );
}
