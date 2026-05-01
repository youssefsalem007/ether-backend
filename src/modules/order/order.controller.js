import { Router } from 'express';
import { authentication } from '../../common/middleware/authentication.js';
import { authorization } from '../../common/middleware/authorization.js';
import { roles } from '../../common/enum/role.enum.js';
import { validation } from '../../common/middleware/validation.js';
import { createOrderSchema, updateOrderStatusSchema } from './order.validation.js';
import { 
  createOrderService, 
  getOrdersService, 
  updateOrderStatusService, 
  getOrderStatsService 
} from './order.service.js';
import { asyncHandler } from '../../common/utils/asyncHandler.js';
import { successResponse } from '../../common/utils/response.success.js';

const orderRouter = Router();

orderRouter.post(
  '/',
  validation(createOrderSchema),
  asyncHandler(async (req, res) => {
    const order = await createOrderService(req.body);
    return successResponse(res, 201, 'We will contact you on Instagram to confirm your order and send a payment request.', order);
  })
);

orderRouter.get(
  '/',
  authentication,
  authorization([roles.ADMIN]),
  asyncHandler(async (req, res) => {
    const orders = await getOrdersService();
    return successResponse(res, 200, 'Orders fetched', orders);
  })
);

orderRouter.get(
  '/stats',
  authentication,
  authorization([roles.ADMIN]),
  asyncHandler(async (req, res) => {
    const stats = await getOrderStatsService();
    return successResponse(res, 200, 'Stats fetched', stats);
  })
);

orderRouter.patch(
  '/:id/status',
  authentication,
  authorization([roles.ADMIN]),
  validation(updateOrderStatusSchema),
  asyncHandler(async (req, res) => {
    const order = await updateOrderStatusService(req.params.id, req.body.status);
    return successResponse(res, 200, 'Order status updated', order);
  })
);

export default orderRouter;
