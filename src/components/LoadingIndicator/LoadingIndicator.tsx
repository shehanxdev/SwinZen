import React from 'react';
import { ActivityIndicator as RNLoadingIndicator } from 'react-native-paper';

import { Color } from '@sz/constants';

export interface LoadingIndicatorProps {
  color?: Color;
  size?: 'small' | 'large';
}

export function LoadingIndicator({ color = '#7DC32C' as Color, size = 'large' }: LoadingIndicatorProps) {
  return <RNLoadingIndicator color={color} size={size} />;
}
