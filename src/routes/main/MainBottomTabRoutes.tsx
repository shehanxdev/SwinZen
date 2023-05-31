import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { Route } from '@sz/constants';
import { CustomBottomTabBar } from '@sz/layout';
import { AnalysisScreen, HomeScreen, VideosScreen } from '@sz/screens';
import { NavigationService } from '@sz/services';

import { LibraryStack } from '../library';

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
      <Tab.Screen name={Route.AnalysisTab} component={AnalysisScreen} />
      <Tab.Screen
        name={Route.LibraryStack}
        component={LibraryStack}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

/*

 const renderHeaderLeft = () => (
    <View style={tw`pl-5`}>
      <SwingZenLogoIcon width={70} height={34} />
    </View>
  );
*/
