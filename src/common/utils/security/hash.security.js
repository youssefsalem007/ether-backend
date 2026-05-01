import bcrypt from 'bcrypt';
import { config } from '../../../../config/config.service.js';

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, config.SALT_ROUNDS);
};

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
