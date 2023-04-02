import { signupValidationSchema } from '../signup.validations';

describe('signupValidationSchema', () => {
  it('should not give an error if all the inputs are valid', async () => {
    const validFullInput = {
      name: 'John',
      username: 'john@example.com',
      password: 'Password1!',
      confirmPassword: 'Password1!',
      loginPassword: 'Password1!',
    };

    const result = await signupValidationSchema.validate(validFullInput);
    expect(result).toBe(validFullInput);
  });

  it('should give an error if the name field is empty', async () => {
    const invalidEmptyNameInput = '';
    let validationResult;

    try {
      validationResult = await signupValidationSchema.validateAt('name', { name: invalidEmptyNameInput });
    } catch (error) {
      validationResult = error;
    }

    expect(validationResult.errors[0]).toBe('Please enter Name');
  });

  it('should give an error if the name input has less than 2 characters', async () => {
    const invalidNameInput = {
      name: 'J',
    };
    let validationResult;

    try {
      validationResult = await signupValidationSchema.validateAt('name', invalidNameInput);
    } catch (error) {
      validationResult = error;
    }

    expect(validationResult.errors[0]).toBe('Username must be at least 2 letters long');
  });

  it('should give an error if the name input has more than 10 characters', async () => {
    //TODO::test for several values
    const invalidNameInput = {
      name: 'Johnwithmorethantenletters',
    };
    let validationResult;

    try {
      validationResult = await signupValidationSchema.validateAt('name', invalidNameInput);
    } catch (error) {
      validationResult = error;
    }

    //TODO::Error messages are being repeated
    expect(validationResult.errors[0]).toBe('Username must not be 10 letters long');
  });

  it('should give an error if the userName(Email) input is invalid', async () => {
    //TODO::test for several values
    const invalidInput = {
      username: 'invalid.email',
    };

    let validationResult;

    try {
      validationResult = await signupValidationSchema.validateAt('username', invalidInput);
    } catch (error) {
      validationResult = error;
    }

    //TODO::Error messages are being repeated
    expect(validationResult.errors[0]).toBe('Invalid Email');
  });

  it('should give an error if the userName(Email) input is empty', async () => {
    //TODO::test for several values
    const invalidInput = {
      username: '',
    };
    let validationResult;

    try {
      validationResult = await signupValidationSchema.validateAt('username', invalidInput);
    } catch (error) {
      validationResult = error;
    }

    //TODO::Error messages are being repeated
    expect(validationResult.errors[0]).toBe('Please enter Email ID');
  });

  it('should give an error if the userName(Email) contains more than 50 characters', async () => {
    const invalidInput = {
      username: 'johnwith_more_than_fifty_characters_in_email@example.com',
    };
    let validationResult;

    try {
      validationResult = await signupValidationSchema.validateAt('username', invalidInput);
    } catch (error) {
      validationResult = error;
    }

    //TODO::Error messages are being repeated
    expect(validationResult.errors[0]).toBe('Email must not be 50 letters long');
  });

  it('should give an error for the weak the password(contains less than 8 characters)', async () => {
    //TODO::test for several values
    const invalidInput = {
      password: 'weak',
    };
    let validationResult;

    try {
      validationResult = await signupValidationSchema.validateAt('password', invalidInput);
    } catch (error) {
      validationResult = error;
    }

    //TODO::Error messages are being repeated
    expect(validationResult.errors[0]).toBe('Password must be at least 8 letters long');
  });

  it('should give an error for the password which has more than 20 characters', async () => {
    //TODO::test for several values
    const invalidInput = {
      password: 'password_with_more_than_twenty_character_is_not_allowed_212_FSFR_%!$!_end',
    };
    let validationResult;

    try {
      validationResult = await signupValidationSchema.validateAt('password', invalidInput);
    } catch (error) {
      validationResult = error;
    }

    //TODO::Error messages are being repeated
    expect(validationResult.errors[0]).toBe('Password must not be 20 letters long');
  });

  it('should give an error for the password does not contains Uppercase letter, Lowercase letter, Numeric character and Special character', async () => {
    //TODO::test for several values
    const invalidInput = {
      password: 'abcdefghi',
    };
    let validationResult;

    try {
      validationResult = await signupValidationSchema.validateAt('password', invalidInput);
    } catch (error) {
      validationResult = error;
    }

    //TODO::Error messages are being repeated
    expect(validationResult.errors[0]).toBe(
      'Password must contain at least one Uppercase letter, Lowercase letter, Numeric character and Special character',
    );
  });

  it('should fail validation with an invalid confirm password ', async () => {
    const invalidInput = {
      name: 'Jhon',
      username: 'john@gmail.com',
      password: 'Password!1',
      confirmPassword: 'notamatch',
      loginPassword: 'Password!1',
    };
    let validationResult;
    try {
      validationResult = await signupValidationSchema.validate(invalidInput); //TODO::refactor
    } catch (error) {
      validationResult = error;
    }

    //TODO::Error messages are being repeated
    expect(validationResult.errors[0]).toBe('Your passwords do not match');
  });

  it('should pass the validation without the promo code', async () => {
    const validInput = {
      name: 'Jhon',
      username: 'john@gmail.com',
      password: 'Password!1',
      confirmPassword: 'Password!1',
      loginPassword: 'Password!1',
    };
    expect(signupValidationSchema.validate(validInput)).resolves.toBe(validInput);
  });
});
