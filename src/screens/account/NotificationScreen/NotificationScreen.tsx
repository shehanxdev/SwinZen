import React from 'react';
import { SectionList, View } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextAlignment, TextVariant } from '@sz/constants';
import { getSectionList } from '@sz/utils';

import { BaseAccountScreen } from '../components';
import { notificationDummyData } from './NotificationDummyData';
import { NotificationCard } from './components';

// calculate unread notifications count
const unreadCount = notificationDummyData.reduce((count, message) => (message.read ? count : count + 1), 0);

interface SectionHeaderProps {
  title: string;
}

function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <View style={tw`mx-5 mt-8 mb-1 items-start`}>
      <Text color={Color.Primary.Sz100} variant={TextVariant.SubTitle2SemiBold}>
        {title}
      </Text>
    </View>
  );
}

export function NotificationScreen() {
  return (
    <BaseAccountScreen testID="NotificationScreenTestID">
      <View style={tw`mt-3 mx-5`}>
        <Text variant={TextVariant.Body2SemiBold} textAlign={TextAlignment.Auto}>
          You have
          <Text color={Color.Tertiary.Sz900} variant={TextVariant.Body2SemiBold}>
            {' ' + unreadCount + ' new '}
          </Text>
          notifications today!
        </Text>
      </View>
      <SectionList
        sections={getSectionList(notificationDummyData)}
        keyExtractor={(item, index) => item + index}
        ItemSeparatorComponent={() => <View style={tw`mx-4 h-0.25 bg-[${Color.Neutral.Sz600}]`} />}
        renderItem={({ item }) => <NotificationCard time={item.time} message={item.message} readStatus={item.read} />}
        renderSectionHeader={({ section: { title } }) => <SectionHeader title={title} />}
      />
    </BaseAccountScreen>
  );
}
