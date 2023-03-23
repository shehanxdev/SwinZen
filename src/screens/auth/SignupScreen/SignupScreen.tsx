/* eslint-disable import/no-extraneous-dependencies */
import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, View } from 'react-native';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';

import { IMAGES } from '@sz/assets';
import {
  AccountLockIcon,
  Button,
  Link,
  MailIcon,
  PasswordRevealIcon,
  ProfileIcon,
  SecurityIcon,
  Text,
  TextField,
} from '@sz/components';
import { tw } from '@sz/config';
import { Color, Route, TextVariant } from '@sz/constants';
import { NavigationService } from '@sz/services';
import { schema } from '@sz/utils';

import { GradientBackground } from '../components/GradientBackground';

export function SignupScreen() {
  const [securePw, setSecurePw] = useState(true);
  const [secureConfirmPw, setSecureConfirmPw] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange', resolver: yupResolver(schema) });

  const onRegister = () => {
    console.log('User Register Pressed'); // TODO:: integrate APIs into user interface
  };

  return (
    <GradientBackground testID="SignupScreenTestID">
      <View style={tw`flex-1 justify-between`}>
        <View style={tw`flex mt-20 mx-5`}>
          <View style={tw`items-center`}>
            {/*TODO:: remove this images and replace with SVG later*/}
            <Image source={IMAGES.footerLogo} />
          </View>
          <View style={tw`items-center`}>
            <View style={tw`mt-3 mb-10`}>
              <Text variant={TextVariant.SubTitle2SemiBold}>Register with us</Text>
            </View>
          </View>
        </View>
        <KeyboardAvoidingScrollView style={tw`flex-1 mx-5`}>
          <Controller
            control={control}
            name="username"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField
                label="Your Name"
                leftIcon={<ProfileIcon />}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                helperText={errors.username?.message ? errors.username.message.toString() : ''}
                helperTextColor={Color.Error.SzMain}
                error={!_.isEmpty(errors.username)}
              />
            )}
          />
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
          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField
                secureTextEntry={securePw}
                onRightIconPress={() => setSecurePw(!securePw)}
                label="Your Password"
                leftIcon={<AccountLockIcon />}
                rightIcon={<PasswordRevealIcon />}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                helperText={errors.password?.message ? errors.password.message.toString() : ''}
                helperTextColor={Color.Error.SzMain}
                error={!_.isEmpty(errors.password)}
              />
            )}
          />
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField
                secureTextEntry={secureConfirmPw}
                onRightIconPress={() => setSecureConfirmPw(!secureConfirmPw)}
                label="Please Confirm Your Password"
                leftIcon={<AccountLockIcon />}
                rightIcon={<PasswordRevealIcon />}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                helperText={errors.confirmPassword?.message ? errors.confirmPassword.message.toString() : ''}
                helperTextColor={Color.Error.SzMain}
                error={!_.isEmpty(errors.confirmPassword)}
              />
            )}
          />
          <Controller
            control={control}
            name="promoCode"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField
                label="Your Promotion Code"
                leftIcon={<SecurityIcon />}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                helperText={errors.promoCode?.message ? errors.promoCode.message.toString() : ''}
                helperTextColor={Color.Error.SzMain}
                error={!_.isEmpty(errors.promoCode)}
              />
            )}
          />
        </KeyboardAvoidingScrollView>
        <View style={tw`items-center mt-10 mb-5 mx-5`}>
          <View style={tw`mb-2`}>
            <Button onPress={() => handleSubmit(onRegister)} title={'Register'} />
          </View>
          <Text variant={TextVariant.Body2Regular}>
            Already Have An Account?
            <Link
              text=" Sign in"
              onPress={() => {
                NavigationService.navigate(Route.Login);
              }}
            />
          </Text>
        </View>
      </View>
    </GradientBackground>
  );
}
