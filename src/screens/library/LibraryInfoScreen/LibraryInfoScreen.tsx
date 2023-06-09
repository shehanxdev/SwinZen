import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { View } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextAlignment, TextVariant } from '@sz/constants';

import { BaseScreen } from '../../components';

interface Points {
  title: string;
  body: string;
}

interface LibraryInfoProps {
  headerTitle: string;
  withIndex: boolean;
  content: {
    description: string;
    points: Array<Points>;
  };
}

export function LibraryInfoScreen({ route }) {
  const data = route.params.params as LibraryInfoProps;

  const navigation = useNavigation();

  // custom action for navigation header back button
  useLayoutEffect(() => {
    navigation.setOptions({
      title: data.headerTitle,
    });
  });

  return (
    <BaseScreen testID="LibraryInfoScreenTestID">
      <View style={tw`mx-4 mt-8`}>
        {data.content.description.length > 0 && (
          <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
            {data.content.description}
          </Text>
        )}
        {data.withIndex &&
          data.content.points?.map((point, index) => (
            <View key={point.title} style={tw`flex-1 ml-2`}>
              <View style={tw`flex-row gap-3`}>
                <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
                  {index + 1}.
                </Text>
                <Text color={Color.Neutral.White} variant={TextVariant.Body1SemiBold} textAlign={TextAlignment.Auto}>
                  {point.title}
                </Text>
              </View>
              <View style={tw`ml-6`}>
                <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
                  {point.body}
                  {`\n`}
                </Text>
              </View>
            </View>
          ))}
        {!data.withIndex &&
          data.content.points?.map(point => (
            <View key={point.title}>
              <Text color={Color.Neutral.White} variant={TextVariant.Body1SemiBold} textAlign={TextAlignment.Auto}>
                {point.title}
              </Text>
              <Text color={Color.Neutral.White} variant={TextVariant.Body1Regular} textAlign={TextAlignment.Auto}>
                {point.body}
              </Text>
            </View>
          ))}
      </View>
    </BaseScreen>
  );
}
