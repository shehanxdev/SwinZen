import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { Route } from '@sz/constants';
import { CustomBottomTabBar } from '@sz/layout';
import { HomeScreen, LibraryScreen, VideosScreen } from '@sz/screens';
import { NavigationService } from '@sz/services';

import { AnalysisStack } from '../analysis';

const Tab = createBottomTabNavigator();

const DummyComponent = () => <></>;

export function MainBottomTabRoutes() {
  const renderTabBar = (props: BottomTabBarProps) => (
    <CustomBottomTabBar
      {...props}
      onCustomUploadButtonClicked={() => {
        NavigationService.navigate(Route.VideoUploadStack);
      }}
    />
  );

  return (
    <Tab.Navigator
      tabBar={renderTabBar}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name={Route.HomeTab} component={HomeScreen} />
      <Tab.Screen name={Route.VideosTab} component={VideosScreen} />
      {/* A dummy route and a dummy component is used here in order to prevent the tab bar from breaking*/}
      <Tab.Screen name={Route.DummyRoute} component={DummyComponent} />
      <Tab.Screen
        name={Route.AnalysisStack}
        component={AnalysisStack}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen name={Route.LibraryTab} component={LibraryScreen} />
    </Tab.Navigator>
  );
}
