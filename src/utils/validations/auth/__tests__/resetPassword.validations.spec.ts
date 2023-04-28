import { ValidationError } from 'yup';

import { resetPasswordErrorMessages, resetPasswordValidationSchema } from '@sz/utils';

describe('resetPasswordValidationSchema', () => {
  it('should return an error message for a missing password', async () => {
    const input = { password: '', confirmPassword: 'password' };
    const error = await resetPasswordValidationSchema.validateAt('password', input).catch(err => err);
    expect(error).toBeInstanceOf(ValidationError);
    expect(error.message).toBe(resetPasswordErrorMessages['password:required']);
  });

  it('should return an error message for a password that is too short', async () => {
    const input = { password: 'pass', confirmPassword: 'pass' };
    const error = await resetPasswordValidationSchema.validateAt('password', input).catch(err => err);
    expect(error).toBeInstanceOf(ValidationError);
    expect(error.message).toBe(resetPasswordErrorMessages['password:min']);
  });

  it('should return an error message for a password that is too long', async () => {
    const input = {
      password: 'verylongpassword1234567890',
      confirmPassword: 'verylongpassword1234567890',
    };
    const error = await resetPasswordValidationSchema.validateAt('password', input).catch(err => err);
    expect(error).toBeInstanceOf(ValidationError);
    expect(error.message).toBe(resetPasswordErrorMessages['password:max']);
  });

  it('should return an error message for an invalid password format', async () => {
    const input = { password: 'password', confirmPassword: 'password' };
    const error = await resetPasswordValidationSchema.validateAt('password', input).catch(err => err);
    expect(error).toBeInstanceOf(ValidationError);
    expect(error.message).toBe(resetPasswordErrorMessages['password:match']);
  });

  it('should throw an error if confirmPassword is empty', async () => {
    const input = { confirmPassword: undefined };
    let validationResult;

    try {
      await resetPasswordValidationSchema.validateAt('confirmPassword', input);
    } catch (error) {
      validationResult = error;
    }

    expect(validationResult.errors[0]).toBe(resetPasswordErrorMessages['confirmPassword:required']);
  });

  it('should return an error message for a password confirmation that does not match the password', async () => {
    const input = { password: 'password', confirmPassword: 'differentpassword' };
    const error = await resetPasswordValidationSchema.validateAt('confirmPassword', input).catch(err => err);
    expect(error).toBeInstanceOf(ValidationError);
    expect(error.message).toBe(resetPasswordErrorMessages['confirmPassword:match']);
  });

  it('should not return an error for valid input', async () => {
    const input = { password: 'Password123!', confirmPassword: 'Password123!' };
    await resetPasswordValidationSchema.validate(input);
  });
});
