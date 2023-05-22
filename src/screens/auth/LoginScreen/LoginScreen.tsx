import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
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
import { Color, InputFieldConstraints, Route, TextVariant } from '@sz/constants';
import { LoginFormValues } from '@sz/models';
import { NavigationService, ToastService } from '@sz/services';
import { useDispatch, useSelector } from '@sz/stores';
import { loginValidationSchema } from '@sz/utils';

import { BaseAuthScreen } from '../components';

export function LoginScreen() {
  const {
    control,
    setFocus,
    handleSubmit,
    formState: { isSubmitted, errors },
  } = useForm<LoginFormValues>({ mode: 'onChange', resolver: yupResolver(loginValidationSchema) });

  const loading = useSelector(state => state.loading.effects.userStore.loginUserWithCredentials);

  const dispatch = useDispatch();

  const onLoginFormInvalid: SubmitErrorHandler<LoginFormValues> = () => {
    console.log(errors);
    //TODO:: handle error
  };

  const onLoginFormValid: SubmitHandler<LoginFormValues> = async formInput => {
    try {
      await dispatch.userStore.loginUserWithCredentials(formInput);
      NavigationService.navigate(Route.PricePlansStack);
    } catch (error: any) {
      ToastService.error({ message: 'Failed!', description: error.data.message });
    }
  };

  return (
    <BaseAuthScreen testID="LoginScreenTestID">
      <View style={tw`flex-1 justify-between`}>
        <View style={tw`flex mt-10 mx-5`}>
          <View style={tw`items-center`}>
            <SwingZenLogoIcon />
          </View>
          <View style={tw`items-center`}>
            <View style={tw`mt-6 mb-20`}>
              <Text variant={TextVariant.SubTitle2SemiBold}>Sign in to continue</Text>
            </View>
          </View>
        </View>
        <View style={tw`flex-1 mx-5`}>
          <View style={tw`mb-4`}>
            <Controller
              control={control}
              name="username"
              render={({ field: { value, onChange, onBlur, ref }, fieldState: { error, isTouched } }) => (
                <TextField
                  ref={ref}
                  label="Your email"
                  leftIcon={<MailIcon />}
                  maxLength={InputFieldConstraints.emailMaxLength}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  helperText={(isTouched || isSubmitted) && error?.message}
                  helperTextColor={Color.Error.SzMain}
                  error={(isTouched || isSubmitted) && error !== undefined}
                  returnKeyType={'next'}
                  onSubmitEditing={() => setFocus('password')}
                  autoCapitalize={'none'}
                />
              )}
            />
          </View>
          <View style={tw`mb-6`}>
            <Controller
              control={control}
              name="password"
              render={({ field: { value, onChange, onBlur, ref }, fieldState: { error, isTouched } }) => (
                <PasswordField
                  ref={ref}
                  label="Your password"
                  leftIcon={<AccountLockIcon />}
                  maxLength={InputFieldConstraints.nameMaxLength}
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
          <View style={tw`items-end`}>
            <Link
              text="Forgot password?"
              onPress={() => {
                NavigationService.navigate(Route.ForgotPassword);
              }}
            />
          </View>
        </View>
        <View style={tw`items-center mt-10 mb-5 mx-5`}>
          <View style={tw`mb-6`}>
            <Button onPress={handleSubmit(onLoginFormValid, onLoginFormInvalid)} title={'sign in'} loading={loading} />
          </View>
          <Text variant={TextVariant.Labels}>
            {`Don’t have an account? `}
            <Link
              text="Sign up"
              onPress={() => {
                NavigationService.navigate(Route.FAQ);
              }}
            />
          </Text>
        </View>
      </View>
    </BaseAuthScreen>
  );
}
