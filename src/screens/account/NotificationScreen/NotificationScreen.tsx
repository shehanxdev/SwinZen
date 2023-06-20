import React, { useState } from 'react';
import { RefreshControl, SectionList, View } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextAlignment, TextVariant } from '@sz/constants';
import { useFetch } from '@sz/hooks';
import { Notification } from '@sz/models';
import { NotificationsService } from '@sz/services';
import { useDispatch, useSelector } from '@sz/stores';
import { getSectionList } from '@sz/utils';

import { BaseScreen } from './../../components';
import { NotificationCard, SectionHeader } from './components';

export function NotificationScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.userStore.accessToken);
  const { isLoading, data, refetch } = useFetch(() => NotificationsService.getUserNotifications({}, accessToken));
  const unreadCount = data ? data.results.filter(item => item.isRead === false).length : 0;
  const { results } = data || {};

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (error) {
      console.error(error);
    } finally {
      setRefreshing(false);
    }
  };

  // handle notification read status and refetchng notifications
  const handleOnPressNotification = async (item: Notification) => {
    // change notification read status
    const NotificationData: Notification = { ...item, isRead: true };
    await dispatch.userStore.patchUserNotification(NotificationData);

    // refetching updated notifications data
    onRefresh().catch(console.error);
  };

  const renderItem = ({ item }) => (
    <NotificationCard
      time={item.createdAt}
      title={item.title}
      message={item.payload}
      readStatus={item.isRead}
      handleOnPress={() => {
        if (item) {
          handleOnPressNotification(item).catch(console.error);
        }
      }}
    />
  );

  const renderItemSeparator = () => <View style={tw`mx-4 h-0.25 bg-Neutral-Sz600`} />;

  return (
    <BaseScreen testID="NotificationScreenTestID" wrapWithScrollView={false} isLoading={isLoading && !refreshing}>
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
        progressViewOffset={100}
        refreshControl={
          <RefreshControl
            colors={['#7DC32C']} // LoadingIndicator component color
            refreshing={isLoading}
            onRefresh={onRefresh}
            tintColor={Color.Neutral.White}
            titleColor={Color.Neutral.White}
          />
        }
      />
    </BaseScreen>
  );
}
