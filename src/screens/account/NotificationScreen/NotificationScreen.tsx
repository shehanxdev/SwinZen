import React from 'react';
import { ActivityIndicator, SectionList, View } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextAlignment, TextVariant } from '@sz/constants';
import { useFetch } from '@sz/hooks';
import { Notification } from '@sz/models';
import { NotifcationsService } from '@sz/services';
import { useDispatch, useSelector } from '@sz/stores';
import { getSectionList } from '@sz/utils';

import { BaseAccountScreen } from '../components';
import { NotificationCard, SectionHeader } from './components';

export function NotificationScreen() {
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.userStore.accessToken);
  const { isLoading, data, refetch } = useFetch(() => NotifcationsService.getUserNotifications({}, accessToken));
  const unreadCount = data ? data.results.filter(item => item.isRead === false).length : 0;
  const { results } = data || {};

  // handle notification read status and refetchng notifications
  const handleOnPressNotification = async (item: Notification) => {
    // change notification read status
    const NotificationData: Notification = { ...item, isRead: true };
    await dispatch.userStore.patchUserNotification(NotificationData);

    // refetching updated notifications data
    refetch();
  };

  const renderItem = ({ item }) => (
    <NotificationCard
      time={item.createdAt}
      title={item.title}
      message={item.payload}
      readStatus={item.isRead}
      handleOnPress={() => handleOnPressNotification(item)}
    />
  );

  const renderItemSeparator = () => <View style={tw`mx-4 h-0.25 bg-Neutral-Sz600`} />;

  return (
    <BaseAccountScreen testID="NotificationScreenTestID" wrapWithScrollView={false}>
      {isLoading ? (
        // TODO:: to be replaced with a proper loader
        <ActivityIndicator size="large" />
      ) : (
        <>
          <View style={tw`mt-3 mx-5`}>
            <Text variant={TextVariant.Body2SemiBold} textAlign={TextAlignment.Auto}>
              You have
              <Text color={Color.Tertiary.Sz900} variant={TextVariant.Body2SemiBold}>
                {` ${unreadCount} new `}
              </Text>
              notifications today!
            </Text>
          </View>
          <SectionList
            stickySectionHeadersEnabled={false}
            sections={getSectionList(results ?? [])}
            keyExtractor={(item, index) => item.id + index}
            ItemSeparatorComponent={renderItemSeparator}
            renderItem={renderItem}
            renderSectionHeader={({ section: { title } }) => <SectionHeader title={title} />}
          />
        </>
      )}
    </BaseAccountScreen>
  );
}
