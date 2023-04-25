import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { contactUsFormValues } from 'src/models/info/contactUs.interface';

import { Button, MailIcon, ProfileIcon, Text, TextArea, TextField } from '@sz/components';
import { tw } from '@sz/config';
import { Color, TextAlignment, TextVariant } from '@sz/constants';

import { BaseInfoScreen } from '../components';

export function ContactUsScreen() {
  const {
    control,
    handleSubmit,
    setFocus,
    formState: { isSubmitted },
  } = useForm<contactUsFormValues>({ mode: 'onChange' });

  return (
    <BaseInfoScreen testID="ContactUsScreenTestID">
      <View style={tw`px-4`}>
        <View style={tw` my-8`}>
          <Text textAlign={TextAlignment.Left} variant={TextVariant.Body1Regular}>
            We'd Love to Hear From You. Your feedback is what drives us to build a better service for you. Please
            contact us through the following form
          </Text>
        </View>
        <View style={tw`mb-21`}>
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
                onSubmitEditing={() => {
                  setFocus('username');
                }}
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
                onSubmitEditing={() => {
                  setFocus('mobileNumber');
                }}
                autoCapitalize={'none'}
              />
            )}
          />
          <Controller
            control={control}
            name="mobileNumber"
            render={({ field: { value, onChange, onBlur, ref }, fieldState: { error, isTouched } }) => (
              <TextField
                ref={ref}
                label="Phone number(Optional)"
                leftIcon={<MailIcon />} //todo change the icon
                maxLength={50}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                helperText={(isTouched || isSubmitted) && error?.message}
                helperTextColor={Color.Error.SzMain}
                error={(isTouched || isSubmitted) && error !== undefined}
                returnKeyType={'next'}
                onSubmitEditing={() => {
                  setFocus('message');
                }}
                autoCapitalize={'none'}
              />
            )}
          />
          <Controller
            control={control}
            name="message"
            render={({ field: { value, onChange, onBlur, ref }, fieldState: { error, isTouched } }) => (
              <TextArea
                ref={ref}
                label="Message"
                maxLength={50}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                helperText={(isTouched || isSubmitted) && error?.message}
                helperTextColor={Color.Error.SzMain}
                error={(isTouched || isSubmitted) && error !== undefined}
                returnKeyType={'next'}
                onSubmitEditing={() => {}}
                autoCapitalize={'none'}
              />
            )}
          />
        </View>
        <View style={tw`mb-[63px]`}>
          <Button
            onPress={handleSubmit(() => {})} //todo input proper method to handleSubmit
            title={'SUBMIT'}
            // todo change false to a variable
            loading={false}
          />
        </View>
      </View>
    </BaseInfoScreen>
  );
}
