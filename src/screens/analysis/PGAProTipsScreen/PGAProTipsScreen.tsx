import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { View } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, Route, ScoreType, TextAlignment, TextVariant } from '@sz/constants';

import { BaseAnalysisScreen, TipsBottomCard } from '../components';

export function PGAProTipsScreen({ route }) {
  const { type } = route.params.params;

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: type,
    });
  });

  return (
    <BaseAnalysisScreen>
      <View style={tw`flex-1 justify-between`}>
        <View style={tw`mx-4 mb-5`}>
          <Text variant={TextVariant.Body2Regular} color={Color.Neutral.Sz400} textAlign={TextAlignment.Left}>
            {type === ScoreType.SETUP
              ? 'Take a look at how a PGA Pro would fix this swing fault'
              : 'Take a quick look on how to fix this swing fault.'}
          </Text>
        </View>
        <View style={tw`flex-1 mb--4 bg-white`} />
        <TipsBottomCard type={type} route={Route.PGAProTips} />
      </View>
    </BaseAnalysisScreen>
  );
}
