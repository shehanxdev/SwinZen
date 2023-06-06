import { DEFAULT_TEXTFIELD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '@sz/constants';

import { loginErrorMessages, loginValidationSchema } from '../login.validations';

describe('loginValidationSchema', () => {
  describe('Email', () => {
    it('should pass the test for valid email input', async () => {
      const validInput = 'valid@gmail.com';
      const validationResult = await loginValidationSchema.validateAt('username', { username: validInput });

      expect(validationResult).toStrictEqual(validInput);
    });

    it('should throw an error when email is not provided', async () => {
      const validationResult = await loginValidationSchema.validateAt('username', {}).catch(err => err);

      expect(validationResult.errors[0]).toBe(loginErrorMessages['username:required']);
    });

    it(`should give an error if the email is invalid`, async () => {
      const invalidEmails = [
        'Abc.example.com',
        'A@b@c@example.com',
        'a"b(c)d,e:f;gi[jk]l@example.com',
        'just"not"right@example.com',
        'this is"notallowed@example.com',
        'this still"notallowed@example.com',
        'john.doe@example..com',
        ' john.doe@example.com',
        'john.doe@example.com ',
      ];

      for (const email of invalidEmails) {
        const validationResult = await loginValidationSchema
          .validateAt('username', { username: email })
          .catch(err => err);

        expect(validationResult.errors[0]).toBe(loginErrorMessages['username:invalid']);
      }
    });

    it('should throw an error when email is too long', async () => {
      const validationResult = await loginValidationSchema
        .validateAt('username', {
          username: `${'a'.repeat(DEFAULT_TEXTFIELD_MAX_LENGTH + 1)}@gmail.com`,
        })
        .catch(err => err);

      expect(validationResult.errors[0]).toBe(loginErrorMessages['username:max']);
    });
  });

  describe('Password', () => {
    it('should pass the test for valid password', async () => {
      const validPassword = 'Password!1';
      const validationResult = await loginValidationSchema
        .validateAt('password', { password: validPassword })
        .catch(err => err);

      expect(validationResult).toStrictEqual(validPassword);
    });

    it('should throw an error when password is not provided', async () => {
      const validationResult = await loginValidationSchema.validateAt('password', {}).catch(err => err);

      expect(validationResult.errors[0]).toBe(loginErrorMessages['password:required']);
    });

    it('should throw an error when password is too short', async () => {
      const validationResult = await loginValidationSchema
        .validateAt('password', { password: 'a'.repeat(PASSWORD_MIN_LENGTH - 1) })
        .catch(err => err);

      expect(validationResult.errors[0]).toBe(loginErrorMessages['password:min']);
    });

    it('should throw an error when password is too long', async () => {
      const validationResult = await loginValidationSchema
        .validateAt('password', {
          password: 'a'.repeat(DEFAULT_TEXTFIELD_MAX_LENGTH + 1),
        })
        .catch(err => err);

      expect(validationResult.errors[0]).toBe(loginErrorMessages['password:max']);
    });
  });
});
