import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { ErrorIcon, Link, Text } from '@sz/components';
import { szdayjs, tw } from '@sz/config';
import { Color, TextVariant } from '@sz/constants';

export interface VideoUploadErrorCardProps {
  showFooterAndTextLink?: boolean;
  dateUploaded?: string;
  cameraAngle?: string;
}

export function VideoUploadErrorCard({
  showFooterAndTextLink = true,
  dateUploaded,
  cameraAngle,
}: VideoUploadErrorCardProps) {
  return (
    <View style={tw`rounded-2.5 overflow-hidden h-48 `}>
      {/* NOTE:: consider adding makeTransparent method to the color constant */}
      <LinearGradient
        style={tw`flex-1 rounded-2.5 overflow-hidden border 
          border-Secondary-Sz900/34 `}
        colors={['#F6581557', '#F65815BF']}
        locations={[0, 1]}>
        <View style={tw`items-center justify-center flex-1 gap-0.25`}>
          <ErrorIcon color={Color.Secondary.Sz900} />
          <Text variant={TextVariant.Body2Regular}>Video analysis failed!</Text>
          <View style={tw`mt-1`}>
            <Link
              textColor={Color.Neutral.White}
              text={showFooterAndTextLink ? 'Find out why' : ''}
              onPress={() => {}}
              underline
            />
          </View>
        </View>
      </LinearGradient>
      {showFooterAndTextLink && (
        <View testID="VideoUploadErrorCardFooterTestId" style={tw`flex-row items-center  justify-between w-full`}>
          <Text variant={TextVariant.Body2SemiBold} color={Color.Secondary.Sz900}>
            ALL FAILED REVIEWS
          </Text>
          <Text variant={TextVariant.Body2SemiBold}>{`${szdayjs(dateUploaded)
            .format('DD MMM YYYY')
            .toUpperCase()} • ${cameraAngle}`}</Text>
        </View>
      )}
    </View>
  );
}
