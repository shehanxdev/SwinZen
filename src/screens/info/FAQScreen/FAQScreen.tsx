import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

import { tw } from '@sz/config';

import { BaseScreen, FAQSectionContent, FAQSectionHeader } from '../components';

//TODO:: To be integrated with once the endpoints are ready
const CONTENT = [
  {
    title: 'I am not getting club speed on some videos. Why is that?',
    content:
      'You can use up to two devices per account. This allows you to use your phone and laptop, for example, with one account',
  },
  {
    title: 'How many video uploads are provided for subscription?',
    content:
      'You can use up to two devices per account. This allows you to use your phone and laptop, for example, with one account',
  },
  {
    title: 'Can I use more than one device with my account?',
    content:
      'You can use up to two devices per account. This allows you to use your phone and laptop, for example, with one account',
  },
  {
    title: 'If I have a lesson plan with an instructor, can they see all of my uploads?',
    content:
      'You can use up to two devices per account. This allows you to use your phone and laptop, for example, with one account',
  },
  {
    title: 'If I have a lesson ongoing can I communicate to my instructor through the system?',
    content:
      'You can use up to two devices per account. This allows you to use your phone and laptop, for example, with one account',
  },
  {
    title: 'How long do I have access to my videos?',
    content:
      'You can use up to two devices per account. This allows you to use your phone and laptop, for example, with one account',
  },
];

export function FAQScreen() {
  const [activeSections, setActiveSections] = useState([]);

  const setSections = sections => {
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };

  return (
    <BaseScreen>
      <View style={tw`flex-1 p-4`}>
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
    </BaseScreen>
  );
}
