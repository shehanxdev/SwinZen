import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

import { tw } from '@sz/config';
import { Color } from '@sz/constants';
import { FaqSection } from '@sz/models';

import { BaseInfoScreen } from '../components';
import { CONTENT } from './FAQDummyData';
import { FAQSectionContent, FAQSectionHeader } from './components';

export function FAQScreen() {
  const [activeSections, setActiveSections] = useState([]);

  const setSections = (sections: number[]) => {
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };

  return (
    <BaseInfoScreen>
      <View style={tw`bg-[${Color.Primary.Sz900}]/46 rounded-2.5 m-4 p-4`} testID="FAQScreenTestID">
        <Accordion
          sections={CONTENT}
          activeSections={activeSections}
          renderHeader={(content: FaqSection, index: number, isActive: boolean) => (
            <FAQSectionHeader content={content} index={index} isActive={isActive} />
          )}
          renderContent={FAQSectionContent}
          renderAsFlatList={false}
          sectionContainerStyle={tw`mb-9`}
          touchableComponent={TouchableOpacity}
          onChange={setSections}
          expandMultiple={false}
        />
      </View>
    </BaseInfoScreen>
  );
}
