import { useHeaderHeight as useHeaderHeightRN } from '@react-navigation/elements';
import { Platform } from 'react-native';

export function useHeaderHeight() {
  const headerHeight = useHeaderHeightRN();
  // 59 - iPhone 14 Pro / 14 Pro Max
  // 50 - iPhone 13 mini
  // 47 - iPhone 12 / 12 Pro / 13 / 13 Pro / 13 Pro Max / 14 / 14 Plus
  // 44 - on iPhoneX
  // 20 - on iOS device
  if (Platform.OS === 'ios' && headerHeight === 103) {
    // adjust header height for dynamic island devices using fixed value (53.67) of UINavigationBar Y frame
    return headerHeight - (59 - 53.67);
  }
  return headerHeight;
}
