import { Router } from 'express';
import { authentication } from '../../common/middleware/authentication.js';
import { authorization } from '../../common/middleware/authorization.js';
import { roles } from '../../common/enum/role.enum.js';
import { validation } from '../../common/middleware/validation.js';
import { upload } from '../../common/utils/cloudinary/cloudinary.service.js';
import { createProductSchema, updateProductSchema, productIdSchema } from './product.validation.js';
import { 
  createProductService, 
  updateProductService, 
  deleteProductService, 
  getProductsService, 
  getProductByIdService 
} from './product.service.js';
import { asyncHandler } from '../../common/utils/asyncHandler.js';
import { successResponse } from '../../common/utils/response.success.js';

const productRouter = Router();

productRouter.post(
  '/',
  authentication,
  authorization([roles.ADMIN]), 
  upload.array('images', 5),
  validation(createProductSchema),
  asyncHandler(async (req, res) => {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'At least one image is required' });
    }
    const imageUrls = req.files.map(file => file.path);
    const product = await createProductService({ ...req.body, images: imageUrls });
    return successResponse(res, 201, 'Product created', product);
  })
);

productRouter.patch(
  '/:id',
  authentication,
  authorization([roles.ADMIN]),
  upload.array('images', 5),
  validation(updateProductSchema),
  asyncHandler(async (req, res) => {
    const updateData = { ...req.body };
    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map(file => file.path);
    }
    const product = await updateProductService(req.params.id, updateData);
    return successResponse(res, 200, 'Product updated', product);
  })
);

productRouter.delete(
  '/:id',
  authentication,
  authorization([roles.ADMIN]),
  validation(productIdSchema),
  asyncHandler(async (req, res) => {
    await deleteProductService(req.params.id);
    return successResponse(res, 200, 'Product deleted');
  })
);

productRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const result = await getProductsService(req.query);
    return successResponse(res, 200, 'Products fetched', result);
  })
);

productRouter.get(
  '/:id',
  validation(productIdSchema),
  asyncHandler(async (req, res) => {
    const product = await getProductByIdService(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    return successResponse(res, 200, 'Product fetched', product);
  })
);

export default productRouter;
