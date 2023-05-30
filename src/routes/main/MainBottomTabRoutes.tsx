import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Alert } from 'react-native';

import { Route } from '@sz/constants';
import { CustomBottomTabBar } from '@sz/layout';
import { AnalysisScreen, HomeScreen, LibraryScreen, UploadScreen, VideosScreen } from '@sz/screens';

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

  return (
    <Tab.Navigator
      tabBar={renderTabBar}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name={Route.HomeTab} component={HomeScreen} />
      <Tab.Screen name={Route.VideosTab} component={VideosScreen} />
      <Tab.Screen name={Route.UploadVideoTab} component={UploadScreen} />
      <Tab.Screen name={Route.AnalysisTab} component={AnalysisScreen} />
      <Tab.Screen name={Route.LibraryTab} component={LibraryScreen} />
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
