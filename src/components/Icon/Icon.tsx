import React from 'react';

import {
  AccountLockSvg,
  ArrowRightSvg,
  BackIconSvg,
  BottomTabAnalysisSvg,
  BottomTabHomeSvg,
  BottomTabLibrarySvg,
  BottomTabUploadSvg,
  BottomTabVideoSvg,
  CloseButtonSvg,
  CustomMenuSvg,
  MailIconSvg,
  PasswordHideEyeSvg,
  PasswordRevealEyeSvg,
  PricePlanFeatureListTick,
  ProfileIconSvg,
  SecurityIconSvg,
  SwingZenLogoSvg,
} from '@sz/assets';
import { Color } from '@sz/constants';

export interface SvgIconProps {
  color?: Color;
  width?: number | string; // Width and height to take the value as string. Eg: width={'100%'}
  height?: number | string;
  testID?: string;
}

export function AccountLockIcon({ color = Color.Neutral.Sz500, width = 24, height = 24 }: SvgIconProps) {
  return <AccountLockSvg width={width} height={height} fill={color} />;
}

export function BackIcon({ color, width = 12, height = 20 }: SvgIconProps) {
  return <BackIconSvg width={width} height={height} fill={color} />;
}

export function MailIcon({ color = Color.Neutral.Sz500, width = 20, height = 17 }: SvgIconProps) {
  return <MailIconSvg width={width} height={height} fill={color} />;
}

export function PasswordHideIcon({ color = Color.Neutral.Sz500, width = 24, height = 24 }: SvgIconProps) {
  return <PasswordHideEyeSvg width={width} height={height} fill={color} />;
}

export function PasswordRevealIcon({ color = Color.Neutral.Sz500, width = 24, height = 24 }: SvgIconProps) {
  return <PasswordRevealEyeSvg width={width} height={height} fill={color} />;
}

export function ProfileIcon({ color = Color.Neutral.Sz500, width = 24, height = 24 }: SvgIconProps) {
  return <ProfileIconSvg width={width} height={height} fill={color} />;
}

export function SecurityIcon({ color = Color.Neutral.Sz500, width = 20, height = 20 }: SvgIconProps) {
  return <SecurityIconSvg width={width} height={height} fill={color} />;
}

export function SwingZenLogoIcon({ color, width = 108, height = 55 }: SvgIconProps) {
  return <SwingZenLogoSvg width={width} height={height} fill={color} />;
}

export function CustomMenuIcon({ color = Color.Neutral.White, width = 24, height = 24 }: SvgIconProps) {
  return <CustomMenuSvg width={width} height={height} fill={color} />;
}

export function RightArrowIcon({ color = Color.Neutral.Sz100, width = 7.75, height = 14 }: SvgIconProps) {
  return <ArrowRightSvg width={width} height={height} fill={color} />;
}

export function BottomTabHomeIconWithLabel({ color = Color.Neutral.Sz600, width = 46, height = 43 }: SvgIconProps) {
  return <BottomTabHomeSvg width={width} height={height} fill={color} />;
}

export function BottomTabVideoIconWithLabel({ color = Color.Neutral.Sz600, width = 46, height = 43 }: SvgIconProps) {
  return <BottomTabVideoSvg width={width} height={height} fill={color} />;
}

export function BottomTabCustomUploadIcon({ color = Color.Tertiary.Sz900, width = 60, height = 60 }: SvgIconProps) {
  return <BottomTabUploadSvg width={width} height={height} fill={color} />;
}

export function BottomTabAnalysisIconWithLabel({ color = Color.Neutral.Sz600, width = 46, height = 43 }: SvgIconProps) {
  return <BottomTabAnalysisSvg width={width} height={height} fill={color} />;
}

export function BottomTabLibraryIconWithLabel({ color = Color.Neutral.Sz600, width = 46, height = 43 }: SvgIconProps) {
  return <BottomTabLibrarySvg width={width} height={height} fill={color} />;
}

export function PricePlanFeatureListTickIcon({ color = Color.Neutral.Sz500, width = 12, height = 12 }: SvgIconProps) {
  return <PricePlanFeatureListTick fill={color} width={width} height={height} />;
}

export function CloseButton({ color = Color.Neutral.Sz500, width = 12, height = 12 }: SvgIconProps) {
  return <CloseButtonSvg width={width} height={height} fill={color} />;
}
