import { ValidationError } from 'yup';

import { resetPasswordErrorMessages, resetPasswordValidationSchema } from '@sz/utils';

describe('resetPasswordValidationSchema', () => {
  it('should return an error message for a missing password', async () => {
    const input = { password: '', confirmPassword: 'password' };
    const validationResult = await resetPasswordValidationSchema.validateAt('password', input).catch(err => err);

    expect(validationResult).toBeInstanceOf(ValidationError);
    expect(validationResult.errors[0]).toBe(resetPasswordErrorMessages['password:required']);
  });

  it('should return an error message for a password that is too short', async () => {
    const input = { password: 'pass', confirmPassword: 'pass' };
    const validationResult = await resetPasswordValidationSchema.validateAt('password', input).catch(err => err);

    expect(validationResult).toBeInstanceOf(ValidationError);
    expect(validationResult.errors[0]).toBe(resetPasswordErrorMessages['password:min']);
  });

  it('should return an error message for a password that is too long', async () => {
    const input = {
      password: `${'abcd'.repeat(65)}`,
      confirmPassword: `${'abcd'.repeat(65)}`,
    };
    const validationResult = await resetPasswordValidationSchema.validateAt('password', input).catch(err => err);

    expect(validationResult).toBeInstanceOf(ValidationError);
    expect(validationResult.message).toBe(resetPasswordErrorMessages['password:max']);
  });

  it('should throw an error if confirmPassword is empty', async () => {
    const input = { confirmPassword: undefined };
    const validationResult = await resetPasswordValidationSchema.validateAt('confirmPassword', input).catch(err => err);

    expect(validationResult.errors[0]).toBe(resetPasswordErrorMessages['confirmPassword:required']);
  });

  it('should return an error message for a password confirmation that does not match the password', async () => {
    const input = { password: 'password', confirmPassword: 'differentpassword' };
    const validationResult = await resetPasswordValidationSchema.validateAt('confirmPassword', input).catch(err => err);

    expect(validationResult).toBeInstanceOf(ValidationError);
    expect(validationResult.errors[0]).toBe(resetPasswordErrorMessages['confirmPassword:match']);
  });

  it('should not return an error for valid input', async () => {
    const input = { password: 'Password123!', confirmPassword: 'Password123!' };
    const validationResult = await resetPasswordValidationSchema.validate(input).catch(err => err);

    expect(validationResult).toStrictEqual(input);
  });
});
