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
  ProfileIcon,
  SecurityIcon,
  SwingZenLogoIcon,
  Text,
  TextField,
} from '@sz/components';
import { tw } from '@sz/config';
import { Color, Route, TextAlignment, TextVariant } from '@sz/constants';
import { SignupFormValues } from '@sz/models';
import { NavigationService, ToastService } from '@sz/services';
import { useDispatch, useSelector } from '@sz/stores';
import { signupValidationSchema } from '@sz/utils';

import { BaseAuthScreen } from '../components';

export function SignupScreen() {
  const {
    control,
    handleSubmit,
    setFocus,
    formState: { isSubmitted, errors },
  } = useForm<SignupFormValues>({ mode: 'onChange', resolver: yupResolver(signupValidationSchema) });

  const loading = useSelector(state => state.loading.effects.userStore.registerUser);

  const dispatch = useDispatch();

  const onSignUpFormInvalid: SubmitErrorHandler<SignupFormValues> = () => {
    console.log(errors);
    //TODO:: handle error
  };

  const onSignUpFormValid: SubmitHandler<SignupFormValues> = async formInput => {
    try {
      await dispatch.userStore.registerUser(formInput);
      NavigationService.navigate(Route.RegisterEmailVerification, formInput.username);
    } catch (error: any) {
      ToastService.error({ message: 'Failed!', description: error.data.message });
    }
  };

  return (
    <BaseAuthScreen testID="SignupScreenTestID">
      <View style={tw`flex-1 justify-between`}>
        <View style={tw`flex mt-10 mx-5`}>
          <View style={tw`items-center`}>
            <SwingZenLogoIcon />
          </View>
          <View style={tw`items-center`}>
            <View style={tw`mt-6 mb-4`}>
              <Text variant={TextVariant.SubTitle2SemiBold}>Register with us</Text>
            </View>
          </View>
        </View>
        <View style={tw`flex-1 mx-5`}>
          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange, onBlur, ref }, fieldState: { error, isTouched } }) => (
              <TextField
                ref={ref}
                label="Your name"
                leftIcon={<ProfileIcon />}
                maxLength={10}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                helperText={(isTouched || isSubmitted) && error?.message}
                helperTextColor={Color.Error.SzMain}
                error={(isTouched || isSubmitted) && error !== undefined}
                returnKeyType={'next'}
                onSubmitEditing={() => setFocus('username')}
              />
            )}
          />
          <Controller
            control={control}
            name="username"
            render={({ field: { value, onChange, onBlur, ref }, fieldState: { error, isTouched } }) => (
              <TextField
                ref={ref}
                label="Your email"
                leftIcon={<MailIcon />}
                maxLength={50}
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
          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange, onBlur, ref }, fieldState: { error, isTouched } }) => (
              <PasswordField
                ref={ref}
                label="Your password"
                leftIcon={<AccountLockIcon />}
                maxLength={20}
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
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { value, onChange, onBlur, ref }, fieldState: { error, isTouched } }) => (
              <PasswordField
                ref={ref}
                label="Please confirm your password"
                leftIcon={<AccountLockIcon />}
                maxLength={20}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                helperText={(isTouched || isSubmitted) && error?.message}
                helperTextColor={Color.Error.SzMain}
                error={(isTouched || isSubmitted) && error !== undefined}
                returnKeyType={'next'}
                onSubmitEditing={() => setFocus('promoCode')}
              />
            )}
          />
          <Controller
            control={control}
            name="promoCode"
            render={({ field: { value, onChange, onBlur, ref }, fieldState: { error, isTouched } }) => (
              <TextField
                ref={ref}
                label={
                  <Text variant={TextVariant.Body2SemiBold} color={Color.Neutral.Sz200} textAlign={TextAlignment.Auto}>
                    Your promotion code
                    <Text variant={TextVariant.Body2Italic} color={Color.Neutral.Sz200} textAlign={TextAlignment.Auto}>
                      {` (If Applicable)`}
                    </Text>
                  </Text>
                }
                leftIcon={<SecurityIcon />}
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
        <View style={tw`items-center mt-18 mb-5 mx-5`}>
          <View style={tw`mb-6`}>
            <Button
              onPress={handleSubmit(onSignUpFormValid, onSignUpFormInvalid)}
              title={'REGISTER'}
              loading={loading}
            />
          </View>
          <Text variant={TextVariant.Labels}>
            {'Already have an account? '}
            <Link
              underline
              text="Sign in"
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
