import Joi from 'joi';

export const createCategorySchema = {
  body: Joi.object({
    name: Joi.string().min(2).max(60).required(),
    description: Joi.string().max(300),
  }),
};
