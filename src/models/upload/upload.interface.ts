import { SetupValuesType, VideoSetupSwitchType } from '@sz/constants';

export interface VideoSetupValuesType {
  videoView: string;
  dominantHand: string;
  shootingMethod: string;
  clubType: string;
}

export interface ToggleSwitchDataType {
  label: string;
  options: { label: string; value: SetupValuesType }[];
  key: VideoSetupSwitchType;
}
