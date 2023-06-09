import React, { useMemo, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { TextVariant } from '@sz/constants';
import { useFetch } from '@sz/hooks';
import { FaqSection } from '@sz/models';
import { InfoService } from '@sz/services';

import { BaseScreen } from './../../components';
import { FAQSectionContent, FAQSectionHeader } from './components';

export function FAQScreen() {
  const [activeSections, setActiveSections] = useState([]);

  const { isLoading, data } = useFetch(InfoService.getFAQ);

  const sortedData = useMemo(() => {
    if (data) return data.sort((a, b) => a.questionNumber - b.questionNumber);
    return [];
  }, [data]);

  const setSections = (sections: number[]) => {
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };

  const renderFAQ = useMemo(() => {
    if (isLoading) {
      return <ActivityIndicator size="large" />; //TODO:: to be replaced with a proper loader
    } else if (sortedData?.length) {
      return (
        //TODO::handle pagination
        <Accordion
          sections={sortedData ?? []}
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
      return <Text variant={TextVariant.Body1Regular}>No FAQ's available</Text>;
    }
  }, [isLoading, sortedData, activeSections]);

  return (
    <BaseScreen wrapWithScrollView={false} isLoading={isLoading} testID="FAQScreenTestID">
      <View style={tw`rounded-2.5 m-4 p-4 bg-Transparency-dark`}>{renderFAQ}</View>
    </BaseScreen>
  );
}
