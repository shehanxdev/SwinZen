import * as yup from 'yup';

export const changePasswordErrorMessages = {
  'password:min': 'Please enter at least 8 characters',
  'password:max': 'Only 256 characters are allowed for the Password',

  'currentPassword:required': 'Please enter your Current password',
  'newPassword:required': 'Please enter New password',
  'confirmNewPassword:required': 'Please enter Password confirmation',

  'confirmPassword:match': 'Your passwords do not match',
};

export const changePasswordValidationSchema = yup
  .object({
    currentPassword: yup.string().required(changePasswordErrorMessages['currentPassword:required']),
    newPassword: yup
      .string()
      .required(changePasswordErrorMessages['newPassword:required'])
      .min(8, changePasswordErrorMessages['password:min'])
      .max(256, changePasswordErrorMessages['password:max']),
    confirmNewPassword: yup
      .string()
      .required(changePasswordErrorMessages['confirmNewPassword:required'])
      .min(8, changePasswordErrorMessages['password:min'])
      .max(256, changePasswordErrorMessages['password:max'])
      .oneOf([yup.ref('newPassword')], changePasswordErrorMessages['confirmPassword:match']),
  })
  .required();
