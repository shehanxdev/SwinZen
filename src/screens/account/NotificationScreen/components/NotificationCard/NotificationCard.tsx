import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { NotificationDotIcon, NotificationTimerIcon, Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextAlignment, TextVariant } from '@sz/constants';
import { updatedMoment } from '@sz/utils';

interface NotificationCardProps {
  testID?: string;
  readStatus: boolean;
  message: string;
  time: Date;
}

export function NotificationCard({ testID, readStatus = false, message, time }: NotificationCardProps) {
  // TODO:: API integration should be implemented, locally store notification and handle read status change, Notification onRead event should be handled later
  const onRead = () => {};

  return (
    <TouchableOpacity testID={testID} style={tw`mx-4`} onPress={onRead}>
      <View style={tw`flex-row mt-4 gap-3`}>
        <View style={tw`mt-2`}>
          <NotificationDotIcon color={readStatus ? Color.Neutral.Sz600 : Color.Tertiary.Sz900} />
        </View>
        <Text
          color={readStatus ? Color.Neutral.Sz600 : Color.Neutral.Sz200}
          variant={TextVariant.Body2Regular}
          textAlign={TextAlignment.Auto}>
          {message.length > 90 ? message.substring(0, 87) + '...' : message}
        </Text>
      </View>
      <View style={tw`flex-row mt-1.25 mb-4 gap-2.75 justify-end`}>
        <View style={tw`mt-1`}>
          <NotificationTimerIcon color={readStatus ? Color.Neutral.Sz600 : Color.Tertiary.Sz100} />
        </View>
        <Text
          color={readStatus ? Color.Neutral.Sz600 : Color.Neutral.Sz100}
          variant={TextVariant.Body2Regular}
          textAlign={TextAlignment.Auto}>
          {updatedMoment(time).fromNow()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
