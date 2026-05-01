import Joi from 'joi';

export const updateProfileSchema = {
  body: Joi.object({
    name: Joi.string().min(3).max(50),
    email: Joi.string().email(),
  }).min(1),
};
