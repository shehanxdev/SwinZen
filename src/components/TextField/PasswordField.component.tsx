import React, { forwardRef, useState } from 'react';
import { TextInput as RNTextInput } from 'react-native';

import { Color } from '@sz/constants';

import { PasswordHideIcon, PasswordRevealIcon, SvgIconProps } from '../Icon';
import { TextField } from './TextField.component';
import { TextFieldProps } from './TextField.types';

interface PasswordFieldProps extends TextFieldProps {
  passwordIconColor?: Color;
}

export const PasswordField = forwardRef<RNTextInput, PasswordFieldProps>(function PasswordInput(
  { passwordIconColor = Color.Neutral.Sz500, ...props },
  ref,
) {
  const [enablePasswordIcon, setEnablePasswordIcon] = useState(true);

  const iconProps: SvgIconProps = {
    color: passwordIconColor,
  };

  return (
    <TextField
      ref={ref}
      onRightIconPress={() => setEnablePasswordIcon(!enablePasswordIcon)}
      rightIcon={enablePasswordIcon ? <PasswordRevealIcon {...iconProps} /> : <PasswordHideIcon {...iconProps} />}
      secureTextEntry={enablePasswordIcon}
      {...props}
    />
  );
});
