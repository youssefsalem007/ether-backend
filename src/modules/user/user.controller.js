import { Router } from 'express';
import { authentication } from '../../common/middleware/authentication.js';
import { authorization } from '../../common/middleware/authorization.js';
import { roles } from '../../common/enum/role.enum.js';
import { validation } from '../../common/middleware/validation.js';
import { updateProfileSchema } from './user.validation.js';
import { getProfileService, updateProfileService, getAllUsersService } from './user.service.js';
import { asyncHandler } from '../../common/utils/asyncHandler.js';
import { successResponse } from '../../common/utils/response.success.js';

const userRouter = Router();

userRouter.get(
  '/profile',
  authentication,
  asyncHandler(async (req, res) => {
    const user = await getProfileService(req.user._id);
    return successResponse(res, 200, 'Profile fetched', user);
  })
);

userRouter.patch(
  '/profile',
  authentication,
  validation(updateProfileSchema),
  asyncHandler(async (req, res) => {
    const user = await updateProfileService(req.user._id, req.body);
    return successResponse(res, 200, 'Profile updated', user);
  })
);

userRouter.get(
  '/all',
  authentication,
  authorization([roles.ADMIN]),
  asyncHandler(async (req, res) => {
    const users = await getAllUsersService();
    return successResponse(res, 200, 'All users fetched', users);
  })
);

export default userRouter;  
