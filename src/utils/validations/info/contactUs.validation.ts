import * as yup from 'yup';

import { ValidMobileNumberRegex } from '@sz/constants';

export const contactUsFormErrorMessages = {
  'name:required': 'Please enter Name',
  'name:min': 'Username must be at least 2 letters long',
  'name:max': 'Username must not be 10 letters long',

  'username:required': 'Please enter Email ID',
  'username:email': 'Invalid Email',
  'username:max': 'Email must not be 50 letters long',

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
      .max(10, contactUsFormErrorMessages['name:max']),
    username: yup
      .string()
      .required(contactUsFormErrorMessages['username:required'])
      .email(contactUsFormErrorMessages['username:email'])
      .max(50, contactUsFormErrorMessages['username:max']),
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
