import React from 'react';
import { View } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextAlignment, TextVariant } from '@sz/constants';

import { BaseLibraryScreen } from '../../components';

export function UTAInfoFourScreen() {
  return (
    <BaseLibraryScreen>
      <View style={tw`mx-4 mt-8`} testID="UTAInfoFourScreenTestID">
        <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
          {`Choose either “Down the Line” or “Face on”. Keep in mind that if you choose a video that isn’t shot in the correct perspective the system will not deliver any results. Example: If you select Down the Line, but the video you upload is Face On, there will be no data feedback on that upload.
          \nNext, if you’re left-handed, use the selector to indicate that you are left-handed. If you are right-handed the toggle defaults already.
          \nSelect what type of club you are using.
          \n4a. Auto In App Capture Method - The easiest way to upload a video because it is designed to prevent many shooting errors. Click on the big arrow to start the process.
          \n4b. Manual method - If you choose to upload a video from your phone library you must make sure it is trimmed prior to uploading. It must be trimmed right before backswing and just after. Most phone camera systems have a method of editing and trimming a video. Also the fps camera setting must be on 240fps for FO and 120 or 240 fps for DTL.`}
        </Text>
      </View>
    </BaseLibraryScreen>
  );
}
