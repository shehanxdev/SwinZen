import RNFS from 'react-native-fs';

export class FileSystemService {
  static CachesDirectoryPath: string = RNFS.CachesDirectoryPath;
  static DocumentDirectoryPath: string = RNFS.DocumentDirectoryPath;
  static DownloadDirectoryPathAndroid: string = RNFS.DownloadDirectoryPath;
  static ExternalCachesDirectoryPathAndroid: string = RNFS.ExternalCachesDirectoryPath;
  static ExternalDirectoryPathAndroid: string = RNFS.ExternalDirectoryPath;
  static ExternalStorageDirectoryPathAndroid: string = RNFS.ExternalStorageDirectoryPath; // necessary to request permissions to read and write on the external storage
  static MainBundlePathIOS: string = RNFS.MainBundlePath;
  static LibraryDirectoryPathIOS: string = RNFS.LibraryDirectoryPath;
  static TemporaryDirectoryPathAndroid: string = RNFS.TemporaryDirectoryPath;

  //TODO:: Include all the logic related to react-native-fs here

  static async createDirectoryInCaches(directoryName: string): Promise<string> {
    try {
      const cachesDirectoryPath = RNFS.CachesDirectoryPath;
      const directoryPath = `${cachesDirectoryPath}/${directoryName}`;

      await RNFS.mkdir(directoryPath);
      return `${cachesDirectoryPath}/${directoryName}`;
    } catch (error) {
      console.error('Error occurred while creating directory:', error);
    }
  }

  static async checkDirectoryExistence(filePath: string): Promise<boolean> {
    try {
      const isExisting = await RNFS.exists(filePath);
      return isExisting;
    } catch (error) {
      console.log('error while looking for the directory', error);
    }
  }

  static async deleteFileFromCachesDirectory(filePath: string): Promise<void> {
    try {
      await RNFS.unlink(filePath);
    } catch (error) {
      console.log('error while deleting the item', error);
    }
  }
}
