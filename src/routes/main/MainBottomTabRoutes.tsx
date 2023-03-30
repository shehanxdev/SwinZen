import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { Route } from '@sz/constants';
import { AnalysisScreen, HomeScreen, LibraryScreen, UploadScreen, VideosScreen } from '@sz/screens';

const Tab = createBottomTabNavigator();

export function MainBottomTabRoutes() {
  return (
    <Tab.Navigator>
      <Tab.Screen name={Route.HomeTab} component={HomeScreen} />
      <Tab.Screen name={Route.VideosTab} component={VideosScreen} />
      <Tab.Screen name={Route.UploadVideoTab} component={UploadScreen} />
      <Tab.Screen name={Route.AnalysisTab} component={AnalysisScreen} />
      <Tab.Screen name={Route.LibraryTab} component={LibraryScreen} />
    </Tab.Navigator>
  );
}
