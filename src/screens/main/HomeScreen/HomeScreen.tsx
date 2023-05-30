import React, { useEffect, useMemo } from 'react';
import { Platform, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Link, Text } from '@sz/components';
import { tw } from '@sz/config';
import { TextVariant } from '@sz/constants';
import { PermissionService } from '@sz/services';
import { useDispatch, useSelector } from '@sz/stores';

import { BaseMainScreen } from '../components';
import { MonthSelector, SubscribeCard, VideoUploadCard } from './components';
import { DataChart } from './components/DataChart/DataChart';
import { ProfileImageBanner } from './components/ProfileImageBanner';
import { UploadedVideoCountBanner } from './components/UploadedVideoCountBanner';

export function HomeScreen() {
  const dispatch = useDispatch();

  const loading = useSelector(state => state.loading.effects.userStore.fetchUserProfileData);
  const userProfileData = useSelector(state => state.userStore.profileData);

  // To request notifications permissions
  useEffect(() => {
    //TODO::add proper error pop up to the user
    PermissionService.requestNotificationsPermission().catch(console.error);

    //fetch user profile data
    dispatch.userStore.fetchUserProfileData();
  }, []);

  const renderVideoAnalysisData = useMemo(() => {
    if (!userProfileData) return;

    //subscribed user
    if (userProfileData.isSubscribed) {
      //haven't update any videos
      if (userProfileData.chartData === null) return <VideoUploadCard />;
      return <DataChart {...userProfileData.chartData} />;
    }

    //user not subscribed
    return (
      <SubscribeCard features={['Analyzing your swing', 'Keep your performance noted', 'Unlimited video uploding']} />
    );
  }, [userProfileData]);

  const renderUploadedVideoCountData = useMemo(() => {
    if (!userProfileData) return;

    return (
      <View style={tw`mx-4 mt-5.5 mb-25`}>
        <UploadedVideoCountBanner
          videoCount={userProfileData.videoUploadData.videoUploads}
          swinZenUniVideoCount={userProfileData.videoUploadData.swingzenUniveristiy}
        />
      </View>
    );
  }, [userProfileData]);

  return (
    // TODO::remove this BaseAuthScreen and wrap with relative component
    <BaseMainScreen>
      {loading ? (
        <Text variant={TextVariant.Heading3}>Loading</Text> //TODO::replace with proper loading indicator
      ) : (
        //NOTE::There is an issue with the headerTransparent option with IOS devices which causes header height to be ingored by the content. This is a tempory workaround to get rid of that.
        <>
          <View style={[tw`mx-4`, { ...(Platform.OS === 'android' && { marginTop: 28 }) }]}>
            <ProfileImageBanner />
            <View style={tw`mt-4.25`}>{renderVideoAnalysisData}</View>
          </View>
          {userProfileData?.isSubscribed ? (
            <LinearGradient
              colors={['#000000', 'transparent', 'transparent']}
              locations={[0, 0.2206, 1]}
              style={tw`inset-0`}>
              <MonthSelector />
              <Text variant={TextVariant.Links}>
                {`Learn more about your progress. \nView your `} <Link text={'Instant Analysis Report.'} />
              </Text>
              {renderUploadedVideoCountData}
            </LinearGradient>
          ) : (
            renderUploadedVideoCountData
          )}
        </>
      )}
    </BaseMainScreen>
  );
}
