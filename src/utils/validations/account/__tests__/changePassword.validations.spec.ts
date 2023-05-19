import { ValidationError } from 'yup';

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
      newPassword: 'new',
      confirmNewPassword: 'new',
    };
    const error = await changePasswordValidationSchema.validateAt('newPassword', input).catch(err => err);

    expect(error).toBeInstanceOf(ValidationError);
    expect(error.message).toBe(changePasswordErrorMessages['password:min']);
  });

  it('should return an error message for a new password that is too long', async () => {
    const input: ChangePasswordFormValues = {
      currentPassword: '',
      newPassword: 'v'.repeat(251),
      confirmNewPassword: 'v'.repeat(251),
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
    await changePasswordValidationSchema.validate(input);
  });
});
