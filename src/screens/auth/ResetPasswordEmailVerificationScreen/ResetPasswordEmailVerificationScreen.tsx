import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { Button, Link, Text } from '@sz/components';
import { tw } from '@sz/config';
import { Color, Route, TextVariant } from '@sz/constants';
import { OtpVerficationValue } from '@sz/models';
import { NavigationService } from '@sz/services';
import { resetOtpValidationSchema } from '@sz/utils';

import { OTPInput } from '../components';
import { BaseAuthScreen } from '../components/BaseAuthScreen';

export function ResetPasswordEmailVerificationScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<OtpVerficationValue>({ mode: 'onChange', resolver: yupResolver(resetOtpValidationSchema) });

  const onSignUpFormInvalid: SubmitErrorHandler<OtpVerficationValue> = () => {
    console.log(errors);
    //TODO:: handle error
  };

  const onSignUpFormValid: SubmitHandler<OtpVerficationValue> = () => {
    console.log('success');
  };

  return (
    <BaseAuthScreen>
      <View style={tw`flex-1 justify-between`} testID="ResetPasswordEmailVerificationScreenContainerTestID">
        <View style={tw`mx-5 flex-1 justify-center content-center`}>
          <View style={tw`items-center`}>
            <View style={tw`mt-3 mb-5`}>
              <Text variant={TextVariant.SubTitle2SemiBold}>Email verification</Text>
            </View>
            <View style={tw`mb-13`}>
              <Text variant={TextVariant.Body2Regular}>
                {/*TODO::remove hardcoded values when integrating APIs*/}
                Enter the code received in your email address s**t**z@gmail.com
              </Text>
            </View>
          </View>
          <Controller
            control={control}
            name="otp"
            render={({ field: { value, onChange }, fieldState: { error, isTouched } }) => (
              <OTPInput
                value={value}
                onChangeValue={onChange}
                onSubmitEditing={handleSubmit(onSignUpFormValid, onSignUpFormInvalid)}
                helperText={(isTouched || isSubmitted) && error?.message}
                helperTextColor={Color.Error.SzMain}
                error={(isTouched || isSubmitted) && error !== undefined}
              />
            )}
          />
        </View>
        <View style={tw`items-center mb-5 mx-5`}>
          <View style={tw`mb-3`}>
            <Button
              onPress={() => {
                NavigationService.navigate(Route.ResetPassword);
              }}
              title={'Verify'}
            />
          </View>
          <Link text={'Resend the code'} />
        </View>
      </View>
    </BaseAuthScreen>
  );
}
