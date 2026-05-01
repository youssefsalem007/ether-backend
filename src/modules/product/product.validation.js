import Joi from 'joi';
import mongoose from 'mongoose';

const objectId = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error('any.invalid');
  }
  return value;
}, 'ObjectId validation');

export const createProductSchema = {
  body: Joi.object({
    name: Joi.string().min(2).max(100).required(),
    description: Joi.string().min(10).required(),
    price: Joi.number().min(0).required(),
    category: objectId.required(),
    stock: Joi.number().min(0).default(0),
    discount: Joi.number().min(0).max(100).default(0),
  }),
};

export const updateProductSchema = {
  params: Joi.object({ id: objectId.required() }),
  body: Joi.object({
    name: Joi.string().min(2).max(100),
    description: Joi.string().min(10),
    price: Joi.number().min(0),
    category: objectId,
    stock: Joi.number().min(0),
    discount: Joi.number().min(0).max(100),
  }).min(1),
};

export const productIdSchema = {
  params: Joi.object({ id: objectId.required() }),
};
