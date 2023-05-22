import { otpValidationErrorMessages, otpValidationSchema } from '../otp.validations';

describe('otpValidationSchema', () => {
  it('should validate with valid input', async () => {
    const input = { otp: '123456' };
    const validationResult = await otpValidationSchema.validateAt('otp', input).catch(err => err);

    expect(validationResult).toStrictEqual(input.otp);
  });

  it('should throw an error if OTP is empty', async () => {
    const input = { otp: '' };
    const validationResult = await otpValidationSchema.validateAt('otp', input).catch(err => err);

    expect(validationResult.errors[0]).toEqual(otpValidationErrorMessages['otp:required']);
  });

  it('should throw an error if OTP is less than 6 digits', async () => {
    const input = { otp: '12345' };
    const validationResult = await otpValidationSchema.validateAt('otp', input).catch(err => err);

    expect(validationResult.errors[0]).toEqual(otpValidationErrorMessages['otp:match']);
  });

  it('should throw an error if OTP is more than 6 digits', async () => {
    const input = { otp: '1234567' };
    const validatioNResult = await otpValidationSchema.validateAt('otp', input).catch(err => err);

    expect(validatioNResult.errors[0]).toEqual(otpValidationErrorMessages['otp:match']);
  });

  it('should throw an error if OTP contains non-digits', async () => {
    const input = { otp: '1a3b56' };
    const validationResult = await otpValidationSchema.validateAt('otp', input).catch(err => err);

    expect(validationResult.errors[0]).toEqual(otpValidationErrorMessages['otp:match']);
  });
});
