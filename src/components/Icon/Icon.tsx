import React from 'react';

import {
  AboutIconSvg,
  AccountLockSvg,
  BackIconSvg,
  BottomTabAnalysisSvg,
  BottomTabHomeSvg,
  BottomTabLibrarySvg,
  BottomTabUploadSvg,
  BottomTabVideoSvg,
  ContactIconSvg,
  CrossIconSvg,
  CustomMenuSvg,
  FollowersIconSvg,
  FriendIconSvg,
  LogoutIconSvg,
  MailIconSvg,
  NotificationIconSvg,
  PasswordHideEyeSvg,
  PasswordRevealEyeSvg,
  PrivacyIconSvg,
  ProfileIconSvg,
  ProfileSettingsIconSvg,
  SecurityIconSvg,
  SwingZenLogoSvg,
  TermsIconSvg,
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

export function BackIcon({ color, width = 12, height = 20 }: SvgIconProps) {
  return <BackIconSvg width={width} height={height} fill={color} />;
}

export function MailIcon({ color = Color.Neutral.Sz500, width = 20, height = 20 }: SvgIconProps) {
  return <MailIconSvg width={width} height={height} fill={color} />;
}

export function PasswordHideIcon({ color = Color.Neutral.Sz500, width = 20, height = 20 }: SvgIconProps) {
  return <PasswordHideEyeSvg width={width} height={height} fill={color} />;
}

export function PasswordRevealIcon({ color = Color.Neutral.Sz500, width = 20, height = 20 }: SvgIconProps) {
  return <PasswordRevealEyeSvg width={width} height={height} fill={color} />;
}

export function ProfileIcon({ color = Color.Neutral.Sz500, width = 20, height = 20 }: SvgIconProps) {
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

export function BottomTabHomeIconWithLabel({ color = Color.Neutral.Sz500, width = 30, height = 43 }: SvgIconProps) {
  return <BottomTabHomeSvg width={width} height={height} fill={color} />;
}

export function BottomTabVideoIconWithLabel({ color = Color.Neutral.Sz500, width = 33, height = 43 }: SvgIconProps) {
  return <BottomTabVideoSvg width={width} height={height} fill={color} />;
}

export function BottomTabUploadIconWithLabel({ color = Color.Neutral.Sz500, width = 36, height = 43 }: SvgIconProps) {
  return <BottomTabUploadSvg width={width} height={height} fill={color} />;
}

export function BottomTabAnalysisIconWithLabel({ color = Color.Neutral.Sz500, width = 40, height = 43 }: SvgIconProps) {
  return <BottomTabAnalysisSvg width={width} height={height} fill={color} />;
}

export function BottomTabLibraryIconWithLabel({ color = Color.Neutral.Sz500, width = 34, height = 43 }: SvgIconProps) {
  return <BottomTabLibrarySvg width={width} height={height} fill={color} />;
}

export function AboutIcon({ color, width = 24, height = 24 }: SvgIconProps) {
  return <AboutIconSvg width={width} height={height} fill={color} />;
}

export function ContactIcon({ color, width = 24, height = 24 }: SvgIconProps) {
  return <ContactIconSvg width={width} height={height} fill={color} />;
}

export function CrossIcon({ color, width = 16, height = 16 }: SvgIconProps) {
  return <CrossIconSvg width={width} height={height} fill={color} />;
}

export function FollowersIcon({ color, width = 24, height = 24 }: SvgIconProps) {
  return <FollowersIconSvg width={width} height={height} fill={color} />;
}

export function FriendIcon({ color, width = 24, height = 24 }: SvgIconProps) {
  return <FriendIconSvg width={width} height={height} fill={color} />;
}

export function LogoutIcon({ color, width = 24, height = 24 }: SvgIconProps) {
  return <LogoutIconSvg width={width} height={height} fill={color} />;
}

export function NotificationIcon({ color, width = 24, height = 24 }: SvgIconProps) {
  return <NotificationIconSvg width={width} height={height} fill={color} />;
}

export function PrivacyIcon({ color, width = 24, height = 24 }: SvgIconProps) {
  return <PrivacyIconSvg width={width} height={height} fill={color} />;
}

export function ProfileSettingsIcon({ color, width = 24, height = 24 }: SvgIconProps) {
  return <ProfileSettingsIconSvg width={width} height={height} fill={color} />;
}

export function TermsIcon({ color, width = 24, height = 24 }: SvgIconProps) {
  return <TermsIconSvg width={width} height={height} fill={color} />;
}
