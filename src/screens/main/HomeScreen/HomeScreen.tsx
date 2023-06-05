import React, { useEffect, useMemo } from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Link, SwingZenLogoIcon, Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, Route, TextVariant } from '@sz/constants';
import { NavigationService, PermissionService } from '@sz/services';
import { useDispatch, useSelector } from '@sz/stores';

import { BaseMainScreen, MonthSelector } from '../components';
import { SubscribeCard, VideoUploadCard } from './components';
import { DataChart } from './components/DataChart/DataChart';
import { ProfileImageBanner } from './components/ProfileImageBanner';
import { UploadedVideoCountBanner } from './components/UploadedVideoCountBanner';

export function HomeScreen() {
  const dispatch = useDispatch();

  const loading = useSelector(state => state.loading.effects.userStore.fetchUserProfileData);
  const userProfileData = useSelector(state => state.userStore.profileData);
  const initialLogin = useSelector(state => state.persistentUserStore.loginState) === 'initial';

  useEffect(() => {
    //TODO::add proper error pop up to the user
    PermissionService.requestNotificationsPermission().catch(console.error);

    //fetch user profile data
    dispatch.userStore.fetchUserProfileData().catch(console.error);

    if (initialLogin) {
      setTimeout(() => NavigationService.navigate(Route.PricePlans), 0);
    } else {
      dispatch.userStore.getSubscription({}).catch(console.error);
    }
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
    <BaseMainScreen>
      {loading ? (
        <Text variant={TextVariant.Heading3}>Loading</Text> //TODO::replace with proper loading indicator
      ) : (
        <>
          <View style={tw`mx-4 mt-5`}>
            <SwingZenLogoIcon width={70} height={34} />
            <View style={tw`mt-7`}>
              <ProfileImageBanner />
            </View>
            <View style={tw`mt-4.25`}>{renderVideoAnalysisData}</View>
          </View>
          {userProfileData?.isSubscribed ? (
            <LinearGradient
              colors={[Color.Neutral.Black, Color.Transparency.full, Color.Transparency.full]}
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
