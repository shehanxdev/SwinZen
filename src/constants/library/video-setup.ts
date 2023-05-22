export const ClubTypeOptions = [
  { label: 'Driver', value: 'driver' },
  { label: 'Wood', value: 'wood' },
  { label: 'Hybrid', value: 'hybrid' },
  { label: 'Short iron', value: 'shortIron' },
  { label: 'Mid iron', value: 'midIron' },
  { label: 'Long iron', value: 'longIron' },
];

export const InitialSetupValues = {
  videoView: 'downTheLine',
  dominantHand: 'rightHanded',
  shootingMethod: 'tripod',
  clubType: 'Driver',
};

export const ToggleSwitchData = [
  {
    label: 'Video view',
    options: [
      { label: 'Down the line', value: 'downTheLine' },
      { label: 'Face on', value: 'faceOn' },
    ],
    key: 'videoView',
  },
  {
    label: 'Dominant hand',
    options: [
      { label: 'Right-handed', value: 'rightHanded' },
      { label: 'Left-handed', value: 'leftHanded' },
    ],
    key: 'dominantHand',
  },
  {
    label: 'Shooting method',
    options: [
      { label: 'Tripod', value: 'tripod' },
      { label: 'Hand held', value: 'handHeld' },
    ],
    key: 'shootingMethod',
  },
];
