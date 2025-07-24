import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { AppError, catchAsync } from '../utils/errorHandler';
import { validateRegistration } from '../utils/validation';

// Environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// Register new user
export const register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // Validate input
  const validation = validateRegistration(req);
  if (!validation.isValid) {
    return next(new AppError('Validation failed', 400, validation.errors));
  }

  const { name, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError('Email already in use', 400));
  }

  // Create new user
  const newUser = await User.create({
    name,
    email,
    password,
    role: 'customer'
  });

  // Generate JWT token
  const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });

  // Remove password from output
  newUser.password = undefined as any;

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser
    }
  });
});

// Login user
export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  // 1. Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // 2. Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3. If everything ok, send token to client
  const token = jwt.sign({ id: user._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });

  // Remove password from output
  user.password = undefined as any;

  res.status(200).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
});