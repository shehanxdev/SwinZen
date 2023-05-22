import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { AccountLockIcon, Button, PasswordField, Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, Route, TextVariant } from '@sz/constants';
import { ResetPasswordFormValues } from '@sz/models';
import { NavigationService, ToastService } from '@sz/services';
import { useDispatch } from '@sz/stores';
import { resetPasswordValidationSchema } from '@sz/utils';

import { BaseAuthScreen } from '../components/BaseAuthScreen';

export function ResetPasswordScreen() {
  const {
    control,
    handleSubmit,
    setFocus,
    formState: { isSubmitted, errors },
  } = useForm<ResetPasswordFormValues>({ mode: 'onChange', resolver: yupResolver(resetPasswordValidationSchema) });
  const dispatch = useDispatch();

  const onResetPasswordFormInvalid: SubmitErrorHandler<ResetPasswordFormValues> = () => {
    console.log(errors);
    //TODO:: handle error
  };

  const onResetPasswordFormValid: SubmitHandler<ResetPasswordFormValues> = async formInput => {
    try {
      await dispatch.userStore.resetPassword({
        password: formInput.password,
      });

      ToastService.success({ message: 'Success!', description: 'Password reset successfullly.' });
      NavigationService.navigate(Route.Login);
    } catch (error: any) {
      ToastService.error({ message: 'Failed!', description: error.data.message });
    }
  };
  return (
    <BaseAuthScreen>
      <View style={tw`flex-1 justify-between`} testID="ResetPasswordScreenTestID">
        <View style={tw`mx-5 flex-1 content-center`}>
          <View style={tw`items-center`}>
            <View style={tw`mt-20`}>
              <Text variant={TextVariant.SubTitle2SemiBold}>Reset password</Text>
            </View>
            <View style={tw`mt-2 mb-8`}>
              <Text variant={TextVariant.Body2Regular}>
                Your new password must be different from your previously used passwords
              </Text>
            </View>
          </View>
          <View style={tw`mb-4`}>
            <Controller
              control={control}
              name="password"
              render={({ field: { value, onChange, onBlur, ref }, fieldState: { error, isTouched } }) => (
                <PasswordField
                  ref={ref}
                  label="Your new password"
                  leftIcon={<AccountLockIcon />}
                  maxLength={256}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  helperText={(isTouched || isSubmitted) && error?.message}
                  helperTextColor={Color.Error.SzMain}
                  error={(isTouched || isSubmitted) && error !== undefined}
                  returnKeyType={'next'}
                  onSubmitEditing={() => setFocus('confirmPassword')}
                />
              )}
            />
          </View>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { value, onChange, onBlur, ref }, fieldState: { error, isTouched } }) => (
              <PasswordField
                ref={ref}
                label="Confirm your new password"
                leftIcon={<AccountLockIcon />}
                maxLength={256}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                helperText={(isTouched || isSubmitted) && error?.message}
                helperTextColor={Color.Error.SzMain}
                error={(isTouched || isSubmitted) && error !== undefined}
                returnKeyType={'done'}
              />
            )}
          />
        </View>
        <View style={tw`items-center mb-5 mx-5`}>
          <View style={tw`mb-3`}>
            <Button
              onPress={handleSubmit(onResetPasswordFormValid, onResetPasswordFormInvalid)}
              title="save new password"
            />
          </View>
        </View>
      </View>
    </BaseAuthScreen>
  );
}
