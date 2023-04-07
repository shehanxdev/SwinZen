import { forgotPasswordValidationSchema } from '../forgotPassword.validations';

describe('forgotPasswordValidationSchema', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  it('should throw an error if a number is input', async () => {
    const input = { username: 265 };
    expect(forgotPasswordValidationSchema.validate(input)).rejects.toThrow();
  });
  it('should throw an error when email is empty', async () => {
    const input = { username: '' };
    let validationResult;
    try {
      await forgotPasswordValidationSchema.validate(input);
    } catch (error) {
      validationResult = error;
    }
    expect(validationResult.errors[0]).toBe('Please enter Email ID');
  });
  it('should throw an error when invalid email is input', async () => {
    const input = { username: 'sds' };
    let validationResult;
    try {
      await forgotPasswordValidationSchema.validate(input);
    } catch (error) {
      validationResult = error;
    }
    expect(validationResult.errors[0]).toBe('Invalid Email ID');
  });
  it('should throw an error when email with more than 50 characters is input', async () => {
    const input = { username: `${'a'.repeat(56)}@gmail.com` };
    let validationResult;
    try {
      await forgotPasswordValidationSchema.validate(input);
    } catch (error) {
      validationResult = error;
    }
    expect(validationResult.errors[0]).toBe('Email must not be 50 letters long');
  });
});
