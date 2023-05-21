import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import { GestureResponderEvent, TouchableOpacity, View } from 'react-native';

import { NotificationDotIcon, NotificationTimerIcon, Text } from '@sz/components';
import { szdayjs, tw } from '@sz/config';
import { Color, TextAlignment, TextVariant } from '@sz/constants';

interface NotificationCardProps {
  testID?: string;
  readStatus: boolean;
  title: string;
  message: string;
  time: Date;
  handleOnPress: (event: GestureResponderEvent) => void;
}

export function NotificationCard({
  testID,
  readStatus = false,
  title,
  message,
  time,
  handleOnPress,
}: NotificationCardProps) {
  // dayjs plagin for relative time calculation
  dayjs.extend(relativeTime);

  return (
    <TouchableOpacity testID={testID} style={tw`mx-4`} onPress={handleOnPress}>
      <View style={tw`flex-row mt-4 gap-3`}>
        <View style={tw`mt-2`}>
          <NotificationDotIcon color={readStatus ? Color.Neutral.Sz600 : Color.Tertiary.Sz900} />
        </View>
        <View style={tw`flex-1`}>
          <Text
            color={readStatus ? Color.Neutral.Sz600 : Color.Neutral.Sz200}
            variant={TextVariant.Body2Regular}
            textAlign={TextAlignment.Auto}>
            {title.length > 90 ? title.substring(0, 87) + '...' : title}
          </Text>
          <Text
            color={readStatus ? Color.Neutral.Sz600 : Color.Neutral.Sz200}
            variant={TextVariant.Body2Regular}
            textAlign={TextAlignment.Auto}>
            {message.length > 90 ? message.substring(0, 87) + '...' : message}
          </Text>
        </View>
      </View>
      <View style={tw`flex-row mt-1.25 mb-4 gap-2.75 justify-end`}>
        <View style={tw`mt-1`}>
          <NotificationTimerIcon color={readStatus ? Color.Neutral.Sz600 : Color.Tertiary.Sz100} />
        </View>
        <Text
          color={readStatus ? Color.Neutral.Sz600 : Color.Neutral.Sz100}
          variant={TextVariant.Body2Regular}
          textAlign={TextAlignment.Auto}>
          {szdayjs(new Date(time)).fromNow()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
