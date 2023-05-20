import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { Button, Link, SwingZenLogoIcon, Text } from '@sz/components';
import { tw } from '@sz/config';
import { OtpType, Route, TextVariant } from '@sz/constants';
import { OtpVerficationValue } from '@sz/models';
import { NavigationService, ToastService } from '@sz/services';
import { useDispatch, useSelector } from '@sz/stores';
import { getMaskedMail, otpValidationSchema } from '@sz/utils';

import { BaseAuthScreen, OTPInput } from '../components';
import { ResendOtpWithTimer } from '../components/ResendOtpWithTimer';

export function RegisterEmailVerificationScreen({ route }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<OtpVerficationValue>({ mode: 'onChange', resolver: yupResolver(otpValidationSchema) });

  const username = route.params.params;

  const loading = useSelector(state => state.loading.effects.userStore.emailVerification);

  const dispatch = useDispatch();

  const onRegisterEmailFormInvalid: SubmitErrorHandler<OtpVerficationValue> = () => {
    console.log(errors);
    //TODO:: handle error
  };

  const onRegisterEmailFormValid: SubmitHandler<OtpVerficationValue> = () => {
    console.log('success');
  };

  const onResend = async () => {
    try {
      await dispatch.userStore.resendOtp({ username: username });
      ToastService.success({ message: 'Success!', description: 'OTP resent successfully.' });
    } catch (error: any) {
      ToastService.error({ message: 'Failed!', description: error.data.message });
    }
  };

  const onVerify = async () => {
    const otpData = {
      username: username,
      otpType: OtpType.VERIFICATION,
      otp: getValues('otp'),
    };
    try {
      await dispatch.userStore.emailVerification(otpData);
      NavigationService.navigate(Route.Login);
    } catch (error: any) {
      ToastService.error({ message: 'Failed!', description: error.data.message });
    }
  };

  return (
    <BaseAuthScreen>
      <View style={tw`flex-1 justify-between`} testID="RegisterEmailVerificationScreenContainerTestID">
        <View style={tw`mt-8.75 mx-4`}>
          <View style={tw`items-center`}>
            <SwingZenLogoIcon />
          </View>
          <View style={tw`items-center`}>
            <View style={tw`mt-6 mb-2`}>
              <Text variant={TextVariant.SubTitle2SemiBold}>Email verification</Text>
            </View>
            <View style={tw`mb-10`}>
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
                onSubmitEditing={handleSubmit(onRegisterEmailFormValid, onRegisterEmailFormInvalid)}
              />
            )}
          />
          <View style={tw`items-center mt-6`}>
            <ResendOtpWithTimer onResend={onResend} />
          </View>
        </View>
        <View style={tw`items-center mb-5 items-center mx-5 mt-15`}>
          <View style={tw`mb-6`}>
            <Button onPress={onVerify} title="verify" loading={loading} />
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
