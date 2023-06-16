import { ImageSourcePropType } from 'react-native';

export interface PlaylistItemDataType {
  id: string;
  videoSource: string;
  thumbnail: ImageSourcePropType;
  duration: string;
  title: string;
}
