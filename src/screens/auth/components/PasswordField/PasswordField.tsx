/* eslint-disable import/no-extraneous-dependencies */
import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { AccountLockIcon, PasswordRevealIcon, TextField } from '@sz/components';
import { Color } from '@sz/constants';
import { signupValidationSchema } from '@sz/utils';

export interface PasswordFieldProps {
  testID?: string;
  name: string;
  label: string;
}

export function PasswordField({ testID, name, label }: PasswordFieldProps) {
  const [securePw, setSecurePw] = useState(true);

  const { control } = useForm({ mode: 'onChange', resolver: yupResolver(signupValidationSchema) });

  return (
    <View testID={testID}>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
          <TextField
            secureTextEntry={securePw}
            onRightIconPress={() => setSecurePw(!securePw)}
            label={label}
            leftIcon={<AccountLockIcon />}
            rightIcon={<PasswordRevealIcon />}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            helperText={error?.message ? error.message.toString() : ''}
            helperTextColor={Color.Error.SzMain}
            error={!_.isEmpty(error)}
          />
        )}
      />
    </View>
  );
}
