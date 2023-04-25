import { BlurView } from '@react-native-community/blur';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

import { tw } from '@sz/config';
import { Color } from '@sz/constants';

import { BaseScreen } from '../components';
import { CONTENT } from './FAQDummyData';
import { FAQSectionContent, FAQSectionHeader } from './components';

export function FAQScreen() {
  const [activeSections, setActiveSections] = useState([]);

  const setSections = (sections: number[]) => {
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };

  return (
    <BaseScreen>
      <View style={tw`m-4 overflow-hidden rounded-2.5`}>
        <BlurView blurType="dark" blurAmount={1} reducedTransparencyFallbackColor={Color.Neutral.Sz900}>
          <View style={tw`p-4`}>
            <Accordion
              sections={CONTENT}
              activeSections={activeSections}
              renderHeader={FAQSectionHeader}
              renderContent={FAQSectionContent}
              renderAsFlatList={false}
              sectionContainerStyle={tw`mb-9`}
              touchableComponent={TouchableOpacity}
              onChange={setSections}
              expandMultiple={false}
            />
          </View>
        </BlurView>
      </View>
    </BaseScreen>
  );
}
