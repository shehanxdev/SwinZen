import React, { useMemo, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { TextVariant } from '@sz/constants';
import { useFetch } from '@sz/hooks';
import { FaqSection } from '@sz/models';
import { InfoService } from '@sz/services';

import { BaseInfoScreen } from '../components';
import { FAQSectionContent, FAQSectionHeader } from './components';

export function FAQScreen() {
  const [activeSections, setActiveSections] = useState([]);
  const { isLoading, data } = useFetch(InfoService.getFAQ);

  const setSections = (sections: number[]) => {
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };

  const renderFAQ = useMemo(() => {
    //TODO:: to be replaced with a proper loader
    if (isLoading) return <ActivityIndicator size="large" />;
    else if (data?.length) {
      return (
        <Accordion
          sections={data ?? []}
          activeSections={activeSections}
          renderHeader={(content: FaqSection, index: number, isActive: boolean) => (
            <FAQSectionHeader content={content} index={index} isActive={isActive} />
          )}
          renderContent={FAQSectionContent}
          renderAsFlatList={true}
          sectionContainerStyle={tw`mb-9`}
          touchableComponent={TouchableOpacity}
          onChange={setSections}
          expandMultiple={false}
        />
      );
    } else {
      //TODO:: to be replaced with a proper UI
      <Text variant={TextVariant.Body1Regular}>No FAQ's available</Text>;
    }
  }, [isLoading, data, activeSections]);

  return (
    <BaseInfoScreen wrapWithScrollView={false}>
      <View
        style={[tw`bg-Primary-Sz900 rounded-2.5 m-4 p-4 `, { backgroundColor: `rgba(0,0,0,.5)` }]}
        testID="FAQScreenTestID">
        {renderFAQ}
      </View>
    </BaseInfoScreen>
  );
}
