import * as yup from 'yup';

import { ValidMobileNumberRegex } from '@sz/constants';

export const contactUsFormErrorMessages = {
  'phoneNumber:matches': 'Invalid phone number',

  'message:required': 'Please enter your Message',
  'message:max': 'Maximum character limit is 200',
};

export const contactUsValidationSchema = yup
  .object({
    phoneNumber: yup.string().matches(ValidMobileNumberRegex, contactUsFormErrorMessages['phoneNumber:matches']),
    message: yup
      .string()
      .required(contactUsFormErrorMessages['message:required'])
      .max(200, contactUsFormErrorMessages['message:max']),
  })
  .required();
