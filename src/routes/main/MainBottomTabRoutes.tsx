import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { CustomMenuIcon, SwingZenLogoIcon } from '@sz/components';
import { tw } from '@sz/config';
import { Route } from '@sz/constants';
import { CustomBottomTabBar } from '@sz/layout';
import { AnalysisScreen, HomeScreen, LibraryScreen, VideosScreen } from '@sz/screens';
import { NavigationService } from '@sz/services';

import { commonScreenOptions } from '../configs';

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

  const renderHeaderLeft = () => (
    <View style={tw`pl-5`}>
      <SwingZenLogoIcon width={70} height={34} />
    </View>
  );

  const renderHeaderRight = () => (
    <TouchableOpacity onPress={() => NavigationService.openDrawer()} style={tw`pr-5`}>
      <CustomMenuIcon />
    </TouchableOpacity>
  );

  return (
    <Tab.Navigator
      tabBar={renderTabBar}
      screenOptions={{
        ...commonScreenOptions,
        headerLeft: renderHeaderLeft,
        headerRight: renderHeaderRight,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen name={Route.HomeTab} component={HomeScreen} />
      <Tab.Screen name={Route.VideosTab} component={VideosScreen} />
      {/* A dummy route and a dummy component is used here in order to prevent the tab bar from breaking*/}
      <Tab.Screen name={Route.DummyRoute} component={DummyComponent} />
      <Tab.Screen name={Route.AnalysisTab} component={AnalysisScreen} />
      <Tab.Screen name={Route.LibraryTab} component={LibraryScreen} />
    </Tab.Navigator>
  );
}
