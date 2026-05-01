import mongoose from 'mongoose';
import { roles } from '../../common/enum/role.enum.js';
import { authProviders } from '../../common/enum/auth.enum.js';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(roles), default: roles.USER },
    provider: { type: String, enum: Object.values(authProviders), default: authProviders.SYSTEM },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
