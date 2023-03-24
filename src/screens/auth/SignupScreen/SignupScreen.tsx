/* eslint-disable import/no-extraneous-dependencies */
import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { Button, Link, MailIcon, ProfileIcon, SecurityIcon, SwingZenLogoIcon, Text, TextField } from '@sz/components';
import { tw } from '@sz/config';
import { Color, Route, TextVariant } from '@sz/constants';
import { NavigationService } from '@sz/services';
import { signupValidationSchema } from '@sz/utils';

import { BaseAuthScreen, PasswordField } from '../components';

export function SignupScreen() {
  const { control, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(signupValidationSchema) });

  const onRegister = () => {
    console.log('User Register Pressed'); // TODO:: integrate APIs into user interface
  };

  return (
    <BaseAuthScreen testID="SignupScreenTestID">
      <View style={tw`flex-1 justify-between`}>
        <View style={tw`flex mt-20 mx-5`}>
          <View style={tw`items-center`}>
            <SwingZenLogoIcon />
          </View>
          <View style={tw`items-center`}>
            <View style={tw`mt-3 mb-10`}>
              <Text variant={TextVariant.SubTitle2SemiBold}>Register with us</Text>
            </View>
          </View>
        </View>
        <View style={tw`flex-1 mx-5`}>
          <Controller
            control={control}
            name="username"
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
              <TextField
                label="Your Name"
                leftIcon={<ProfileIcon />}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                helperText={error?.message ? error.message.toString() : ''}
                helperTextColor={Color.Error.SzMain}
                error={!_.isEmpty(error)}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
              <TextField
                label="Your Email"
                leftIcon={<MailIcon />}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                helperText={error?.message ? error.message.toString() : ''}
                helperTextColor={Color.Error.SzMain}
                error={!_.isEmpty(error)}
              />
            )}
          />
          <PasswordField name="password" label="Your Password" />
          <PasswordField name="confirmPassword" label="Please Confirm Your Password" />
          <Controller
            control={control}
            name="promoCode"
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
              <TextField
                label="Your Promotion Code"
                leftIcon={<SecurityIcon />}
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
        <View style={tw`items-center mt-10 mb-5 mx-5`}>
          <View style={tw`mb-2`}>
            <Button onPress={() => handleSubmit(onRegister)} title={'Register'} />
          </View>
          <Text variant={TextVariant.Body2Regular}>
            Already Have An Account?
            <Link
              text=" Sign in"
              onPress={() => {
                NavigationService.navigate(Route.Login);
              }}
            />
          </Text>
        </View>
      </View>
    </BaseAuthScreen>
  );
}
