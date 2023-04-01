import { BlurView } from '@react-native-community/blur';
import { BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ParamListBase } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Alert, BackHandler, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {
  BottomTabAnalysisIconWithLabel,
  BottomTabHomeIconWithLabel,
  BottomTabLibraryIconWithLabel,
  BottomTabUploadIconWithLabel,
  BottomTabVideoIconWithLabel,
  CustomMenuIcon,
  SwingZenLogoIcon,
} from '@sz/components';
import { tw } from '@sz/config';
import { Color, Route } from '@sz/constants';
import { AnalysisScreen, HomeScreen, LibraryScreen, UploadScreen, VideosScreen } from '@sz/screens';

import { commonScreenOptions } from '../configs';

const stylesConfig = {
  blurStyles: tw`overflow-hidden absolute top-0 bottom-0 left-0 right-0 rounded-3xl border`,
  tabBarStyles: tw`absolute border-t-0 h-[95.5px]`,
};

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
          <View style={tw`pl-5`}>
            <SwingZenLogoIcon width={70} height={34} />
          </View>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={() => {}} style={tw`pr-5`}>
            <CustomMenuIcon />
          </TouchableOpacity>
        ),
        tabBarStyle: stylesConfig.tabBarStyles,
        tabBarShowLabel: false,
        tabBarBackground: () => (
          <View style={[stylesConfig.blurStyles, { borderColor: Color.Neutral.Sz500 }]}>
            {/*
             * NOTE::This is tempory workaround to avoid issues with borders at the edges getting blured when using blurView.
             * Border width of the nested view is set to so the outer view's border will not get blured.
             */}
            <View style={[stylesConfig.blurStyles, { borderWidth: 0 }]}>
              <BlurView
                blurType="dark"
                blurAmount={10} //Note::This is a magic number to handle blur amount.
                style={stylesConfig.blurStyles}
                reducedTransparencyFallbackColor={Color.Neutral.Sz900} //NOTE::This is the fallback color when the accessibility setting Reduce Transparency is enabled
              />
            </View>
          </View>
        ),
      }}>
      <Tab.Screen
        name={Route.HomeTab}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return <BottomTabHomeIconWithLabel {...(focused && { color: Color.Primary.Sz400 })} />;
          },
        }}
      />
      <Tab.Screen
        name={Route.VideosTab}
        component={VideosScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return <BottomTabVideoIconWithLabel {...(focused && { color: Color.Primary.Sz400 })} />;
          },
        }}
      />
      <Tab.Screen
        name={Route.UploadVideoTab}
        component={UploadScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return <BottomTabUploadIconWithLabel {...(focused && { color: Color.Primary.Sz400 })} />;
          },
        }}
      />
      <Tab.Screen
        name={Route.AnalysisTab}
        component={AnalysisScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return <BottomTabAnalysisIconWithLabel {...(focused && { color: Color.Primary.Sz400 })} />;
          },
        }}
      />
      <Tab.Screen
        name={Route.LibraryTab}
        component={LibraryScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return <BottomTabLibraryIconWithLabel {...(focused && { color: Color.Primary.Sz400 })} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
