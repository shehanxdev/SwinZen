import { signupValidationSchema } from '../signup.validations';

describe('signupValidationSchema', () => {
  it('should pass validation with valid input', async () => {
    const validInput = {
      name: 'John',
      username: 'john@example.com',
      password: 'Password1!',
      confirmPassword: 'Password1!',
      loginPassword: 'Password1!',
    };
    expect(signupValidationSchema.validate(validInput)).resolves.toBe(validInput);
  });

  it('should fail validation with empty name', async () => {
    const invalidInput = {
      name: '',
    };
    let validationResult;
    try {
      validationResult = await signupValidationSchema.validateAt('name', invalidInput);
    } catch (error) {
      validationResult = error;
    }
    expect(validationResult.errors[0]).toBe('Please enter Name');
  });

  it('should fail validation with invalid name input less than 2 letters', async () => {
    const invalidInput = {
      name: 'J',
    };
    let validationResult;
    try {
      validationResult = await signupValidationSchema.validateAt('name', invalidInput);
    } catch (error) {
      validationResult = error;
    }
    expect(validationResult.errors[0]).toBe('Username must be at least 2 letters long');
  });

  it('should fail validation with invalid name input with more than 10 letters', async () => {
    const invalidInput = {
      name: 'Johnwithmorethantenletters',
    };
    let validationResult;
    try {
      validationResult = await signupValidationSchema.validateAt('name', invalidInput);
    } catch (error) {
      validationResult = error;
    }
    expect(validationResult.errors[0]).toBe('Username must not be 10 letters long');
  });

  it('should fail validation with invalid username input', async () => {
    const invalidInput = {
      username: 'invalid',
    };
    let validationResult;
    try {
      validationResult = await signupValidationSchema.validateAt('username', invalidInput);
    } catch (error) {
      validationResult = error;
    }
    expect(validationResult.errors[0]).toBe('Invalid Email');
  });

  it('should fail validation with empty username', async () => {
    const invalidInput = {
      username: '',
    };
    let validationResult;
    try {
      validationResult = await signupValidationSchema.validateAt('username', invalidInput);
    } catch (error) {
      validationResult = error;
    }
    expect(validationResult.errors[0]).toBe('Please enter Email ID');
  });

  it('should fail validation with username input with more than 50 characters', async () => {
    const invalidInput = {
      username:
        'johnwith_more_than_fifty_characters_aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@example.com',
    };
    let validationResult;
    try {
      validationResult = await signupValidationSchema.validateAt('username', invalidInput);
    } catch (error) {
      validationResult = error;
    }
    expect(validationResult.errors[0]).toBe('Email must not be 50 letters long');
  });

  it('should fail validation with invalid login weak password input', async () => {
    const invalidInput = {
      password: 'weak',
    };
    let validationResult;
    try {
      validationResult = await signupValidationSchema.validateAt('password', invalidInput);
    } catch (error) {
      validationResult = error;
    }
    expect(validationResult.errors[0]).toBe('Password must be at least 8 letters long');
  });

  it('should fail validation with a password with more than 20 characters ', async () => {
    const invalidInput = {
      password: 'password_with_more_than_twenty_character_is_not_allowed',
    };
    let validationResult;
    try {
      validationResult = await signupValidationSchema.validateAt('password', invalidInput);
    } catch (error) {
      validationResult = error;
    }
    expect(validationResult.errors[0]).toBe('Password must not be 20 letters long');
  });

  it('should fail validation with an invalid password ', async () => {
    const invalidInput = {
      password: 'abcdefghi',
    };
    let validationResult;
    try {
      validationResult = await signupValidationSchema.validateAt('password', invalidInput);
    } catch (error) {
      validationResult = error;
    }
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
      validationResult = await signupValidationSchema.validate(invalidInput);
    } catch (error) {
      validationResult = error;
    }
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
