import Order from '../../DB/models/order.model.js';

export const createOrderService = async (data) => {
  // Simple stock check/update could go here in a real app
  return await Order.create(data); 
};

export const getOrdersService = async () => {
  return await Order.find().populate('products.product', 'name price images');
};

export const updateOrderStatusService = async (orderId, status) => {
  return await Order.findByIdAndUpdate(orderId, { status }, { new: true });
};

export const getOrderStatsService = async () => {
  const totalOrders = await Order.countDocuments();
  const revenue = await Order.aggregate([
    { $match: { status: { $ne: 'cancelled' } } },
    { $group: { _id: null, total: { $sum: '$totalPrice' } } }
  ]);
  
  return {
    totalOrders,
    totalRevenue: revenue[0]?.total || 0
  };
};
