import User from '../../DB/models/user.model.js';
import { hashPassword, comparePassword } from '../../common/utils/security/hash.security.js';
import { generateToken } from '../../common/utils/security/token.service.js';
import { config } from '../../../config/config.service.js';
import { roles } from '../../common/enum/role.enum.js';

export const registerService = async (name, email, password, role, adminKey) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email is already registered');
  }

  // If trying to sign up as admin, verify the secret key
  if (role === roles.ADMIN) {
    if (adminKey !== config.ADMIN_SIGNUP_KEY) {
      throw new Error('Invalid admin secret key');
    }
  }

  const hashedPassword = await hashPassword(password);
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  return newUser;
};

export const loginService = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password', { cause: 401 });
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password', { cause: 401 });
  }

  const token = generateToken({ id: user._id, role: user.role });
  return { user, token };
};
