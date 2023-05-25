import { contactUsFormErrorMessages, contactUsValidationSchema } from '../contactUs.validation';

describe('contact us validation schema', () => {
  it('should pass the test for valid input', async () => {
    const validInput = {
      name: 'John',
      username: 'john@example.com',
      mobileNumber: '+1 123 345 4534',
      message: 'Valid test message',
    };
    await expect(contactUsValidationSchema.validate(validInput)).resolves.toBeTruthy();
  });

  it('should give an error if the name field is empty', async () => {
    const invalidNameInput = '';

    try {
      await contactUsValidationSchema.validateAt('name', { name: invalidNameInput });
    } catch (error) {
      expect(error.message).toBe(contactUsFormErrorMessages['name:required']);
    }
  });

  it('should give an error if the name input has less than 2 characters', async () => {
    const invalidNameInput = 'J';

    try {
      await contactUsValidationSchema.validateAt('name', { name: invalidNameInput });
    } catch (error) {
      expect(error.message).toBe(contactUsFormErrorMessages['name:min']);
    }
  });

  it('should give an error if the name input has more than 10 characters', async () => {
    const invalidNameInput = 'J'.repeat(11);

    try {
      await contactUsValidationSchema.validateAt('name', { name: invalidNameInput });
    } catch (error) {
      expect(error.message).toBe(contactUsFormErrorMessages['name:max']);
    }
  });

  it('should not give an error if the userName(Email) input is valid', async () => {
    const validEmails = [
      'prettyandsimple@example.com',
      'very.common@example.com',
      'disposable.style.email.with+symbol@example.com',
      'other.email-with-dash@example.com',
      'fully-qualified-domain@example.com',
      'x@example.com',
      'example-indeed@strange-example.com',
      'example@s.solutions',
    ];

    for (const email of validEmails) {
      await expect(contactUsValidationSchema.validateAt('username', { username: email })).resolves.toBeTruthy();
    }
  });

  it('should give an error if the userName(Email) input is invalid', async () => {
    const invalidEmails = [
      'Abc.example.com',
      'A@b@c@example.com',
      'a"b(c)d,e:f;gi[jk]l@example.com',
      'just"not"right@example.com',
      'this is"notallowed@example.com',
      'this still"notallowed@example.com',
    ];

    for (const email of invalidEmails) {
      try {
        await contactUsValidationSchema.validateAt('username', { username: email });
      } catch (error) {
        expect(error.message).toBe(contactUsFormErrorMessages['username:invalid']);
      }
    }
  });

  it('should give an error if the userName(Email) input is empty', async () => {
    const invalidUserNameInput = '';

    try {
      await contactUsValidationSchema.validateAt('username', { username: invalidUserNameInput });
    } catch (error) {
      expect(error.message).toBe(contactUsFormErrorMessages['username:required']);
    }
  });

  it('should give an error if the userName(Email) contains more than 50 characters', async () => {
    const invalidUserNameInput = `${'a'.repeat(56)}@gmail.com`;

    try {
      await contactUsValidationSchema.validateAt('username', { username: invalidUserNameInput });
    } catch (error) {
      expect(error.message).toBe(contactUsFormErrorMessages['username:max']);
    }
  });

  it('should should give an error if the mobile input field is empty', async () => {
    const invalidMobileNumberInput = undefined;

    try {
      await contactUsValidationSchema.validateAt('mobileNumber', {
        mobileNumber: invalidMobileNumberInput,
      });
    } catch (error) {
      expect(error.message).toBe(contactUsFormErrorMessages['mobileNumber:required']);
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

    for (const mobileNumber of invalidMobileNumberInputs) {
      try {
        await contactUsValidationSchema.validateAt('mobileNumber', {
          mobileNumber: mobileNumber,
        });
      } catch (error) {
        expect(error.message).toBe(contactUsFormErrorMessages['mobileNumber:matches']);
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

    for (const mobileNumber of validMobileNumberInputs) {
      await expect(
        contactUsValidationSchema.validateAt('mobileNumber', { mobileNumber: mobileNumber }),
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
