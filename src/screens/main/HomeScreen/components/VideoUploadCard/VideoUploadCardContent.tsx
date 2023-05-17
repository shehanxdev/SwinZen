import React, { ComponentType } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { Link, SvgIconProps, Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextVariant } from '@sz/constants';

interface VideoUploadCardContentProps {
  icon?: ComponentType<SvgIconProps>;
  title: string;
  linkText: string;
  isError?: boolean;
  iconColor?: Color;
  loading?: boolean;
  onLinkPress?: () => void;
}

export function VideoUploadCardContent({
  icon: Icon,
  title,
  linkText,
  isError = false,
  iconColor = Color.Secondary.Sz900,
  loading = false,
  onLinkPress,
}: VideoUploadCardContentProps) {
  return (
    <View style={tw`items-center justify-center flex-1 gap-0.25 h-48`}>
      {/* TODO: Update loading state */}
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          {Icon ? <Icon color={iconColor} /> : null}
          <Text variant={TextVariant.Body2Regular}>{title}</Text>
          <View style={tw`mt-1`}>
            <Link
              textColor={isError ? Color.Neutral.White : Color.Tertiary.Sz900}
              text={linkText}
              onPress={onLinkPress}
              underline
            />
          </View>
        </>
      )}
    </View>
  );
}
