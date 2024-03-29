import * as yup from 'yup';

import { ValidMobileNumberRegex } from '@sz/constants';

export const contactUsFormErrorMessages = {
  'name:required': 'Please enter Name',
  'name:min': 'Username must be at least 2 letters long',
  'name:max': 'Username must not be 256 letters long',

  'username:required': 'Please enter Email ID',
  'username:invalid': 'Invalid Email',
  'username:max': 'Email must not be 256 letters long',

  'mobileNumber:required': 'Please enter phone number',
  'mobileNumber:matches': 'Invalid phone number',

  'message:required': 'Please enter your Message',
  'message:max': 'Maximum character limit is 200',
};

export const contactUsValidationSchema = yup
  .object({
    name: yup
      .string()
      .trim()
      .required(contactUsFormErrorMessages['name:required'])
      .min(2, contactUsFormErrorMessages['name:min'])
      .max(256, contactUsFormErrorMessages['name:max']),
    username: yup
      .string()
      .required(contactUsFormErrorMessages['username:required'])
      .email(contactUsFormErrorMessages['username:invalid'])
      .max(256, contactUsFormErrorMessages['username:max']),
    mobileNumber: yup
      .string()
      .required(contactUsFormErrorMessages['mobileNumber:required'])
      .matches(ValidMobileNumberRegex, contactUsFormErrorMessages['mobileNumber:matches']),
    message: yup
      .string()
      .required(contactUsFormErrorMessages['message:required'])
      .max(200, contactUsFormErrorMessages['message:max']),
  })
  .required();
