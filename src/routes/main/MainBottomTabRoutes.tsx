import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Alert, View } from 'react-native';

import { SwingZenLogoIcon } from '@sz/components';
import { tw } from '@sz/config';
import { Route } from '@sz/constants';
import { CustomBottomTabBar } from '@sz/layout';
import { AnalysisScreen, HomeScreen, LibraryScreen, UploadScreen, VideosScreen } from '@sz/screens';

import { commonScreenOptions } from '../configs';

const Tab = createBottomTabNavigator();

export function MainBottomTabRoutes() {
  const renderTabBar = (props: BottomTabBarProps) => (
    <CustomBottomTabBar
      {...props}
      onCustomUploadButtonClicked={() => {
        Alert.alert('Custom bottom tab upload icon clicked.'); //TODO::replace with a relevant callback
      }}
    />
  );

  const renderHeaderLeft = () => (
    <View style={tw`pl-5`}>
      <SwingZenLogoIcon width={70} height={34} />
    </View>
  );

  return (
    <Tab.Navigator
      tabBar={renderTabBar}
      screenOptions={{
        ...commonScreenOptions,
        headerLeft: renderHeaderLeft,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen name={Route.HomeTab} component={HomeScreen} />
      <Tab.Screen name={Route.VideosTab} component={VideosScreen} />
      <Tab.Screen name={Route.UploadVideoTab} component={UploadScreen} />
      <Tab.Screen name={Route.AnalysisTab} component={AnalysisScreen} />
      <Tab.Screen name={Route.LibraryTab} component={LibraryScreen} />
    </Tab.Navigator>
  );
}
