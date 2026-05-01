import User from '../../DB/models/user.model.js';

export const getProfileService = async (userId) => {
  return await User.findById(userId).select('-password');
};

export const updateProfileService = async (userId, updateData) => {
  return await User.findByIdAndUpdate(userId, updateData, { new: true }).select('-password');
};

export const getAllUsersService = async () => {
  return await User.find().select('-password');
};
