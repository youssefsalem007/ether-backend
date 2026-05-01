import { Router } from 'express';
import { validation } from '../../common/middleware/validation.js';
import { registerSchema, loginSchema } from './auth.validation.js';
import { registerService, loginService } from './auth.service.js';
import { asyncHandler } from '../../common/utils/asyncHandler.js';
import { successResponse } from '../../common/utils/response.success.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validation(registerSchema),
  asyncHandler(async (req, res) => {
    const { name, email, password, role, adminKey } = req.body;
    const user = await registerService(name, email, password, role, adminKey);
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    return successResponse(res, 201, 'User registered successfully', userWithoutPassword);
  })
);

authRouter.post(
  '/login',
  validation(loginSchema),
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const { user, token } = await loginService(email, password);
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    return successResponse(res, 200, 'Login successful', { user: userWithoutPassword, token });
  })
);

export default authRouter;
