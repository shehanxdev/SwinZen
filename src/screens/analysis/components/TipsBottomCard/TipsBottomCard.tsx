import React from 'react';
import { View } from 'react-native';

import { Button, Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, Route, ScoreType, TextAlignment, TextVariant } from '@sz/constants';
import { NavigationService } from '@sz/services';

export function TipsBottomCard({ type, route }) {
  const getTypeDescription = (type: ScoreType): string => {
    switch (type) {
      case 'Setup':
        return 'Shoulder tilt is too flat. Bring your lead shoulder up a bit more at address position.';
      case 'Backswing':
        return 'Hips are swaying in backswing. Hips should rotate without too much sway.';
      case 'Downswing':
        return 'As you move through downswing don’t hang back on the back leg, transfer your weight to front foot.';
    }
  };

  const getRouteData = (route: Route) => {
    switch (route) {
      case 'pga-pro-tips':
        return {
          title: 'PGA Pro Tip',
          description: getTypeDescription(type),
          leftButtonTitle: 'AI pro tips',
          rightButtonTitle: 'Side-by-side',
          onLeftButtonPress: () => NavigationService.navigate(Route.AIProTips),
          onRightButtonPress: () => NavigationService.navigate(Route.SideBySide),
        };
      case 'ai-pro-tips':
        return {
          title: 'AI Pro Tip',
          description: getTypeDescription(type),
          leftButtonTitle: 'AI pro tips',
          rightButtonTitle: 'Side-by-side',
          onLeftButtonPress: () => NavigationService.navigate(Route.AIProTips),
          onRightButtonPress: () => NavigationService.navigate(Route.SideBySide),
        };
      case 'side-by-side':
        return {
          title: 'Side-By-Side',
          description: getTypeDescription(type),
          leftButtonTitle: 'AI pro tips',
          rightButtonTitle: 'Side-by-side',
          onLeftButtonPress: () => NavigationService.navigate(Route.AIProTips),
          onRightButtonPress: () => NavigationService.navigate(Route.SideBySide),
        };
    }
  };

  return (
    <View style={tw`pb-8.5 pt-8 px-2 rounded-t-2xl bg-Neutral-Sz900`}>
      <View style={tw`mx-4`}>
        <Text variant={TextVariant.SubTitle2SemiBold} color={Color.Neutral.Sz400} textAlign={TextAlignment.Left}>
          {getRouteData(route).title}
        </Text>
        <View style={tw`mt-3 mb-5`}>
          <Text variant={TextVariant.Body2Regular} color={Color.Neutral.Sz400} textAlign={TextAlignment.Left}>
            {getRouteData(route).description}
          </Text>
        </View>
      </View>
      <View style={tw`flex-row justify-between px-3.5 gap-2.5`}>
        <View style={tw`grow-1 basis-0`}>
          <Button
            title={getRouteData(route).leftButtonTitle}
            textColor={Color.Neutral.Black}
            backgroundColor={Color.Tertiary.Sz900}
            borderColor={Color.Tertiary.Sz900}
            onPress={getRouteData(route).onLeftButtonPress}
          />
        </View>
        <View style={tw`grow-1 basis-0`}>
          <Button
            title={getRouteData(route).rightButtonTitle}
            textColor={Color.Tertiary.Sz900}
            backgroundColor={Color.Transparency.full}
            borderColor={Color.Primary.Sz650}
            onPress={getRouteData(route).onRightButtonPress}
          />
        </View>
      </View>
    </View>
  );
}
