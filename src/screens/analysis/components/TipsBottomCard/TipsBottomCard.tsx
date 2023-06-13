import React from 'react';
import { View } from 'react-native';

import { Button, Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, ScoreType, TextAlignment, TextVariant, TipType } from '@sz/constants';

export function TipsBottomCard({ scoreType, tipType, onSetTipType }) {
  const getTypeDescription = (scoreType: ScoreType): string => {
    switch (scoreType) {
      case 'Setup':
        return 'Shoulder tilt is too flat. Bring your lead shoulder up a bit more at address position.';
      case 'Backswing':
        return 'Hips are swaying in backswing. Hips should rotate without too much sway.';
      case 'Downswing':
        return 'As you move through downswing don’t hang back on the back leg, transfer your weight to front foot.';
    }
  };

  const getRouteData = (tipType: TipType) => {
    switch (tipType) {
      case 'pga-pro-tips':
        return {
          title: 'PGA Pro Tip',
          description: getTypeDescription(scoreType),
          leftButtonTitle: 'AI pro tips',
          rightButtonTitle: 'Side-by-side',
          onLeftButtonPress: () => onSetTipType(TipType.AI_PRO_TIPS),
          onRightButtonPress: () => onSetTipType(TipType.SIDE_BY_SIDE),
        };
      case 'ai-pro-tips':
        return {
          title: 'AI Pro Tip',
          description: getTypeDescription(scoreType),
          leftButtonTitle: 'PGA pro tip',
          rightButtonTitle: 'Side-by-side',
          onLeftButtonPress: () => onSetTipType(TipType.PGA_PRO_TIPS),
          onRightButtonPress: () => onSetTipType(TipType.SIDE_BY_SIDE),
        };
      case 'side-by-side':
        return {
          title: 'Side-By-Side',
          description: getTypeDescription(scoreType),
          leftButtonTitle: 'PGA pro rip',
          rightButtonTitle: 'AI pro tips',
          onLeftButtonPress: () => onSetTipType(TipType.PGA_PRO_TIPS),
          onRightButtonPress: () => onSetTipType(TipType.AI_PRO_TIPS),
        };
    }
  };

  return (
    <View style={tw`pb-8.5 pt-8 px-2 rounded-t-2xl bg-Neutral-Sz900`}>
      <View style={tw`mx-4`}>
        <Text variant={TextVariant.SubTitle2SemiBold} color={Color.Neutral.Sz400} textAlign={TextAlignment.Left}>
          {getRouteData(tipType).title}
        </Text>
        <View style={tw`mt-3 mb-5`}>
          <Text variant={TextVariant.Body2Regular} color={Color.Neutral.Sz400} textAlign={TextAlignment.Left}>
            {getRouteData(tipType).description}
          </Text>
        </View>
      </View>
      <View style={tw`flex-row justify-between px-3.5 gap-2.5`}>
        <View style={tw`grow-1 basis-0`}>
          <Button
            title={getRouteData(tipType).leftButtonTitle}
            textColor={Color.Neutral.Black}
            backgroundColor={Color.Tertiary.Sz900}
            borderColor={Color.Tertiary.Sz900}
            onPress={getRouteData(tipType).onLeftButtonPress}
          />
        </View>
        <View style={tw`grow-1 basis-0`}>
          <Button
            title={getRouteData(tipType).rightButtonTitle}
            textColor={Color.Tertiary.Sz900}
            backgroundColor={Color.Transparency.full}
            borderColor={Color.Primary.Sz650}
            onPress={getRouteData(tipType).onRightButtonPress}
          />
        </View>
      </View>
    </View>
  );
}
