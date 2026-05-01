import { Router } from 'express';
import { authentication } from '../../common/middleware/authentication.js';
import { authorization } from '../../common/middleware/authorization.js';
import { roles } from '../../common/enum/role.enum.js';
import { 
  createCouponService, 
  getCouponsService, 
  deleteCouponService,
  toggleCouponService
} from './coupon.service.js';
import { asyncHandler } from '../../common/utils/asyncHandler.js';
import { successResponse } from '../../common/utils/response.success.js';

const couponRouter = Router();

couponRouter.use(authentication, authorization([roles.ADMIN]));

couponRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const coupon = await createCouponService(req.body);
    return successResponse(res, 201, 'Coupon created', coupon);
  })
);

couponRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const coupons = await getCouponsService();
    return successResponse(res, 200, 'Coupons fetched', coupons);
  })
);

couponRouter.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    await deleteCouponService(req.params.id);
    return successResponse(res, 200, 'Coupon deleted');
  })
);

couponRouter.patch(
  '/:id/toggle',
  asyncHandler(async (req, res) => {
    const coupon = await toggleCouponService(req.params.id);
    return successResponse(res, 200, 'Coupon status toggled', coupon);
  })
);

export default couponRouter;
