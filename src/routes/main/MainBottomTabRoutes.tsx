import { BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ParamListBase } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Alert, BackHandler, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { CustomMenuIcon, SwingZenLogoIcon } from '@sz/components';
import { Route } from '@sz/constants';
import { AnalysisScreen, HomeScreen, LibraryScreen, UploadScreen, VideosScreen } from '@sz/screens';

import { commonScreenOptions } from '../configs';

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
      screenOptions={{
        ...commonScreenOptions,
        headerLeft: () => (
          <View style={{ paddingLeft: 20 }}>
            <SwingZenLogoIcon width={70} height={34} />
          </View>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={() => {}} style={{ paddingRight: 20 }}>
            <CustomMenuIcon />
          </TouchableOpacity>
        ),
      }}>
      <Tab.Screen name={Route.HomeTab} component={HomeScreen} />
      <Tab.Screen name={Route.VideosTab} component={VideosScreen} />
      <Tab.Screen name={Route.UploadVideoTab} component={UploadScreen} />
      <Tab.Screen name={Route.AnalysisTab} component={AnalysisScreen} />
      <Tab.Screen name={Route.LibraryTab} component={LibraryScreen} />
    </Tab.Navigator>
  );
}
