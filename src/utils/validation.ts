import validator from 'validator';
import { Request } from 'express';

export interface ValidationResult {
  isValid: boolean;
  errors: { [key: string]: string };
}

export const validateRegistration = (req: Request): ValidationResult => {
  const errors: { [key: string]: string } = {};
  const { name, email, password } = req.body;

  // Name validation
  if (!name || !name.trim()) {
    errors.name = 'Name is required';
  } else if (name.length > 100) {
    errors.name = 'Name cannot exceed 100 characters';
  }

  // Email validation
  if (!email || !email.trim()) {
    errors.email = 'Email is required';
  } else if (!validator.isEmail(email)) {
    errors.email = 'Please provide a valid email';
  }

  // Password validation
  if (!password) {
    errors.password = 'Password is required';
  } else {
    if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    if (!/[A-Z]/.test(password)) {
      errors.password = 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(password)) {
      errors.password = 'Password must contain at least one lowercase letter';
    }
    if (!/[0-9]/.test(password)) {
      errors.password = 'Password must contain at least one number';
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      errors.password = 'Password must contain at least one special character';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};