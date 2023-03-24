import React from 'react';

import {
  AccountLockSvg,
  MailIconSvg,
  PasswordRevealEyeSvg,
  ProfileIconSvg,
  SecurityIconSvg,
  SwingZenLogo,
} from '@sz/assets';
import { Color } from '@sz/constants';

export interface SvgIconProps {
  color?: Color;
  width?: number | string; // Width and height to take the value as string. Eg: width={'100%'}
  height?: number | string;
  testID?: string;
}

export function AccountLockIcon({ color = Color.Neutral.Sz500, width = 20, height = 20 }: SvgIconProps) {
  return <AccountLockSvg width={width} height={height} fill={color} />;
}

export function PasswordRevealIcon({ color = Color.Neutral.Sz500, width = 20, height = 20 }: SvgIconProps) {
  return <PasswordRevealEyeSvg width={width} height={height} fill={color} />;
}

export function MailIcon({ color = Color.Neutral.Sz500, width = 20, height = 20 }: SvgIconProps) {
  return <MailIconSvg width={width} height={height} fill={color} />;
}

export function ProfileIcon({ color = Color.Neutral.Sz500, width = 20, height = 20 }: SvgIconProps) {
  return <ProfileIconSvg width={width} height={height} fill={color} />;
}

export function SecurityIcon({ color = Color.Neutral.Sz500, width = 20, height = 20 }: SvgIconProps) {
  return <SecurityIconSvg width={width} height={height} fill={color} />;
}

export function SwingZenLogoIcon({ color, width = 108, height = 55 }: SvgIconProps) {
  return <SwingZenLogo width={width} height={height} fill={color} />;
}
