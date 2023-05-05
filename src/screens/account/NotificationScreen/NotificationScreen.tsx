import React from 'react';
import { SectionList, View } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextAlignment, TextVariant } from '@sz/constants';
import { getSectionList } from '@sz/utils';

import { BaseAccountScreen } from '../components';
import { notificationDummyData } from './NotificationDummyData';
import { NotificationCard, SectionHeader } from './components';

// calculate unread notifications count
const unreadCount = notificationDummyData.reduce((count, message) => (message.read ? count : count + 1), 0);

export function NotificationScreen() {
  return (
    <BaseAccountScreen testID="NotificationScreenTestID" wrapWithScrollView={false}>
      <View style={tw`mt-3 mx-5`}>
        <Text variant={TextVariant.Body2SemiBold} textAlign={TextAlignment.Auto}>
          You have
          <Text color={Color.Tertiary.Sz900} variant={TextVariant.Body2SemiBold}>
            {` ${unreadCount} new`}
          </Text>
          notifications today!
        </Text>
      </View>
      <SectionList
        stickySectionHeadersEnabled={false}
        sections={getSectionList(notificationDummyData)}
        keyExtractor={(item, index) => item + index}
        ItemSeparatorComponent={() => <View style={tw`mx-4 h-0.25 bg-Neutral-Sz600`} />}
        renderItem={({ item }) => <NotificationCard time={item.time} message={item.message} readStatus={item.read} />}
        renderSectionHeader={({ section: { title } }) => <SectionHeader title={title} />}
      />
    </BaseAccountScreen>
  );
}
