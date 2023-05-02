import React, { useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

import { tw } from '@sz/config';
import { Color } from '@sz/constants';
import { useFetch } from '@sz/hooks';
import { InfoService } from '@sz/services';

import { BaseInfoScreen } from '../components';
import { FAQSectionContent, FAQSectionHeader } from './components';

export function FAQScreen() {
  const [activeSections, setActiveSections] = useState([]);
  const { isLoading, data } = useFetch(InfoService.getFAQ);

  const setSections = (sections: number[]) => {
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };

  return (
    <BaseInfoScreen>
      <View style={tw`bg-[${Color.Primary.Sz900}]/46 rounded-2.5 m-4 p-4`}>
        {
          //TODO:: to be replaced with a proper loader
          isLoading && <ActivityIndicator size="large" />
        }
        {data?.length && (
          <Accordion
            sections={data}
            activeSections={activeSections}
            renderHeader={FAQSectionHeader}
            renderContent={FAQSectionContent}
            renderAsFlatList={false}
            sectionContainerStyle={tw`mb-9`}
            touchableComponent={TouchableOpacity}
            onChange={setSections}
            expandMultiple={false}
          />
        )}
      </View>
    </BaseInfoScreen>
  );
}
