import { FFmpegKit, ReturnCode } from 'ffmpeg-kit-react-native';

import { FRAMES_PER_SECOND, FRAME_SCALE } from '@sz/constants';

import { FileSystemService } from '../file-service/FileSystemService';

export abstract class FFmpegService {
  static async generateFramesFromVideo(
    localFileName: string,
    videoURI: string,
    frameNumber: number,
    successCallback: (outputImagePath: string) => void,
    errorCallback: () => void,
  ): Promise<void> {
    console.log('FileSystemService.CachesDirectoryPath', FileSystemService.CachesDirectoryPath);

    const oldFramesCacheDirectory = `${FileSystemService.CachesDirectoryPath}/timeline_frame_cache`;

    const directoryExists = await FileSystemService.checkDirectoryExistence(oldFramesCacheDirectory);

    console.log('directoryExists', directoryExists);

    if (directoryExists) {
      await FileSystemService.deleteFileFromCachesDirectory(oldFramesCacheDirectory);
      console.log('oldFramesCacheDirectory deleted');
    }

    const createdDirectoryPath = await FileSystemService.createDirectoryInCaches('timeline_frame_cache');

    let outputImagePath = `${createdDirectoryPath}/${localFileName}_%4d.png`;
    const ffmpegCommand = `-ss 0 -i ${videoURI} -vf "fps=${FRAMES_PER_SECOND}/1:round=up,scale=${FRAME_SCALE}:-2" -vframes ${frameNumber} ${outputImagePath}`;

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
