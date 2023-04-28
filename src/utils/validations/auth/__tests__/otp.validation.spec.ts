import { ValidationError } from 'yup';

import { otpValidationErrorMessages, otpValidationSchema } from '../otp.validations';

describe('otpValidationSchema', () => {
  it('should validate with valid input', async () => {
    const input = { otp: '123456' };
    await expect(otpValidationSchema.validateAt('otp', input)).resolves.toBeTruthy();
  });

  it('should throw an error if OTP is empty', async () => {
    const input = { otp: '' };
    try {
      await otpValidationSchema.validateAt('otp', input);
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.message).toEqual(otpValidationErrorMessages['otp:required']);
    }
  });

  it('should throw an error if OTP is less than 6 digits', async () => {
    const input = { otp: '12345' };
    try {
      await otpValidationSchema.validateAt('otp', input);
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.message).toEqual(otpValidationErrorMessages['otp:match']);
    }
  });

  it('should throw an error if OTP is more than 6 digits', async () => {
    const input = { otp: '1234567' };
    try {
      await otpValidationSchema.validateAt('otp', input);
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.message).toEqual(otpValidationErrorMessages['otp:match']);
    }
  });

  it('should throw an error if OTP contains non-digits', async () => {
    const input = { otp: '1a3b56' };
    try {
      await otpValidationSchema.validateAt('otp', input);
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.message).toEqual(otpValidationErrorMessages['otp:match']);
    }
  });
});
