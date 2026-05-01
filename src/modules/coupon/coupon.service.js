import Coupon from '../../DB/models/coupon.model.js';

export const createCouponService = async (data) => {
  return await Coupon.create(data);
};

export const getCouponsService = async () => {
  return await Coupon.find().sort({ createdAt: -1 });
};

export const deleteCouponService = async (id) => {
  return await Coupon.findByIdAndDelete(id);
};

export const toggleCouponService = async (id) => {
  const coupon = await Coupon.findById(id);
  if (!coupon) throw new Error('Coupon not found', { cause: 404 });
  coupon.isActive = !coupon.isActive;
  await coupon.save();
  return coupon;
};
