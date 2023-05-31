import { ToggleSwitchDataType } from '@sz/models';

import { SetupValuesType, VideoSetupSwitchType } from './video-setup.enum';

export const ClubTypeOptions = [
  { label: 'Driver', value: SetupValuesType.DRIVER },
  { label: 'Wood', value: SetupValuesType.WOOD },
  { label: 'Hybrid', value: 'hybrid' },
  { label: 'Short iron', value: 'shortIron' },
  { label: 'Mid iron', value: 'midIron' },
  { label: 'Long iron', value: 'longIron' },
];

export const InitialSetupValues = {
  videoView: SetupValuesType.DOWN_THE_LINE,
  dominantHand: SetupValuesType.RIGHT_HANDED,
  shootingMethod: SetupValuesType.TRIPOD,
  clubType: SetupValuesType.DRIVER,
};

export const ToggleSwitchData: ToggleSwitchDataType[] = [
  {
    label: 'Video view',
    options: [
      { label: 'Down the line', value: SetupValuesType.DOWN_THE_LINE },
      { label: 'Face on', value: SetupValuesType.FACE_ON },
    ],
    key: VideoSetupSwitchType.VIDEO_VIEW,
  },
  {
    label: 'Dominant hand',
    options: [
      { label: 'Right-handed', value: SetupValuesType.RIGHT_HANDED },
      { label: 'Left-handed', value: SetupValuesType.LEFT_HANDED },
    ],
    key: VideoSetupSwitchType.DOMINANT_HAND,
  },
  {
    label: 'Shooting method',
    options: [
      { label: 'Tripod', value: SetupValuesType.TRIPOD },
      { label: 'Hand held', value: SetupValuesType.HAND_HELD },
    ],
    key: VideoSetupSwitchType.SHOOTING_METHOD,
  },
];
