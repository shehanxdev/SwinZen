import { FFmpegKit, FFmpegKitConfig, ReturnCode } from 'ffmpeg-kit-react-native';
import RNFS from 'react-native-fs';

import { FRAME_PER_SEC, FRAME_WIDTH } from '@sz/constants';

export class FFmpegWrapper {
  static getFrames(localFileName, videoURI, frameNumber, successCallback, errorCallback) {
    let outputImagePath = `${RNFS.CachesDirectoryPath}/${localFileName}_%4d.png`;
    const ffmpegCommand = `-ss 0 -i ${videoURI} -vf "fps=${FRAME_PER_SEC}/1:round=up,scale=${FRAME_WIDTH}:-2" -vframes ${frameNumber} ${outputImagePath}`;

    FFmpegKit.executeAsync(
      ffmpegCommand,
      async session => {
        const state = FFmpegKitConfig.sessionStateToString(await session.getState());
        const returnCode = await session.getReturnCode();
        const failStackTrace = await session.getFailStackTrace();

        if (ReturnCode.isSuccess(returnCode)) {
          successCallback(outputImagePath);
        } else if (ReturnCode.isCancel(returnCode)) {
          console.log('Encode canceled');
        } else {
          console.log('Encode failed. Please check log for the details.');
          errorCallback();
          console.log(`Encode failed with state ${state} and rc ${returnCode}.${failStackTrace}`);
        }
      },
      log => {
        console.log(log.getMessage());
      },
      statistics => {
        console.log(statistics);
      },
    ).then(session => console.log(`Async FFmpeg process started with sessionId ${session.getSessionId()}.`));
  }
}
