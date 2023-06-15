import React, { useState } from 'react';
import { FlatList, TouchableWithoutFeedback, View } from 'react-native';

import { ToggleSwitch } from '@sz/components';
import { tw } from '@sz/config';
import { CameraAngles } from '@sz/constants';
import { VideoMetaData } from '@sz/models';

import { TabScreenHeader } from '../../components/TabScreenHeader';
import { VideoThumbnailCard } from '../HomeScreen/components';
import { BaseScreen } from './../../components';
import { dummyVideoData } from './dummyVideodata';

const tabOptions = [
  { label: 'All videos', value: CameraAngles.All_Videos },
  { label: 'Face view', value: CameraAngles.Face_View },
  { label: 'Down the line', value: CameraAngles.Down_The_Line },
];

export function VideosScreen() {
  const [selctedTab, setSelctedTab] = useState<string>(CameraAngles.All_Videos);
  const [selectedItem, setSelectedItem] = useState<string>();

  const filterVideos = (videos: VideoMetaData[], currentTab: string) => {
    if (currentTab === CameraAngles.All_Videos) {
      return videos;
    } else if (currentTab === CameraAngles.Down_The_Line) {
      return videos.filter(video => video.videoType === CameraAngles.Down_The_Line);
    } else if (currentTab === CameraAngles.Face_View) {
      return videos.filter(video => video.videoType === CameraAngles.Face_View);
    }
  };

  const renderVideo = ({ item }) => (
    <TouchableWithoutFeedback
      onPress={() => {
        setSelectedItem(item.id);
      }}>
      <View style={tw`mb-9`}>
        <VideoThumbnailCard video={item} />
      </View>
    </TouchableWithoutFeedback>
  );
  return (
    <BaseScreen wrapWithScrollView={false}>
      <TabScreenHeader title="My videos" />
      <View style={tw`mx-4 mb-36`}>
        <View style={tw`mb-9 mt-4`}>
          <ToggleSwitch
            options={tabOptions}
            onChange={value => {
              setSelctedTab(value);
            }}
          />
        </View>
        <FlatList
          data={filterVideos(dummyVideoData, selctedTab)}
          renderItem={renderVideo}
          keyExtractor={item => item.id}
          extraData={selectedItem}
        />
      </View>
    </BaseScreen>
  );
}
