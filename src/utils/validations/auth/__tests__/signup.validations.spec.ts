import { DEFAULT_TEXTFIELD_MAX_LENGTH, NAME_MIN_LENGTH, PASSWORD_MIN_LENGTH } from '@sz/constants';

import { signupFormErrorMessages, signupValidationSchema } from '../signup.validations';

describe('signupValidationSchema', () => {
  it('should not give an error if all the inputs are valid', async () => {
    const validFullInput = {
      name: 'John',
      username: 'john@example.com',
      password: 'Password1!',
      confirmPassword: 'Password1!',
    };
    const validationResult = await signupValidationSchema.validate(validFullInput).catch(err => err);

    expect(validationResult).toBe(validFullInput);
    expect(validationResult.errors).toBe(undefined);
  });

  it('should give an error if the name field is empty', async () => {
    const nameInput = '';
    const validationResult = await signupValidationSchema.validateAt('name', { name: nameInput }).catch(err => err);

    expect(validationResult.errors[0]).toBe(signupFormErrorMessages['name:required']);
  });

  it('should give an error if the name contains numbers of special characters', async () => {
    const nameInput = 'Name@123';
    const validationResult = await signupValidationSchema.validateAt('name', { name: nameInput }).catch(err => err);

    expect(validationResult.errors[0]).toBe(signupFormErrorMessages['name:valid']);
  });

  it(`should give an error if the name input has less than ${NAME_MIN_LENGTH} characters`, async () => {
    const nameInput = 'J'.repeat(NAME_MIN_LENGTH - 1);
    const validationResult = await signupValidationSchema.validateAt('name', { name: nameInput }).catch(err => err);

    expect(validationResult.errors[0]).toBe(signupFormErrorMessages['name:min']);
  });

  it(`should give an error if the name input has more than ${DEFAULT_TEXTFIELD_MAX_LENGTH} characters`, async () => {
    const nameInput = 'a'.repeat(DEFAULT_TEXTFIELD_MAX_LENGTH + 1);
    const validationResult = await signupValidationSchema.validateAt('name', { name: nameInput }).catch(err => err);

    expect(validationResult.errors[0]).toBe(signupFormErrorMessages['name:max']);
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
      const validationResult = await signupValidationSchema
        .validateAt('username', { username: email })
        .catch(err => err);

      expect(validationResult).toBe(email);
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
      const validationResult = await signupValidationSchema
        .validateAt('username', { username: email })
        .catch(err => err);

      expect(validationResult.errors[0]).toBe(signupFormErrorMessages['username:email']);
    }
  });

  it('should give an error if the userName(Email) input is empty', async () => {
    const userNameInput = '';
    const validationResult = await signupValidationSchema
      .validateAt('username', { username: userNameInput })
      .catch(err => err);

    expect(validationResult.errors[0]).toBe(signupFormErrorMessages['username:required']);
  });

  it('should give an error if the userName(Email) contains more than 256 characters', async () => {
    const userNameInput = `${'a'.repeat(257)}@gmail.com`;
    const validationResult = await signupValidationSchema
      .validateAt('username', { username: userNameInput })
      .catch(err => err);

    expect(validationResult.errors[0]).toBe(signupFormErrorMessages['username:max']);
  });

  it(`should give an error for the weak the password(contains less than ${PASSWORD_MIN_LENGTH} characters)`, async () => {
    const passwordInput = 'a'.repeat(PASSWORD_MIN_LENGTH - 1);
    const validationResult = await signupValidationSchema
      .validateAt('password', { password: passwordInput })
      .catch(err => err);

    expect(validationResult.errors[0]).toBe(signupFormErrorMessages['password:min']);
  });

  it(`should give an error for the password which has more than ${DEFAULT_TEXTFIELD_MAX_LENGTH} characters`, async () => {
    const passwordInput = `${'abcd'.repeat(DEFAULT_TEXTFIELD_MAX_LENGTH + 1)}`;

    const validationResult = await signupValidationSchema
      .validateAt('password', { password: passwordInput })
      .catch(err => err);

    expect(validationResult.errors[0]).toBe(signupFormErrorMessages['password:max']);
  });

  it('should not give an error for the password does not contains Uppercase letter, Lowercase letter, Numeric character and Special character', async () => {
    //NOTE::This cases shot should not be less than 8 characters. It belongs to a seperate unit test
    const invalidPasswords = ['cL123456@!', 'Yhb&&Uu72721717', '0Oj^1js762tGG^@T@'];
    let validationResult;

    for (const password of invalidPasswords) {
      try {
        validationResult = await signupValidationSchema.validateAt('password', { password: password });
      } catch (error) {
        validationResult = error;
      }

      expect(validationResult.errors).toBe(undefined);
    }
  });

  it('should give an error when the password mismatch', async () => {
    const invalidInput = {
      name: 'Jhon',
      username: 'john@gmail.com',
      password: 'Password!1',
      confirmPassword: 'notamatch',
    };
    let validationResult;
    try {
      validationResult = await signupValidationSchema.validate(invalidInput);
    } catch (error) {
      validationResult = error;
    }

    expect(validationResult.errors[0]).toBe(signupFormErrorMessages['confirmPassword:match']);
  });

  it('should not give an error if the promoCode input is empty', async () => {
    const validInputWithoutPromoCode = {
      name: 'Jhon',
      username: 'john@gmail.com',
      password: 'Password!1',
      confirmPassword: 'Password!1',
    };

    const validationResult = await signupValidationSchema.validate(validInputWithoutPromoCode);
    expect(validationResult).toStrictEqual(validInputWithoutPromoCode);
  });
});
