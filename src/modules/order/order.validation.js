import Joi from 'joi';
import mongoose from 'mongoose';

const objectId = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error('any.invalid');
  }
  return value;
}, 'ObjectId validation');

export const createOrderSchema = {
  body: Joi.object({
    fullName: Joi.string().min(3).max(80).required(),
    phone: Joi.string().required(),
    instagramUsername: Joi.string().required(),
    address: Joi.string().required(),
    products: Joi.array().items(Joi.object({
      product: objectId.required(),
      quantity: Joi.number().min(1).required()
    })).min(1).required(),
    totalPrice: Joi.number().min(0).required()
  })
};

export const updateOrderStatusSchema = {
  params: Joi.object({ id: objectId.required() }),
  body: Joi.object({
    status: Joi.string().valid('pending', 'confirmed', 'shipped', 'delivered', 'cancelled').required(),
  }),
};
