import { BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ParamListBase } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Alert, BackHandler, TouchableOpacity, View } from 'react-native';

import { CustomMenuIcon, SwingZenLogoIcon } from '@sz/components';
import { tw } from '@sz/config';
import { Route } from '@sz/constants';
import { CustomBottomTabBar } from '@sz/layout';
import { AnalysisScreen, HomeScreen, VideosScreen } from '@sz/screens';
import { NavigationService } from '@sz/services';

import { commonScreenOptions } from '../configs';
import { LibraryStack } from '../library';
import { VideoUploadStack } from '../videoUpload';

const Tab = createBottomTabNavigator();

export function MainBottomTabRoutes({ navigation }: BottomTabScreenProps<ParamListBase>) {
  //TODO::check any conflicts with the logout bahaviour with this implemenatation
  useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // Prompt the user before leaving the app
        //TODO::Replace with a proper alert
        Alert.alert('Exit SwingZen', 'You sure want to exist?', [
          {
            text: 'No',
            style: 'cancel',
            onPress: () => {},
          },
          {
            text: 'Yes',
            style: 'destructive',
            onPress: () => BackHandler.exitApp(),
          },
        ]);
      }),
    [navigation],
  );

  return (
    <Tab.Navigator
      tabBar={props => (
        <CustomBottomTabBar
          {...props}
          onCustomUploadButtonClicked={() => {
            NavigationService.navigate(Route.VideoUploadStack);
            // Alert.alert('Custom bottom tab upload icon clicked.'); //TODO::replace with a relevant callback
          }}
        />
      )}
      screenOptions={{
        ...commonScreenOptions,
        headerLeft: () => (
          <View style={tw`pl-5`}>
            <SwingZenLogoIcon width={70} height={34} />
          </View>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={() => NavigationService.openDrawer()} style={tw`pr-5`}>
            <CustomMenuIcon />
          </TouchableOpacity>
        ),
        tabBarShowLabel: false,
      }}>
      <Tab.Screen name={Route.HomeTab} component={HomeScreen} />
      <Tab.Screen name={Route.VideosTab} component={VideosScreen} />
      {/* TODO:: commenting this line gives layout issues */}
      <Tab.Screen name={Route.VideoUploadStack} component={VideoUploadStack} />
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
