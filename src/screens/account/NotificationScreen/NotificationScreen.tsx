import React from 'react';
import { SectionList, View } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextAlignment, TextVariant } from '@sz/constants';
import { getSectionList } from '@sz/utils';

import { BaseAccountScreen, NotificationCard } from '../components';

// TODO:: dummy data until API integration and firebase integration
const dummyData = [
  {
    time: new Date('2023-04-26T10:10:30.087Z'),
    message: 'Your video is successfully uploaded now. You can check  the video now...',
    read: false,
  },
  {
    time: new Date('2023-04-26T10:10:30.087Z'),
    message: 'Your video is successfully uploaded now. You can check  the video now...',
    read: true,
  },
  {
    time: new Date('2023-04-26T10:10:30.087Z'),
    message: 'Your video is successfully uploaded now. You can check  the video now...',
    read: false,
  },
  {
    time: new Date('2023-04-25T10:10:30.087Z'),
    message: 'Your video is successfully uploaded now. You can check  the video now...',
    read: false,
  },
  {
    time: new Date('2023-04-25T10:10:30.087Z'),
    message: 'Your video is successfully uploaded now. You can check  the video now...',
    read: true,
  },
  {
    time: new Date('2023-04-22T10:10:30.087Z'),
    message: 'Your video is successfully uploaded now. You can check  the video now...',
    read: false,
  },
  {
    time: new Date('2023-04-22T10:10:30.087Z'),
    message: 'Your video is successfully uploaded now. You can check  the video now...',
    read: true,
  },
  {
    time: new Date('2023-04-15T10:10:30.087Z'),
    message: 'Your video is successfully uploaded now. You can check  the video now...',
    read: false,
  },
];

export function NotificationScreen() {
  // calculate unread notifications count
  const unreadCount = dummyData.reduce((count, message) => (message.read ? count : count + 1), 0);

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
        sections={getSectionList(dummyData)}
        keyExtractor={(item, index) => item + index}
        ItemSeparatorComponent={() => <View style={tw`mx-4 h-0.25 bg-[${Color.Neutral.Sz600}]`} />}
        renderItem={({ item }) => <NotificationCard time={item.time} message={item.message} readStatus={item.read} />}
        renderSectionHeader={({ section: { title } }) => (
          <View style={tw`mx-5 mt-8 mb-1 items-start`}>
            <Text color={Color.Primary.Sz100} variant={TextVariant.SubTitle2SemiBold}>
              {title}
            </Text>
          </View>
        )}
      />
    </BaseAccountScreen>
  );
}
