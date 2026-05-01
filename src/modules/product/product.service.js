import Product from '../../DB/models/product.model.js';

export const createProductService = async (data) => {
  return await Product.create(data);
};

export const updateProductService = async (productId, data) => {
  return await Product.findByIdAndUpdate(productId, data, { new: true });
};

export const deleteProductService = async (productId) => {
  return await Product.findByIdAndDelete(productId);
};

export const getProductsService = async (query) => {
  const { page = 1, limit = 10, search, category, minPrice, maxPrice } = query;
  const skip = (page - 1) * limit;

  const filter = {};
  if (search) filter.name = { $regex: search, $options: 'i' };
  if (category) filter.category = category;
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  const products = await Product.find(filter)
    .populate('category', 'name')
    .skip(skip)
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  const total = await Product.countDocuments(filter);

  return { products, total, page: Number(page), limit: Number(limit) };
};

export const getProductByIdService = async (productId) => {
  return await Product.findById(productId).populate('category', 'name');
};
