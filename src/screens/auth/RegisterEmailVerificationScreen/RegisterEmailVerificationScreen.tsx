import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { Button, Link, SwingZenLogoIcon, Text } from '@sz/components';
import { tw } from '@sz/config';
import { Route, TextVariant } from '@sz/constants';
import { OtpVerficationValue } from '@sz/models';
import { NavigationService } from '@sz/services';
import { useDispatch, useSelector } from '@sz/stores';
import { getMaskedMail, registerOtpValidationSchema } from '@sz/utils';

import { BaseAuthScreen, OTPInput } from '../components';

export function RegisterEmailVerificationScreen({ route }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<OtpVerficationValue>({ mode: 'onChange', resolver: yupResolver(registerOtpValidationSchema) });

  const username = route.params.params;

  const loading = useSelector(state => state.loading.effects.userStore.registerMailVerification);

  const dispatch = useDispatch();

  const onSignUpFormInvalid: SubmitErrorHandler<OtpVerficationValue> = () => {
    console.log(errors);
    //TODO:: handle error
  };

  const onSignUpFormValid: SubmitHandler<OtpVerficationValue> = () => {
    console.log('success');
  };

  const onResend = () => {
    try {
      dispatch.userStore.resendOtp({ username: username });
    } catch (error: any) {
      //TODO:: handle error
      console.log('error', error);
    }
  };

  const onVerify = async () => {
    const otpData = {
      username: username,
      otpType: 'string',
      otp: getValues('otp'),
    };
    try {
      await dispatch.userStore.registerMailVerification(otpData);
      NavigationService.navigate(Route.Login);
    } catch (error: any) {
      //TODO:: handle error
      console.log('error', error);
    }
  };

  return (
    <BaseAuthScreen>
      <View style={tw`flex-1 justify-between`} testID="RegisterEmailVerificationScreenContainerTestID">
        <View style={tw`mt-20 mx-5`}>
          <View style={tw`items-center`}>
            <SwingZenLogoIcon />
          </View>
          <View style={tw`items-center`}>
            <View style={tw`mt-3 mb-22.5`}>
              <Text variant={TextVariant.SubTitle2SemiBold}>Email verification</Text>
            </View>
            <View style={tw`mb-6`}>
              <Text variant={TextVariant.Body2Regular}>
                {`Enter the code received in your email address ${getMaskedMail(username)}`}
              </Text>
            </View>
          </View>
          <Controller
            control={control}
            name="otp"
            render={({ field: { value, onChange } }) => (
              <OTPInput
                value={value}
                onChangeValue={onChange}
                onSubmitEditing={handleSubmit(onSignUpFormValid, onSignUpFormInvalid)}
              />
            )}
          />
          <View style={tw`items-end mt-2`}>
            <Link text="Resend the code" onPress={onResend} />
          </View>
        </View>
        <View style={tw`items-center mb-5 items-center mx-5 mt-15`}>
          <View style={tw`mb-2`}>
            <Button onPress={onVerify} title="Verify" loading={loading} />
          </View>
          <Text variant={TextVariant.Body2Regular}>
            By continuing, you agree to our{' '}
            <Link
              text="Privacy Policy"
              onPress={() => {
                NavigationService.navigate(Route.PrivacyPolicy);
              }}
            />{' '}
            and our{' '}
            <Link
              text="Terms of Use"
              onPress={() => {
                NavigationService.navigate(Route.TermsOfUse);
              }}
            />
          </Text>
        </View>
      </View>
    </BaseAuthScreen>
  );
}
