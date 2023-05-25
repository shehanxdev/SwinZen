import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
//import { useSelector } from 'react-redux';
import { ContactUsFormValues } from 'src/models/info/contactUs.interface';

import { Button, MailIcon, MobileNumberField, ProfileIcon, Text, TextArea, TextField } from '@sz/components';
import { tw } from '@sz/config';
import { Color, DEFAULT_TEXTFIELD_MAX_LENGTH, TextAlignment, TextVariant } from '@sz/constants';
import { ContactUsService } from '@sz/services';
import { contactUsValidationSchema } from '@sz/utils';

import { BaseInfoScreen } from '../components';

export function ContactUsScreen() {
  const {
    control,
    handleSubmit,
    setFocus,
    formState: { isSubmitted },
  } = useForm<ContactUsFormValues>({ mode: 'onChange', resolver: yupResolver(contactUsValidationSchema) });
  // const accessToken = useSelector(state => state.userStore.accessToken);

  // const userId = JTWDecodeService.decodeToken(accessToken).sub;

  const onContactFormValid: SubmitHandler<ContactUsFormValues> = async formInput => {
    const formatedMobileNumber =
      formInput.mobileNumber.slice(3, 6) +
      '-' +
      formInput.mobileNumber.slice(7, 10) +
      '-' +
      formInput.mobileNumber.slice(11, 15);
    console.log(formatedMobileNumber);
    const result = await ContactUsService.postMessage('userId', {
      message: formInput.message,
      phoneNumber: formatedMobileNumber,
    });
    console.log(result);
  };

  const onContactFromInvalid: SubmitErrorHandler<ContactUsFormValues> = () => {};

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
          <View style={tw`mb-2.5`}>
            <Controller
              control={control}
              name="name"
              render={({ field: { value = 'John Doe', onChange, onBlur, ref }, fieldState: { error, isTouched } }) => (
                <TextField
                  ref={ref}
                  label="Your name"
                  //NOTE Disabled icon and test color has a low contrast with the background
                  leftIcon={<ProfileIcon />}
                  maxLength={DEFAULT_TEXTFIELD_MAX_LENGTH}
                  //TODO:: change
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
          </View>
          <View style={tw`mb-2.5`}>
            <Controller
              control={control}
              name="username"
              render={({ field: { value, onChange, onBlur, ref }, fieldState: { error, isTouched } }) => (
                <TextField
                  ref={ref}
                  label="Your email"
                  leftIcon={<MailIcon />}
                  maxLength={DEFAULT_TEXTFIELD_MAX_LENGTH}
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
          </View>
          <View style={tw`mb-2.5`}>
            <Controller
              control={control}
              name="mobileNumber"
              render={({ field: { value, onChange, onBlur, ref }, fieldState: { error, isTouched } }) => (
                <MobileNumberField
                  ref={ref}
                  label="Phone number(Optional)"
                  maxLength={15}
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
          </View>
          <View style={tw`mb-2.5`}>
            <Controller
              control={control}
              name="message"
              render={({ field: { value, onChange, onBlur, ref }, fieldState: { error, isTouched } }) => (
                <TextArea
                  ref={ref}
                  label="Message"
                  maxLength={200}
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
        </View>
        <View style={tw`mb-4`}>
          <Button
            onPress={handleSubmit(onContactFormValid, onContactFromInvalid)} //todo input proper method to handleSubmit
            title={'submit'}
            // todo change false to a variable
            loading={false}
          />
        </View>
      </View>
    </BaseInfoScreen>
  );
}
