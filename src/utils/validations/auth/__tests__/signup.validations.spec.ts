import { signupFormErrorMessages, signupValidationSchema } from '../signup.validations';

describe('signupValidationSchema', () => {
  it('should not give an error if all the inputs are valid', async () => {
    const validFullInput = {
      name: 'John',
      username: 'john@example.com',
      password: 'Password1!',
      confirmPassword: 'Password1!',
    };
    let validationResult;

    try {
      validationResult = await signupValidationSchema.validate(validFullInput);
    } catch (error) {
      validationResult = error;
    }

    expect(validationResult).toBe(validFullInput);
    expect(validationResult.errors).toBe(undefined);
  });

  it('should give an error if the name field is empty', async () => {
    const nameInput = '';
    let validationResult;

    try {
      validationResult = await signupValidationSchema.validateAt('name', { name: nameInput });
    } catch (error) {
      validationResult = error;
    }

    expect(validationResult.errors[0]).toBe(signupFormErrorMessages['name:required']);
  });

  it('should give an error if the name input has less than 2 characters', async () => {
    const nameInput = 'J';
    let validationResult;

    try {
      validationResult = await signupValidationSchema.validateAt('name', { name: nameInput });
    } catch (error) {
      validationResult = error;
    }

    expect(validationResult.errors[0]).toBe(signupFormErrorMessages['name:min']);
  });

  it('should give an error if the name input has more than 256 characters', async () => {
    // string contain 264 characters
    const nameInput =
      'JohnwithmorethantwohundredfiftysixcharactersJohnwithmorethantwohundredfiftysixcharactersJohnwithmorethantwohundredfiftysixcharactersJohnwithmorethantwohundredfiftysixcharactersJohnwithmorethantwohundredfiftysixcharactersJohnwithmorethantwohundredfiftysixcharacters';
    let validationResult;

    try {
      validationResult = await signupValidationSchema.validateAt('name', { name: nameInput });
    } catch (error) {
      validationResult = error;
    }

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
    let validationResult;

    for (const email of validEmails) {
      try {
        validationResult = await signupValidationSchema.validateAt('username', { username: email });
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
        validationResult = await signupValidationSchema.validateAt('username', { username: email });
      } catch (error) {
        validationResult = error;
      }
      expect(validationResult.errors[0]).toBe(signupFormErrorMessages['username:email']);
    }
  });

  it('should give an error if the userName(Email) input is empty', async () => {
    const userNameInput = '';
    let validationResult;

    try {
      validationResult = await signupValidationSchema.validateAt('username', { username: userNameInput });
    } catch (error) {
      validationResult = error;
    }

    expect(validationResult.errors[0]).toBe(signupFormErrorMessages['username:required']);
  });

  it('should give an error if the userName(Email) contains more than 256 characters', async () => {
    const userNameInput = `${'a'.repeat(257)}@gmail.com`;
    let validationResult;

    try {
      validationResult = await signupValidationSchema.validateAt('username', { username: userNameInput });
    } catch (error) {
      validationResult = error;
    }

    expect(validationResult.errors[0]).toBe(signupFormErrorMessages['username:max']);
  });

  it('should give an error for the weak the password(contains less than 8 characters)', async () => {
    const passwordInput = 'weak';
    let validationResult;

    try {
      validationResult = await signupValidationSchema.validateAt('password', { password: passwordInput });
    } catch (error) {
      validationResult = error;
    }

    expect(validationResult.errors[0]).toBe(signupFormErrorMessages['password:min']);
  });

  it('should give an error for the password which has more than 256 characters', async () => {
    const passwordInput =
      'password_with_more_than_two_hundred_and_fifty_six_characters_is_not_allowed_212_FSFRLorem_ipsum_dolor_sit_amet_consectetur_adipiscing_elit_sed_do_eiusmod_tempor_incididunt_ut labore_et_dolore_magna_aliqua_Ut_enim_ad_minim_veniam_quis_nostrud_exercitationullamc_ut_aliquip_%!$!_endpassword_with_more_than_twenty_character_is_not_allowed_212_FSFR_%!$!_end';
    let validationResult;

    try {
      validationResult = await signupValidationSchema.validateAt('password', { password: passwordInput });
    } catch (error) {
      validationResult = error;
    }

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
    expect(signupValidationSchema.validate(validInputWithoutPromoCode)).resolves.toBe(validInputWithoutPromoCode);
  });
});
