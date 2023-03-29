import { signupValidationSchema } from './signup.validations';

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

  it('should fail validation with invalid name input', async () => {
    const invalidInput = {
      name: 'J',
      username: 'john@example.com',
      password: '&srte3wTknhFfI!',
      confirmPassword: '&srte3wTknhFfI!',
      loginPassword: '&srte3wTknhFfI!',
    };
    expect(signupValidationSchema.validate(invalidInput)).rejects.toThrow();
  });

  it('should fail validation with invalid username input', async () => {
    const invalidInput = {
      name: 'John',
      username: 'notanemail',
      password: '&srte3wTknhFfI!',
      confirmPassword: '&srte3wTknhFfI!',
      loginPassword: '&srte3wTknhFfI!',
    };
    expect(signupValidationSchema.validate(invalidInput)).rejects.toThrow();
  });

  it('should fail validation with invalid password input', async () => {
    const invalidInput = {
      name: 'John',
      username: 'john@example.com',
      password: 'weak',
      confirmPassword: 'weak',
      loginPassword: 'weak',
    };
    expect(signupValidationSchema.validate(invalidInput)).rejects.toThrow();
  });

  it('should fail validation with passwords that do not match', async () => {
    const invalidInput = {
      name: 'John',
      username: 'john@example.com',
      password: '&srte3wTknhFfI!',
      confirmPassword: '&srtsadase3wTknhFfI!',
      loginPassword: '&srte3wTknhFfI!',
    };
    expect(signupValidationSchema.validate(invalidInput)).rejects.toThrow();
  });

  it('should fail validation with invalid login password input', async () => {
    const invalidInput = {
      name: 'John',
      username: 'john@example.com',
      password: 'Password1!',
      confirmPassword: 'Password1!',
      loginPassword: 'weak',
    };
    expect(signupValidationSchema.validate(invalidInput)).rejects.toThrow();
  });

  it('should pass validation with empty promoCode input', async () => {
    const validInput = {
      name: 'John',
      username: 'john@example.com',
      password: 'Password1!',
      confirmPassword: 'Password1!',
      promoCode: '',
      loginPassword: 'Password1!',
    };
    expect(signupValidationSchema.validate(validInput)).resolves.toBe(validInput);
  });
});
