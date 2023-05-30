import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { ContactUsFormValues } from 'src/models/info/contactUs.interface';

import { Button, MailIcon, MobileNumberField, ProfileIcon, Text, TextArea, TextField } from '@sz/components';
import { tw } from '@sz/config';
import { Color, DEFAULT_TEXTFIELD_MAX_LENGTH, TextAlignment, TextVariant } from '@sz/constants';
import { useDispatch, useSelector } from '@sz/stores';
import { contactUsValidationSchema, formatMobileNumber } from '@sz/utils';

import { BaseInfoScreen } from '../components';

export function ContactUsScreen() {
  const {
    control,
    handleSubmit,
    setFocus,
    formState: { isSubmitted },
    setValue,
  } = useForm<ContactUsFormValues>({ mode: 'onChange', resolver: yupResolver(contactUsValidationSchema) });
  const userData = useSelector(state => state.userStore.userData);
  const loading = useSelector(state => state.loading.effects.userStore.postContactUsMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    async function setUserData() {
      setValue('name', userData?.name ?? '');
      setValue('username', userData?.username ?? '');
    }
    (async () => {
      await setUserData();
    })();
  }, [userData]);

  const onContactFormValid: SubmitHandler<ContactUsFormValues> = async formInput => {
    const formatedMobileNumber = formatMobileNumber(formInput.mobileNumber);
    await dispatch.userStore.postContactUsMessage({ message: formInput.message, phoneNumber: formatedMobileNumber });
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
              render={({ field: { value, onChange, onBlur, ref }, fieldState: { error, isTouched } }) => (
                <TextField
                  ref={ref}
                  label="Your name"
                  editable={false}
                  leftIcon={<ProfileIcon />}
                  maxLength={DEFAULT_TEXTFIELD_MAX_LENGTH}
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
                  editable={false}
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
          <Button onPress={handleSubmit(onContactFormValid, onContactFromInvalid)} title={'submit'} loading={loading} />
        </View>
      </View>
    </BaseInfoScreen>
  );
}
