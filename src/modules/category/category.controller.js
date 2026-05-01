import { Router } from 'express';
import { authentication } from '../../common/middleware/authentication.js';
import { authorization } from '../../common/middleware/authorization.js';
import { roles } from '../../common/enum/role.enum.js';
import { validation } from '../../common/middleware/validation.js';
import { createCategorySchema } from './category.validation.js';
import { createCategoryService, getCategoriesService, deleteCategoryService } from './category.service.js';
import { asyncHandler } from '../../common/utils/asyncHandler.js';
import { successResponse } from '../../common/utils/response.success.js';

const router = Router();

router.post(
  '/',
  authentication,
  authorization([roles.ADMIN]),
  validation(createCategorySchema),
  asyncHandler(async (req, res) => {
    const category = await createCategoryService(req.body);
    return successResponse(res, 201, 'Category created', category);
  })
);

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const categories = await getCategoriesService();
    return successResponse(res, 200, 'Categories fetched', categories);
  })
);

router.delete(
  '/:id',
  authentication,
  authorization([roles.ADMIN]),
  asyncHandler(async (req, res) => {
    await deleteCategoryService(req.params.id);
    return successResponse(res, 200, 'Category deleted');
  })
);

export default router;
