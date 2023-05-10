import { forgotPasswordErrorMessages, forgotPasswordValidationSchema } from '../forgotPassword.validations';

describe('forgot Password validation schema', () => {
  it('should pass the test for valid email input', () => {
    const validInput = 'valid@gmail.com';
    expect(forgotPasswordValidationSchema.validateAt('email', { email: validInput }));
  });
  it('should throw an error if a number is input', async () => {
    const invalidInput = { email: 265 };
    expect(forgotPasswordValidationSchema.validate(invalidInput)).rejects.toThrow();
  });
  it('should throw an error when email is empty', async () => {
    const input = { email: '' };
    let validationResult;
    try {
      await forgotPasswordValidationSchema.validate(input);
    } catch (error) {
      validationResult = error;
    }
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
      'john..doe@example.com',
      'example@localhost',
      'john.doe@example..com',
      ' john.doe@example.com',
      'john.doe@example.com ',
    ];
    let validationResult;
    for (const email of invalidEmails) {
      try {
        await forgotPasswordValidationSchema.validateAt('email', { email: email });
      } catch (error) {
        validationResult = error;
      }

      expect(validationResult.errors[0]).toBe(forgotPasswordErrorMessages['email:invalid']);
    }
  });
  it('should throw an error when email with more than 256 characters is input', async () => {
    const input = { email: `${'a'.repeat(257)}@gmail.com` };
    let validationResult;
    try {
      await forgotPasswordValidationSchema.validateAt('email', input);
    } catch (error) {
      validationResult = error;
    }
    expect(validationResult.errors[0]).toBe(forgotPasswordErrorMessages['email:max']);
  });
});
