const FRAMES_PER_SECOND = 1;
const FRAME_SCALE = 80;
const FRAME_HEIGHT = 60;
const FRAME_WIDTH = 69;
const DURATION_WINDOW_DURATION = 0.5;
const DURATION_WINDOW_WIDTH = DURATION_WINDOW_DURATION * FRAMES_PER_SECOND * FRAME_WIDTH;
const POPLINE_POSITION = '50%';

export const videoPlayerWithTimelineConfigs = {
  framesPerSecond: FRAMES_PER_SECOND,
  frameScale: FRAME_SCALE,
  frameHeight: FRAME_HEIGHT,
  frameWidth: FRAME_WIDTH,
  durationWindowDuration: DURATION_WINDOW_DURATION,
  durationWindowWidth: DURATION_WINDOW_WIDTH,
  poplinePosition: POPLINE_POSITION,
};
