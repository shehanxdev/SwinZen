import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {
  BottomTabAnalysisIconWithLabel,
  BottomTabCustomUploadIcon,
  BottomTabHomeIconWithLabel,
  BottomTabLibraryIconWithLabel,
  BottomTabVideoIconWithLabel,
} from '@sz/components';
import { tw } from '@sz/config';
import { Color } from '@sz/constants';

export const bottomTabIcons = [
  <BottomTabHomeIconWithLabel />,
  <BottomTabVideoIconWithLabel />,
  <BottomTabCustomUploadIcon />,
  <BottomTabAnalysisIconWithLabel />,
  <BottomTabLibraryIconWithLabel />,
];

interface CustomBottomTabBarProps {
  onCustomUploadButtonClicked: () => void; //Callback to handle custom onPress event of custom upload button.
}

//Callback to handle tab navigations onPress event of the tab buttons except for the custom upload button.
function onPress(isFocused: boolean, route: any, navigation: any) {
  const event = navigation.emit({
    type: 'tabPress',
    target: route.key,
    canPreventDefault: true,
  });

  if (!isFocused && !event.defaultPrevented) {
    // The `merge: true` option makes sure that the params inside the tab screen are preserved
    navigation.navigate({ name: route.name, merge: true });
  }
}

function renderIcon(index: number, isFocused: boolean) {
  return React.cloneElement(bottomTabIcons[index], {
    ...(isFocused && { color: Color.Neutral.Sz200 }),
  });
}

/*
 * As per the design system bottom tab bar should contain a custom middle button to redirect to video upload screen, which not coupled to the tab navigator.
 * This custom functional component returns a React element to display as the tab bar with the additonal customizations such as custom onPress callbacks and custom UIs.
 */
export function CustomBottomTabBar({
  state,
  descriptors,
  navigation,
  onCustomUploadButtonClicked,
}: BottomTabBarProps & CustomBottomTabBarProps) {
  return (
    <View
      style={[
        tw`flex-row justify-between h-31.5 border-t-4 px-[25px] border-t-[#d9d9d90a] bg-[#070807]`, //NOTE::#070807, #d9d9d90a are not available under the design system
      ]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={() => {
              if (index === 2) {
                onCustomUploadButtonClicked();
              } else {
                onPress(isFocused, route, navigation);
              }
            }}
            style={tw`p-1 mt-${index === 2 ? 4 : 6.25} bg-[${isFocused ? '#d9d9d90a' : `${Color.Transparency.full}`}]`}>
            {/* NOTE::#d9d9d90a isn't avaialble under the design system. */}
            {renderIcon(index, isFocused)}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
