import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { AccountLockIcon, Button, PasswordField } from '@sz/components';
import { tw } from '@sz/config';
import { Color } from '@sz/constants';
import { ChangePasswordFormValues } from '@sz/models';
import { NavigationService, ToastService } from '@sz/services';
import { useDispatch, useSelector } from '@sz/stores';
import { changePasswordValidationSchema } from '@sz/utils';

import { BaseAccountScreen } from '../../components';

export function ChangePasswordScreen() {
  const {
    control,
    setFocus,
    handleSubmit,
    formState: { isSubmitted, errors },
  } = useForm<ChangePasswordFormValues>({ mode: 'onChange', resolver: yupResolver(changePasswordValidationSchema) });

  const loading = useSelector(state => state.loading.effects.userStore.profileChangePassword);

  const dispatch = useDispatch();

  const onChangePasswordFormInvalid: SubmitErrorHandler<ChangePasswordFormValues> = () => {
    console.log(errors);
    //TODO:: handle error
  };

  const onChangePasswordFormValid: SubmitHandler<ChangePasswordFormValues> = async formInput => {
    try {
      await dispatch.userStore.profileChangePassword(formInput);

      ToastService.success({ message: 'Success!', description: 'Password change successful!' });
      NavigationService.goBack();
    } catch (error: any) {
      ToastService.error({ message: 'Failed!', description: error.data.message });
    }
  };

  return (
    <BaseAccountScreen testID="ChangePasswordScreenTestID">
      <View style={tw`flex-1 justify-between`}>
        <View style={tw`flex-1 mx-5 mt-16`}>
          <View style={tw`mb-4`}>
            <Controller
              control={control}
              name="currentPassword"
              render={({ field: { value, onChange, onBlur, ref }, fieldState: { error, isTouched } }) => (
                <PasswordField
                  ref={ref}
                  label="current password"
                  leftIcon={<AccountLockIcon />}
                  maxLength={20}
                  value={value}
                  onChangeText={onChange}
                  onSubmitEditing={() => setFocus('newPassword')}
                  onBlur={onBlur}
                  helperText={(isTouched || isSubmitted) && error?.message}
                  helperTextColor={Color.Error.SzMain}
                  error={(isTouched || isSubmitted) && error !== undefined}
                  returnKeyType={'done'}
                />
              )}
            />
          </View>
          <View style={tw`mb-4`}>
            <Controller
              control={control}
              name="newPassword"
              render={({ field: { value, onChange, onBlur, ref }, fieldState: { error, isTouched } }) => (
                <PasswordField
                  ref={ref}
                  label="New password"
                  leftIcon={<AccountLockIcon />}
                  maxLength={20}
                  value={value}
                  onChangeText={onChange}
                  onSubmitEditing={() => setFocus('confirmNewPassword')}
                  onBlur={onBlur}
                  helperText={(isTouched || isSubmitted) && error?.message}
                  helperTextColor={Color.Error.SzMain}
                  error={(isTouched || isSubmitted) && error !== undefined}
                  returnKeyType={'done'}
                />
              )}
            />
          </View>
          <Controller
            control={control}
            name="confirmNewPassword"
            render={({ field: { value, onChange, onBlur, ref }, fieldState: { error, isTouched } }) => (
              <PasswordField
                ref={ref}
                label="Confirm password"
                leftIcon={<AccountLockIcon />}
                maxLength={20}
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
        <View style={tw`items-center mt-10 mb-5 mx-5`}>
          <Button
            onPress={handleSubmit(onChangePasswordFormValid, onChangePasswordFormInvalid)}
            title={'SAVE NEW PASSWORD'}
            loading={loading}
          />
        </View>
      </View>
    </BaseAccountScreen>
  );
}
