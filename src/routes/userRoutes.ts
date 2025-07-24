import { Router, Request, Response } from 'express';

const router: Router = Router();

// Test registration endpoint
router.post('/register', (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    
    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required'
      });
    }

    console.log('Registration attempt:', { name, email });
    
    // In a real app, you would:
    // 1. Validate input
    // 2. Hash password
    // 3. Save to database
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: 'temp-123',
        name,
        email
      }
    });
    
  } catch (error: any) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

export default router;