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

  //TODO add test script when confirm password field is empty
  // it('should return an error message for a missing password confirmation', async () => {
  //   const input = { confirmPassword: '' };
  //   const error = await resetPasswordValidationSchema.validateAt('confirmPassword', input).catch(err => err);
  //   expect(error).toBeInstanceOf(ValidationError);
  //   expect(error.message).toBe(resetPasswordErrorMessages['confirmPassword:required']);
  // });

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
