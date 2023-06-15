import React from 'react';
import { View } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { TextAlignment, TextVariant } from '@sz/constants';

import { BaseScreen } from '../../components/BaseScreen';
import { VideoUploadErrorCard } from '../components';
import { dummyvideoUploadFailedReasons as videoAnalysisFailedReasons } from './dummyvideoUploadFailedReasons';

export function FailedVideoScreen() {
  return (
    <BaseScreen>
      <View testID="FailedVideoScreenTestId" style={tw`mx-4 mt-5`}>
        <VideoUploadErrorCard showFooterAndTextLink={false} />
        <View style={tw`mt-8`}>
          <Text variant={TextVariant.Body1Regular} textAlign={TextAlignment.Left}>
            Here's why your video has failed
          </Text>
          <View style={tw`ml-9 mr-10.5 mt-2.5`}>
            {videoAnalysisFailedReasons.map((reason, key) => {
              return (
                <Text
                  key={key}
                  variant={TextVariant.Body2Regular}
                  textAlign={TextAlignment.Left}>{`\u2022 ${reason}`}</Text>
              );
            })}
          </View>
        </View>
      </View>
    </BaseScreen>
  );
}
