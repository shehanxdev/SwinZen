/* eslint-disable import/no-extraneous-dependencies */
import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';

import {
  AccountLockIcon,
  Button,
  Link,
  MailIcon,
  PasswordField,
  SwingZenLogoIcon,
  Text,
  TextField,
} from '@sz/components';
import { tw } from '@sz/config';
import { Color, Route, TextVariant } from '@sz/constants';
import { NavigationService } from '@sz/services';
import { signupValidationSchema } from '@sz/utils';

import { BaseAuthScreen } from '../components';

export function LoginScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange', resolver: yupResolver(signupValidationSchema) });

  const onRegister = () => {
    console.log('User Register Pressed'); // TODO:: integrate APIs into user interface
  };

  return (
    <BaseAuthScreen testID="LoginScreenTestID">
      <View style={tw`flex-1 justify-between`}>
        <View style={tw`flex mt-20 mx-5`}>
          <View style={tw`items-center`}>
            <SwingZenLogoIcon />
          </View>
          <View style={tw`items-center`}>
            <View style={tw`mt-3 mb-20`}>
              <Text variant={TextVariant.SubTitle2SemiBold}>Sign in to continue</Text>
            </View>
          </View>
        </View>
        <View style={tw`flex-1 mx-5`}>
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField
                label="Your Email"
                leftIcon={<MailIcon />}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                helperText={errors.email?.message ? errors.email.message.toString() : ''}
                helperTextColor={Color.Error.SzMain}
                error={!_.isEmpty(errors.email)}
              />
            )}
          />
          {/* <PasswordField name="loginPassword" label="Your Password" /> */}
          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange, onBlur, ref }, fieldState: {} }) => (
              <PasswordField
                ref={ref}
                label="Your Password"
                leftIcon={<AccountLockIcon />}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                // helperText={(isTouched || isSubmitted) && error?.message}
                helperTextColor={Color.Error.SzMain}
                // error={(isTouched || isSubmitted) && error !== undefined}
                returnKeyType={'next'}
                // onSubmitEditing={() => setFocus('confirmPassword')}
              />
            )}
          />
          <View style={tw`items-end`}>
            <Link
              text="Forgot password?"
              onPress={() => {
                //TODO::handle navigation
              }}
            />
          </View>
        </View>
        <View style={tw`items-center mt-10 mb-5 mx-5`}>
          <View style={tw`mb-2`}>
            <Button onPress={() => handleSubmit(onRegister)} title={'Sign in'} />
          </View>
          <Text variant={TextVariant.Body2Regular}>
            Don’t Have An Account?
            <Link
              text=" Sign up"
              onPress={() => {
                NavigationService.navigate(Route.Signup);
              }}
            />
          </Text>
        </View>
      </View>
    </BaseAuthScreen>
  );
}
