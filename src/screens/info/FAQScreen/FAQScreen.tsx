import { BlurView } from '@react-native-community/blur';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

import { DownArrowIcon, Text, UpArrowIcon } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextAlignment, TextVariant } from '@sz/constants';

import { BaseScreen } from '../components';

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

  const renderHeader = (section, _, isActive) => {
    return (
      <View style={tw`flex-row justify-between`}>
        <View style={tw`max-w-[90%]`}>
          <Text variant={TextVariant.Body2SemiBold} color={Color.Neutral.Sz100} textAlign={TextAlignment.Left}>
            {section.title}
          </Text>
        </View>
        {isActive ? <DownArrowIcon /> : <UpArrowIcon />}
      </View>
    );
  };

  const renderContent = section => {
    return (
      <View style={tw``}>
        <Text variant={TextVariant.Body2Regular} color={Color.Neutral.Sz500} textAlign={TextAlignment.Left}>
          {section.content}
        </Text>
      </View>
    );
  };

  return (
    <BaseScreen>
      <View style={tw`flex-1 p-4`}>
        <BlurView blurType="dark" blurAmount={10} style={tw`absolute inset-0`} />
        <Accordion
          sections={CONTENT}
          activeSections={activeSections}
          //@ts-ignore
          renderHeader={renderHeader}
          renderContent={renderContent}
          renderAsFlatList={false}
          sectionContainerStyle={tw`mb-9`}
          touchableComponent={TouchableOpacity}
          //@ts-ignore
          onChange={setSections}
          expandMultiple={false}
        />
      </View>
    </BaseScreen>
  );
}
