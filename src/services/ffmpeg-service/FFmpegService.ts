import { FFmpegKit, ReturnCode } from 'ffmpeg-kit-react-native';

import { videoPlayerWithTimelineConfigs } from '@sz/constants';

import { FileSystemService } from '../file-service/FileSystemService';

export abstract class FFmpegService {
  private static frameCacheDirectry = 'timeline_frame_cache';

  static async generateFramesFromVideo(
    localFileName: string,
    videoURI: string,
    frameNumber: number,
    successCallback: (outputImagePath: string) => void,
    errorCallback: () => void,
  ): Promise<void> {
    const oldFramesCacheDirectory = `${FileSystemService.CachesDirectoryPath}/${FFmpegService.frameCacheDirectry}`;

    const directoryExists = await FileSystemService.checkDirectoryExistence(oldFramesCacheDirectory);

    if (directoryExists) {
      await FileSystemService.deleteFileFromCachesDirectory(oldFramesCacheDirectory);
    }

    const createdDirectoryPath = await FileSystemService.createDirectoryInCaches(FFmpegService.frameCacheDirectry);

    let outputImagePath = `${createdDirectoryPath}/${localFileName}_%4d.png`;
    const ffmpegCommand = `-ss 0 -i ${videoURI} -vf "fps=${videoPlayerWithTimelineConfigs.framesPerSecond}/1:round=up,scale=${videoPlayerWithTimelineConfigs.frameScale}:-2" -vframes ${frameNumber} ${outputImagePath}`;

    try {
      const handleSession = async session => {
        const returnCode = await session.getReturnCode();

        if (ReturnCode.isSuccess(returnCode)) {
          successCallback(outputImagePath);
        } else if (ReturnCode.isCancel(returnCode)) {
          console.log('Encode canceled');
        } else {
          errorCallback();
        }
      };

      await FFmpegKit.executeAsync(ffmpegCommand, handleSession);
    } catch (error) {
      errorCallback();
    }
  }
}
