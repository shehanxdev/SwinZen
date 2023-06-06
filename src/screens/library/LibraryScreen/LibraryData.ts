import { images } from '@sz/assets';

export const sliderData = {
  usingTheApp: [
    ['How to use the app', 'Shooting environment', 'Shooting hacks', 'Uploading a video', 'Video processing time'],
    ['Successful Reviews', 'Failed Reviews', 'Swing Analysis Results', 'Swing Data', 'Swing Priority List'],
    ['Pass/Fail', 'AI-Pro Tips', 'Swing Analysis Report'],
  ],
  aboutSwingZen: [
    [
      'SwingZen analyzer app',
      'Video capture speed',
      'iPhone and android capabilities',
      'Down the line analytics',
      'Down the line AI Pro',
    ],
    ['Face on analytics', 'Face on AI Pro', 'Shooting setup'],
  ],
};

export const toggleSwitchOptions = [
  { label: 'Using the app', value: 'usingTheApp' },
  { label: 'About SwingZen', value: 'aboutSwingZen' },
];

export const golfTips = [
  {
    id: 1,
    videosCount: 9,
    label: 'AI tools',
    backgroundImage: images.AITools,
  },
  {
    id: 2,
    videosCount: 1,
    label: 'Golf Fitness',
    backgroundImage: images.AITools,
  },
  {
    id: 3,
    videosCount: 11,
    label: 'Fundamental',
    backgroundImage: images.AITools,
  },
];
