import { TouchableOpacity } from 'react-native';
import { hideMessage } from 'react-native-flash-message';

import { tw } from '@sz/config';
import { Color } from '@sz/constants';

import { CloseButton } from '../Icon';
import { InitialToastStyleProps, OtherInitialToastProps } from './Toast.types';

//Toast diaply time in ms
const SHOW_DELAY = 3000;

const initialToastStyleProps: InitialToastStyleProps = {
  style: tw`rounded-b-3xl`,
  textStyle: tw`text-base font-normal leading-[20.11px] text-[${Color.Neutral.Sz100}]`,
  titleStyle: tw`text-lg font-bold leading-[22.63px] text-[${Color.Neutral.Sz100}]`,
};

const otherInitialToastProps: OtherInitialToastProps = {
  autoHide: true,
  hideOnPress: false,
  duration: SHOW_DELAY,
  icon: {
    //@ts-ignore
    icon: () => (
      <TouchableOpacity onPress={hideMessage} style={tw`mt-1`}>
        <CloseButton color={Color.Neutral.Sz100} />
      </TouchableOpacity>
    ),
    position: 'right',
  },
  position: 'top',
};

export const customToastProps = {
  ...initialToastStyleProps,
  ...otherInitialToastProps,
};
