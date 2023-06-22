import React from 'react';
import { View } from 'react-native';

import { Button, Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextAlignment, TextVariant, TipType } from '@sz/constants';

interface TipsBottomCardProps {
  testID?: string;
  description: string;
  tipType: TipType;
  onSetTipType: (type: TipType) => void;
}

interface TipDataProps {
  title: string;
  leftButtonTitle: string;
  rightButtonTitle: string;
  onLeftButtonPress: () => void;
  onRightButtonPress: () => void;
}

export function TipsBottomCard({ description, tipType, onSetTipType }: TipsBottomCardProps) {
  const getTipsData = (tipType: TipType): TipDataProps => {
    switch (tipType) {
      case 'pga-pro-tips':
        return {
          title: 'PGA Pro Tip',
          leftButtonTitle: 'AI pro tip',
          rightButtonTitle: 'Side-by-side',
          onLeftButtonPress: () => onSetTipType(TipType.AI_PRO_TIPS),
          onRightButtonPress: () => onSetTipType(TipType.SIDE_BY_SIDE),
        };
      case 'ai-pro-tips':
        return {
          title: 'AI Pro Tip',
          leftButtonTitle: 'PGA pro tip',
          rightButtonTitle: 'Side-by-side',
          onLeftButtonPress: () => onSetTipType(TipType.PGA_PRO_TIPS),
          onRightButtonPress: () => onSetTipType(TipType.SIDE_BY_SIDE),
        };
      case 'side-by-side':
        return {
          title: 'Side-By-Side',
          leftButtonTitle: 'PGA pro tip',
          rightButtonTitle: 'AI pro tip',
          onLeftButtonPress: () => onSetTipType(TipType.PGA_PRO_TIPS),
          onRightButtonPress: () => onSetTipType(TipType.AI_PRO_TIPS),
        };
    }
  };

  return (
    <View style={tw`pb-8.5 pt-8 px-2 rounded-t-2xl bg-Neutral-Sz900`}>
      <View style={tw`mx-4`}>
        <Text variant={TextVariant.SubTitle2SemiBold} color={Color.Neutral.Sz400} textAlign={TextAlignment.Left}>
          {getTipsData(tipType).title}
        </Text>
        <View style={tw`mt-3 mb-5`}>
          <Text variant={TextVariant.Body2Regular} color={Color.Neutral.Sz400} textAlign={TextAlignment.Left}>
            {description}
          </Text>
        </View>
      </View>
      <View style={tw`flex-row justify-between px-3.5 gap-2.5`}>
        <View style={tw`grow-1 basis-0`}>
          <Button
            title={getTipsData(tipType).leftButtonTitle}
            textColor={Color.Neutral.Black}
            backgroundColor={Color.Tertiary.Sz900}
            borderColor={Color.Tertiary.Sz900}
            onPress={getTipsData(tipType).onLeftButtonPress}
          />
        </View>
        <View style={tw`grow-1 basis-0`}>
          <Button
            title={getTipsData(tipType).rightButtonTitle}
            textColor={Color.Tertiary.Sz900}
            backgroundColor={Color.Transparency.full}
            borderColor={Color.Primary.Sz650}
            onPress={getTipsData(tipType).onRightButtonPress}
          />
        </View>
      </View>
    </View>
  );
}
