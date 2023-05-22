import { DEFAULT_TEXTFIELD_MAX_LENGTH } from '@sz/constants';

import { forgotPasswordErrorMessages, forgotPasswordValidationSchema } from '../forgotPassword.validations';

describe('forgot Password validation schema', () => {
  it('should pass the test for valid email input', async () => {
    const validInput = 'valid@gmail.com';
    const validationResult = await forgotPasswordValidationSchema
      .validateAt('email', { email: validInput })
      .catch(err => err);

    expect(validationResult).toStrictEqual(validInput);
  });

  it('should throw an error when email is empty', async () => {
    const validationResult = await forgotPasswordValidationSchema.validateAt('email', { email: '' }).catch(err => err);

    expect(validationResult.errors[0]).toBe(forgotPasswordErrorMessages['email:required']);
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
      const validationResult = await forgotPasswordValidationSchema
        .validateAt('email', { email: email })
        .catch(err => err);

      expect(validationResult.errors[0]).toBe(forgotPasswordErrorMessages['email:invalid']);
    }
  });

  it(`should throw an error when email with more than ${DEFAULT_TEXTFIELD_MAX_LENGTH} characters is input`, async () => {
    const input = { email: `${'a'.repeat(DEFAULT_TEXTFIELD_MAX_LENGTH + 1)}@gmail.com` };
    const validationResult = await forgotPasswordValidationSchema.validateAt('email', input).catch(err => err);

    expect(validationResult.errors[0]).toBe(forgotPasswordErrorMessages['email:max']);
  });
});
