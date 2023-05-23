import { ValidationError } from 'yup';

import { DEFAULT_TEXTFIELD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '@sz/constants';
import { ChangePasswordFormValues } from '@sz/models';
import { changePasswordErrorMessages, changePasswordValidationSchema } from '@sz/utils';

describe('changePasswordValidationSchema', () => {
  it('should return an error message for a missing current password', async () => {
    const input: ChangePasswordFormValues = {
      currentPassword: '',
      newPassword: 'newpassword',
      confirmNewPassword: 'newpassword',
    };
    const error = await changePasswordValidationSchema.validateAt('currentPassword', input).catch(err => err);

    expect(error).toBeInstanceOf(ValidationError);
    expect(error.message).toBe(changePasswordErrorMessages['currentPassword:required']);
  });

  it('should return an error message for a current password that is too short', async () => {
    const input: ChangePasswordFormValues = {
      currentPassword: 'currentPassword',
      newPassword: 'a'.repeat(PASSWORD_MIN_LENGTH - 1),
      confirmNewPassword: 'a'.repeat(PASSWORD_MIN_LENGTH - 1),
    };
    const error = await changePasswordValidationSchema.validateAt('newPassword', input).catch(err => err);

    expect(error).toBeInstanceOf(ValidationError);
    expect(error.message).toBe(changePasswordErrorMessages['password:min']);
  });

  it('should return an error message for a new password that is too long', async () => {
    const input: ChangePasswordFormValues = {
      currentPassword: '',
      newPassword: 'v'.repeat(DEFAULT_TEXTFIELD_MAX_LENGTH + 1),
      confirmNewPassword: 'v'.repeat(DEFAULT_TEXTFIELD_MAX_LENGTH + 1),
    };
    const error = await changePasswordValidationSchema.validateAt('newPassword', input).catch(err => err);

    expect(error).toBeInstanceOf(ValidationError);
    expect(error.message).toBe(changePasswordErrorMessages['password:max']);
  });

  it('should throw an error if confirmPassword is not matching with new password', async () => {
    const input: ChangePasswordFormValues = {
      currentPassword: 'currentPassword',
      newPassword: 'newPassword1',
      confirmNewPassword: 'newPassword2',
    };
    const error = await changePasswordValidationSchema.validateAt('confirmNewPassword', input).catch(err => err);

    expect(error).toBeInstanceOf(ValidationError);
    expect(error.message).toBe(changePasswordErrorMessages['confirmPassword:match']);
  });

  it('should not return an error for valid input', async () => {
    const input: ChangePasswordFormValues = {
      currentPassword: 'currentPassword',
      newPassword: 'newpassword',
      confirmNewPassword: 'newpassword',
    };
    const validationResult = await changePasswordValidationSchema.validate(input);

    expect(validationResult).toBe(input);
  });
});
