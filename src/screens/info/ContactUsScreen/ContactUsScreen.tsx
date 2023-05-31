import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { Button, MailIcon, MobileNumberField, ProfileIcon, Text, TextArea, TextField } from '@sz/components';
import { tw } from '@sz/config';
import { Color, Route, TextAlignment, TextVariant } from '@sz/constants';
import { ContactUsFormValues } from '@sz/models';
import { NavigationService, ToastService } from '@sz/services';
import { useDispatch, useSelector } from '@sz/stores';
import { contactUsValidationSchema } from '@sz/utils';

import { BaseInfoScreen } from '../components';

export function ContactUsScreen() {
  const {
    control,
    handleSubmit,
    setFocus,
    formState: { isSubmitted, errors },
  } = useForm<ContactUsFormValues>({ mode: 'onChange', resolver: yupResolver(contactUsValidationSchema) });
  const userData = useSelector(state => state.userStore.userData);
  const loading = useSelector(state => state.loading.effects.userStore.postContactUsMessage);
  const dispatch = useDispatch();

  const onContactFormValid: SubmitHandler<ContactUsFormValues> = async formInput => {
    try {
      await dispatch.userStore.postContactUsMessage({
        message: formInput.message,
        phoneNumber: formInput.phoneNumber ? formInput.phoneNumber : '',
      });
      //TODO:: User requirement specifies that the message should have the option for a clickable button which says OK, but currently we do not have any option like that. Replace the toast service once such an option is available
      ToastService.success({
        message: 'Success!',
        description: 'Thank you for contacting SwingZen support. We will get back to you as soon as possible.',
      });
      NavigationService.navigate(Route.HomeTab);
    } catch (error) {
      ToastService.error({ message: 'Failed!', description: error.data.message });
    }
  };

  const onContactFromInvalid: SubmitErrorHandler<ContactUsFormValues> = () => {
    console.error(errors);
    //TODO:: handle errors
  };

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
            <TextField
              label="Your name"
              editable={false}
              value={userData?.name}
              leftIcon={<ProfileIcon />}
              returnKeyType={'next'}
            />
          </View>
          <View style={tw`mb-2.5`}>
            <TextField
              label="Your email"
              editable={false}
              value={userData?.email}
              leftIcon={<MailIcon />}
              returnKeyType={'next'}
            />
          </View>
          <View style={tw`mb-2.5`}>
            <Controller
              control={control}
              name="phoneNumber"
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
