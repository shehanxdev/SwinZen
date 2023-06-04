import React, { useState } from 'react';
import { View } from 'react-native';

import { Text, ToggleSwitch } from '@sz/components';
import { tw } from '@sz/config';
import { TextVariant } from '@sz/constants';

import { BaseMainScreen } from '../components';

const values = {
  All_videos: 'All videos',
  Face_view: 'Face view',
  Down_the_line: 'Down the line',
};

const options = [
  { label: 'All videos', value: values.All_videos },
  { label: 'Face view', value: values.Face_view },
  { label: 'Down the line', value: values.Down_the_line },
];

export function VideosScreen() {
  const [selctedTab, setSelctedTab] = useState<string>(values.All_videos);

  return (
    <BaseMainScreen>
      <View style={tw`mx-4 `}>
        <ToggleSwitch
          options={options}
          onChange={value => {
            setSelctedTab(value);
            console.log(value);
          }}
        />
        {(() => {
          switch (selctedTab) {
            case values.All_videos:
              return <Text variant={TextVariant.Body1Regular}>Hi in all videos</Text>;
            case values.Face_view:
              return <Text variant={TextVariant.Body1Regular}>Hi in Face View</Text>;
            case values.Down_the_line:
              return <Text variant={TextVariant.Body1Regular}>Hi in Down the line</Text>;
          }
        })()}
      </View>
    </BaseMainScreen>
  );
}
