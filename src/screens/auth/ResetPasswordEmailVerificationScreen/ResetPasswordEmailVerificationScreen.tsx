import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { Alert, View } from 'react-native';

import { Button, Link, Text } from '@sz/components';
import { tw } from '@sz/config';
import { OtpType, Route, TextVariant } from '@sz/constants';
import { OtpVerficationValue } from '@sz/models';
import { NavigationService } from '@sz/services';
import { useDispatch, useSelector } from '@sz/stores';
import { getMaskedMail, otpValidationSchema } from '@sz/utils';

import { OTPInput } from '../components';
import { BaseAuthScreen } from '../components/BaseAuthScreen';

export function ResetPasswordEmailVerificationScreen({ route }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<OtpVerficationValue>({ mode: 'onChange', resolver: yupResolver(otpValidationSchema) });

  const email = route.params.params.email;

  const loading = useSelector(state => state.loading.effects.userStore.emailVerification);

  const dispatch = useDispatch();

  const onResetEmailFormInvalid: SubmitErrorHandler<OtpVerficationValue> = () => {
    console.log(errors);
    //TODO:: handle error
  };

  const onResetEmailFormValid: SubmitHandler<OtpVerficationValue> = () => {
    console.log('success');
  };

  const onResend = async () => {
    try {
      await dispatch.userStore.resendOtp({ username: email });
      // TODO:: add proper success alert later
      Alert.alert('Success', 'Otp resent successfullly', [{ text: 'OK', onPress: () => console.log('OK Pressed') }]);
    } catch (error: any) {
      //TODO:: handle error
      console.log('error', error);
    }
  };

  const onVerify = async () => {
    const otpData = {
      username: email,
      otpType: OtpType.FORGOT_PASSWORD,
      otp: getValues('otp'),
    };
    try {
      await dispatch.userStore.emailVerification(otpData);
      NavigationService.navigate(Route.ResetPassword, { email: email });
    } catch (error: any) {
      //TODO:: handle error
      console.log('error', error);
    }
  };

  return (
    <BaseAuthScreen>
      <View style={tw`flex-1`} testID="ResetPasswordEmailVerificationScreenContainerTestID">
        <View style={tw`mx-5 flex-1`}>
          <View style={tw`items-center`}>
            <View style={tw`mt-15 mb-2`}>
              <Text variant={TextVariant.SubTitle2SemiBold}>Email verification</Text>
            </View>
            <View style={tw`mb-10`}>
              <Text variant={TextVariant.Body2Regular}>
                {/*TODO::remove hardcoded values when integrating APIs*/}
                {`Enter the code received in your email address ${getMaskedMail(email)}`}
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
                onSubmitEditing={handleSubmit(onResetEmailFormValid, onResetEmailFormInvalid)}
              />
            )}
          />
          <View style={tw`items-center mt-6`}>
            <Link text="Resend the code" onPress={onResend} />
          </View>
        </View>
        <View style={tw`items-center mb-5 mx-5`}>
          <View style={tw`mb-3`}>
            <Button loading={loading} onPress={onVerify} title={'Verify'} />
          </View>
        </View>
      </View>
    </BaseAuthScreen>
  );
}
