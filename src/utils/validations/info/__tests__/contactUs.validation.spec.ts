import { contactUsFormErrorMessages, contactUsValidationSchema } from '../contactUs.validation';

describe('contact us validation schema', () => {
  it('should pass the test for valid input', async () => {
    const validInput = {
      name: 'John',
      username: 'john@example.com',
      mobileNumber: '+1 123 345 453',
      message: 'Valid test message',
    };
    let validationResult;

    try {
      validationResult = await contactUsValidationSchema.validate(validInput);
    } catch (error) {
      validationResult = error;
    }

    expect(validationResult).toBe(validInput);
    expect(validationResult.errors).toBe(undefined);
  });
  it('should give an error if the name field is empty', async () => {
    const invalidNameInput = '';
    let validationResult;

    try {
      validationResult = await contactUsValidationSchema.validateAt('name', { name: invalidNameInput });
    } catch (error) {
      validationResult = error;
    }

    expect(validationResult.errors[0]).toBe(contactUsFormErrorMessages['name:required']);
  });
  it('should give an error if the name input has less than 2 characters', async () => {
    const invalidNameInput = 'J';
    let validationResult;

    try {
      validationResult = await contactUsValidationSchema.validateAt('name', { name: invalidNameInput });
    } catch (error) {
      validationResult = error;
    }

    expect(validationResult.errors[0]).toBe(contactUsFormErrorMessages['name:min']);
  });

  it('should give an error if the name input has more than 10 characters', async () => {
    const invalidNameInput = 'J'.repeat(11);
    let validationResult;

    try {
      validationResult = await contactUsValidationSchema.validateAt('name', { name: invalidNameInput });
    } catch (error) {
      validationResult = error;
    }

    expect(validationResult.errors[0]).toBe(contactUsFormErrorMessages['name:max']);
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
    let validationResult;

    for (const email of validEmails) {
      try {
        validationResult = await contactUsValidationSchema.validateAt('username', { username: email });
      } catch (error) {
        validationResult = error;
      }
      expect(validationResult.errors).toBe(undefined);
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
    let validationResult;

    for (const email of invalidEmails) {
      try {
        validationResult = await contactUsValidationSchema.validateAt('username', { username: email });
      } catch (error) {
        validationResult = error;
      }
      expect(validationResult.errors[0]).toBe(contactUsFormErrorMessages['username:email']);
    }
  });

  it('should give an error if the userName(Email) input is empty', async () => {
    const invalidUserNameInput = '';
    let validationResult;

    try {
      validationResult = await contactUsValidationSchema.validateAt('username', { username: invalidUserNameInput });
    } catch (error) {
      validationResult = error;
    }

    expect(validationResult.errors[0]).toBe(contactUsFormErrorMessages['username:required']);
  });

  it('should give an error if the userName(Email) contains more than 50 characters', async () => {
    const invalidUserNameInput = `${'a'.repeat(56)}@gmail.com`;
    let validationResult;

    try {
      validationResult = await contactUsValidationSchema.validateAt('username', { username: invalidUserNameInput });
    } catch (error) {
      validationResult = error;
    }

    expect(validationResult.errors[0]).toBe(contactUsFormErrorMessages['username:max']);
  });

  //TODO add test cases for mobile number

  it('should give an erro if the message is empty', async () => {
    const invalidMessageInput = '';
    let validationResult;

    try {
      validationResult = await contactUsValidationSchema.validateAt('message', { message: invalidMessageInput });
    } catch (error) {
      validationResult = error;
    }

    expect(validationResult.errors[0]).toBe(contactUsFormErrorMessages['message:required']);
  });
  it('should give an erro if the message is empty', async () => {
    const invalidMessageInput = `${'a'.repeat(201)}`;
    let validationResult;

    try {
      validationResult = await contactUsValidationSchema.validateAt('message', { message: invalidMessageInput });
    } catch (error) {
      validationResult = error;
    }

    expect(validationResult.errors[0]).toBe(contactUsFormErrorMessages['message:max']);
  });
});
