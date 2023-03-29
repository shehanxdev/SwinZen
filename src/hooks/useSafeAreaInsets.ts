import { useContext } from 'react';
import { EdgeInsets, SafeAreaInsetsContext } from 'react-native-safe-area-context';

/**
 * This hook is a drop in replacement for `react-native-safe-area-context/useSafeAreaInsets` that won't
 * throw an error if the hook is called outside of a `SafeAreaProvider`
 * This is required since we have some issues with wrapping SafeAreaProvider inside renderWithProviders for JEST testing
 * In addtion to this we can pass an option to include custom the header & bottom bar heights in the returned insets.
 */
export function useSafeAreaInsets(): EdgeInsets {
  const insets = { ...useContext(SafeAreaInsetsContext) } ?? { top: 0, right: 0, bottom: 0, left: 0 };

  return insets;
}
