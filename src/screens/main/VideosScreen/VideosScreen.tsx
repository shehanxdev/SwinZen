import React, { useState } from 'react';
import { View } from 'react-native';

import { Text, ToggleSwitch } from '@sz/components';
import { tw } from '@sz/config';
import { TextVariant } from '@sz/constants';

import { BaseMainScreen } from '../components';
import { VideoListComponent } from './components/VideoListComponent';

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
  const dummyVideoData = {
    id: 'string',
    userId: 'string',
    name: 'string',
    videoUrl: 'string',
    videoType: 'string',
    thumbnailUrl: 'string',
    grading: 0,
    createdAt: '2023-06-04T13:22:29.181Z',
  };

  return (
    <BaseMainScreen>
      <View style={tw`mx-4`}>
        <View style={tw`mb-9 mt-4`}>
          <ToggleSwitch
            options={options}
            onChange={value => {
              setSelctedTab(value);
            }}
          />
        </View>
        {(() => {
          switch (selctedTab) {
            case values.All_videos:
              return <VideoListComponent videos={[dummyVideoData]} />;
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
