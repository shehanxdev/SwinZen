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
}
