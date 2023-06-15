import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect, useMemo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { BackIcon, Button } from '@sz/components';
import { tw } from '@sz/config';
import { NavigationService } from '@sz/services';

import { BaseScreen } from '../../components';
import { ShootingSetupStepOne, ShootingSetupStepThree, ShootingSetupStepTwo } from './components';

const TEST_ID_PREFIX = 'ShootingSetupScreenTestID';

export function ShootingSetupScreen() {
  const [count, setCount] = useState(0);

  const navigation = useNavigation();

  const renderHeaderLeft = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (count > 0) {
            setCount(count - 1);
          } else {
            NavigationService.goBack();
          }
        }}
        style={tw`py-2.5 pr-2.5`}>
        <BackIcon />
      </TouchableOpacity>
    );
  };

  // custom action for navigation header back button
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: renderHeaderLeft,
    });
  });

  const renderBody = useMemo(() => {
    switch (count) {
      case 0:
        return <ShootingSetupStepOne />;
      case 1:
        return <ShootingSetupStepTwo />;
      case 2:
        return <ShootingSetupStepThree />;
      default:
        return null;
    }
  }, [count]);

  return (
    <BaseScreen>
      <View style={tw`flex-1 justify-between mx-4 mt-8`} testID={TEST_ID_PREFIX}>
        {renderBody}
        <View style={tw`mt-25 mb-3`}>
          <Button
            onPress={() => {
              if (count === 2) {
                setCount(0);
                NavigationService.goBack();
              } else {
                setCount(count + 1);
              }
            }}
            title={count === 2 ? 'Done' : 'Next'}
          />
        </View>
      </View>
    </BaseScreen>
  );
}
