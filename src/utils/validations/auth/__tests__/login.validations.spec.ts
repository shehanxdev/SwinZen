import { ValidationError } from 'yup';

import { loginErrorMessages, loginValidationSchema } from '../login.validations';

describe('loginValidationSchema', () => {
  it('should pass the test for valid email input', () => {
    const validInput = 'valid@gmail.com';
    expect(loginValidationSchema.validateAt('username', { username: validInput }));
  });
  it('should throw an error when email is not provided', async () => {
    try {
      await loginValidationSchema.validateAt('username', {});
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.errors[0]).toBe(loginErrorMessages['username:required']);
    }
  });

  it(`should give an error if the email is invalid`, async () => {
    const invalidEmails = [
      'Abc.example.com',
      'A@b@c@example.com',
      'a"b(c)d,e:f;gi[jk]l@example.com',
      'just"not"right@example.com',
      'this is"notallowed@example.com',
      'this still"notallowed@example.com',
      'john..doe@example.com',
      'example@localhost',
      'john.doe@example..com',
      ' john.doe@example.com',
      'john.doe@example.com ',
    ];
    let validationResult;
    for (const email of invalidEmails) {
      try {
        await loginValidationSchema.validateAt('username', { username: email });
      } catch (error) {
        validationResult = error;
      }

      expect(validationResult.errors[0]).toBe(loginErrorMessages['username:invalid']);
    }
  });

  it('should throw an error when email is too long', async () => {
    try {
      await loginValidationSchema.validateAt('username', {
        username: `${'a'.repeat(56)}@gmail.com`,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.errors[0]).toBe(loginErrorMessages['username:max']);
    }
  });

  it('should pass the test for valid password', async () => {
    const validPassword = 'Password!1';
    await expect(loginValidationSchema.validateAt('password', { password: validPassword }));
  });

  it('should throw an error when password is not provided', async () => {
    try {
      await loginValidationSchema.validateAt('password', {});
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.errors[0]).toBe(loginErrorMessages['password:required']);
    }
  });

  it('should throw an error when password is too short', async () => {
    try {
      await loginValidationSchema.validateAt('password', { password: 'passwor' });
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.errors[0]).toBe(loginErrorMessages['password:min']);
    }
  });

  it('should throw an error when password is too long', async () => {
    try {
      await loginValidationSchema.validateAt('password', {
        password: 'a'.repeat(56),
      });
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.errors[0]).toBe(loginErrorMessages['password:max']);
    }
  });

  it('should throw an error when password does not meet complexity requirements', async () => {
    try {
      await loginValidationSchema.validateAt('password', { password: 'password' });
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.errors[0]).toBe(loginErrorMessages['password:match']);
    }
  });
});
