import React, { useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { TextVariant } from '@sz/constants';
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
      <View style={tw`bg-Primary-Sz900 rounded-2.5 m-4 p-4`}>
        {
          //TODO:: to be replaced with a proper loader
          isLoading && <ActivityIndicator size="large" />
        }
        {!isLoading && data?.length && (
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

        {
          //TODO:: to be replaced with a proper UI
          !isLoading && !data?.length && <Text variant={TextVariant.Body1Regular}>No FAQ's available</Text>
        }
      </View>
    </BaseInfoScreen>
  );
}
