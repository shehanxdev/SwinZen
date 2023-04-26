import * as yup from 'yup';

import { ValidMobileNumberRegex } from '@sz/constants';

export const contactUsFormErrorMessages = {
  'name:required': 'Please enter Name',
  'name:min': 'Username must be at least 2 letters long',
  'name:max': 'Username must not be 10 letters long',

  'username:required': 'Please enter Email ID',
  'username:email': 'Invalid Email',
  'username:max': 'Email must not be 50 letters long',

  'mobileNumber:matches': 'Mobile number must be a valid US mobile number (+1 555 555 1234)',
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
    mobileNumber: yup.string().matches(ValidMobileNumberRegex, contactUsFormErrorMessages['mobileNumber:matches']), //todo mobile number field only accepts us mobile numbers so make sure if this is okay.
  })
  .required();
