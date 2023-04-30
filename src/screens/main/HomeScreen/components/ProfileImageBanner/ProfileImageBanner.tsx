import React, { useMemo, useState } from 'react';
import { Dimensions, View } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { TextVariant } from '@sz/constants';

const PROFILE_IMAGE_DIMENTIONS = {
  height: 25,
  width: 25,
};

/*
 Background Container 
 ===========================================
 | ==========================  =========== |
 | |      Container         |  | Profile  ||
 | |                        |  |  Image   ||
 | ==========================  =========== |
 ===========================================
*/
export function ProfileImageBanner() {
  const currentWindowWidth = Dimensions.get('window').width;

  const [backgroundContainerWidth, setBackgroundContainerWidth] = useState(currentWindowWidth);

  const containerWidth = useMemo(
    () => backgroundContainerWidth - (PROFILE_IMAGE_DIMENTIONS.width / 2) * 4,
    [backgroundContainerWidth],
  );

  return (
    <View
      onLayout={event => {
        let { width } = event.nativeEvent.layout;
        setBackgroundContainerWidth(width);
      }}
      style={tw`w-full h-18 rounded-2.5`}>
      <View
        style={[
          tw`w-${PROFILE_IMAGE_DIMENTIONS.width} h-${PROFILE_IMAGE_DIMENTIONS.height} rounded-full absolute right-0 bottom-0`,
          { backgroundColor: 'blue' },
        ]}
      />
      <View style={[tw`w-6 h-6 rounded-full absolute right-0 bottom-0`, { backgroundColor: 'green' }]} />
      <View
        style={[
          tw`h-18 rounded-2.5`,
          {
            backgroundColor: 'yellow',
            zIndex: -1,
            width: containerWidth,
          },
        ]}
      />
      <Text variant={TextVariant.Heading1}>sss</Text>
    </View>
  );
}
