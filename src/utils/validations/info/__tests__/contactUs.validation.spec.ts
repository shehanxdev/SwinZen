import { contactUsFormErrorMessages, contactUsValidationSchema } from '../contactUs.validation';

describe('contact us validation schema', () => {
  it('should pass the test for valid input', async () => {
    const validInput = {
      phoneNumber: '+1 123 345 4534',
      message: 'Valid test message',
    };
    await expect(contactUsValidationSchema.validate(validInput)).resolves.toBeTruthy();
  });

  it('should should give an error if the mobile input field is empty', async () => {
    const invalidMobileNumberInput = undefined;

    try {
      await contactUsValidationSchema.validateAt('phoneNumber', {
        phoneNumber: invalidMobileNumberInput,
      });
    } catch (error) {
      expect(error.message).toBe(contactUsFormErrorMessages['phoneNumber:required']);
    }
  });

  it('should should give an error for invalid mobile number input', async () => {
    const invalidMobileNumberInputs = [
      '+1 123 45 678',
      '+1 1234 567 890',
      '1 123 456 7890',
      '+2 123 456 7890',
      '+1 1234 5678',
      '+1 123 4567 890',
      '+1 1234567890',
    ];

    for (const phoneNumber of invalidMobileNumberInputs) {
      try {
        await contactUsValidationSchema.validateAt('phoneNumber', {
          phoneNumber: phoneNumber,
        });
      } catch (error) {
        expect(error.message).toBe(contactUsFormErrorMessages['phoneNumber:matches']);
      }
    }
  });

  it('should should not give an error for valid mobile number input', async () => {
    const validMobileNumberInputs = [
      '+1 225 555 4433',
      '+1 555 555 5553',
      '+1 123 456 7893',
      '+1 987 654 3213',
      '+1 999 888 7773',
    ];

    for (const phoneNumber of validMobileNumberInputs) {
      await expect(
        contactUsValidationSchema.validateAt('phoneNumber', { phoneNumber: phoneNumber }),
      ).resolves.toBeTruthy();
    }
  });

  it('should give an error if the message is empty', async () => {
    const invalidMessageInput = '';

    try {
      await contactUsValidationSchema.validateAt('message', { message: invalidMessageInput });
    } catch (error) {
      expect(error.message).toBe(contactUsFormErrorMessages['message:required']);
    }
  });

  it('should give an erro if the message is too long', async () => {
    const invalidMessageInput = `${'a'.repeat(201)}`;

    try {
      await contactUsValidationSchema.validateAt('message', { message: invalidMessageInput });
    } catch (error) {
      expect(error.message).toBe(contactUsFormErrorMessages['message:max']);
    }
  });
});
