import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react';
import { View } from 'react-native';

import { Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, ScoreType, TextAlignment, TextVariant, TipType } from '@sz/constants';

import { BaseAnalysisScreen, TipsBottomCard } from '../components';

export function ProTipsScreen({ route }) {
  const [tipType, setTipType] = useState<TipType>(TipType.PGA_PRO_TIPS);
  const { type } = route.params.params;

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: type,
    });
  });

  const getTipTypeDescription = (tipType: TipType): string => {
    switch (tipType) {
      case 'pga-pro-tips':
        return type === ScoreType.SETUP
          ? 'Take a look at how a PGA Pro would fix this swing fault'
          : 'Take a quick look on how to fix this swing fault.';
      case 'ai-pro-tips':
        return "Here's an AI Pro Tip on how to improve your swing!";
      case 'side-by-side':
        return 'Compare your swing to a pro’s!';
    }
  };

  return (
    <BaseAnalysisScreen>
      <View style={tw`flex-1 justify-between`}>
        <View style={tw`mx-4 mb-5`}>
          <Text variant={TextVariant.Body2Regular} color={Color.Neutral.Sz400} textAlign={TextAlignment.Left}>
            {getTipTypeDescription(tipType)}
          </Text>
        </View>
        <View style={tw`flex-1 mb--4 bg-white`} />
        <TipsBottomCard scoreType={type} tipType={tipType} onSetTipType={(item: TipType) => setTipType(item)} />
      </View>
    </BaseAnalysisScreen>
  );
}
