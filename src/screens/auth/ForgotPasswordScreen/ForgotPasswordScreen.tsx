import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { Button, Link, MailIcon, Text, TextField } from '@sz/components';
import { tw } from '@sz/config';
import { Color, Route, TextVariant } from '@sz/constants';
import { ForgotPasswordFormValues } from '@sz/models';
import { NavigationService } from '@sz/services';
import { useDispatch, useSelector } from '@sz/stores';
import { forgotPasswordValidationSchema } from '@sz/utils';

import { BaseAuthScreen } from '../components/BaseAuthScreen';

export function ForgotPasswordScreen() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitted, errors },
  } = useForm<ForgotPasswordFormValues>({ mode: 'onChange', resolver: yupResolver(forgotPasswordValidationSchema) });

  const dispatch = useDispatch();

  const loading = useSelector(state => state.loading.effects.userStore.forgetPassword);

  const onForgotPasswordFormInvalid: SubmitErrorHandler<ForgotPasswordFormValues> = () => {
    console.log(errors);
    //TODO:: handle error
  };

  const onForgotPasswordFormValid: SubmitHandler<ForgotPasswordFormValues> = async formInput => {
    try {
      await dispatch.userStore.forgetPassword(formInput);
      NavigationService.navigate(Route.ResetPasswordEmailVerification, { email: formInput.email });
    } catch (error: any) {
      console.log('error', error);
    }
  };
  return (
    <BaseAuthScreen>
      <View style={tw`flex-1 justify-between`} testID="ForgotPasswordScreenTestID">
        <View style={tw`mx-5 flex-1 justify-center content-center`}>
          <View style={tw`items-center`}>
            <View style={tw`mt-3 mb-5`}>
              <Text variant={TextVariant.SubTitle2SemiBold}>Forgot password</Text>
            </View>
            <View style={tw`mb-13`}>
              <Text variant={TextVariant.Body2Regular}>
                Enter the email associated with your account to receive reset instructions
              </Text>
            </View>
          </View>
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange, onBlur, ref }, fieldState: { error, isTouched } }) => (
              <TextField
                ref={ref}
                label="Your Email"
                leftIcon={<MailIcon />}
                maxLength={50}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                helperText={(isTouched || isSubmitted) && error?.message}
                helperTextColor={Color.Error.SzMain}
                error={(isTouched || isSubmitted) && error !== undefined}
                returnKeyType={'done'}
                autoCapitalize={'none'}
              />
            )}
          />
        </View>
        <View style={tw`items-center mb-5 mx-5`}>
          <View style={tw`mb-3`}>
            <Button
              loading={loading}
              onPress={handleSubmit(onForgotPasswordFormValid, onForgotPasswordFormInvalid)}
              title="Reset password"
            />
          </View>
          <Link
            text="Back to login"
            onPress={() => {
              NavigationService.navigate(Route.Login);
            }}
          />
        </View>
      </View>
    </BaseAuthScreen>
  );
}
