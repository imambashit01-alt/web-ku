import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import toast from 'react-hot-toast';

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { cart } = useCart();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      toast.error('Order ID not found');
      navigate('/');
      return;
    }

    // Try to load order data from localStorage
    const savedOrder = localStorage.getItem(`mamz-order-${orderId}`);
    if (savedOrder) {
      const parsedOrder = JSON.parse(savedOrder);
      setOrderData(parsedOrder);
      setLoading(false);
    } else {
      // If not found in localStorage, try to reconstruct from current cart (for demo purposes)
      // In a real app, this would come from a backend API
      if (cart.length > 0) {
        const reconstructedOrder = {
          id: orderId,
          date: new Date().toISOString(),
          status: 'Sedang diproses',
          paymentMethod: 'Kartu',
          total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
          items: cart,
          shipping: {
            name: 'John Doe',
            address: 'Jl. Sudirman No. 123',
            city: 'Jakarta',
            postalCode: '12345',
            phone: '+62 812-3456-7890'
          }
        };
        setOrderData(reconstructedOrder);
      } else {
        toast.error('Order data not found');
        navigate('/');
      }
      setLoading(false);
    }
  }, [orderId, cart, navigate]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'sedang diproses':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'dikirim':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'selesai':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Order Not Found
          </h1>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Detail Pesanan
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Order ID: <span className="font-mono font-semibold">{orderId}</span>
            </p>
          </div>

          {/* Order Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Status Pesanan
                </h2>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(orderData.status)}`}>
                    {orderData.status}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(orderData.date).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  ${orderData.total?.toFixed(2)}
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Order Items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Produk yang Dipesan
                </h3>
                <div className="space-y-4">
                  {orderData.items?.map((item, index) => (
                    <motion.div
                      key={item.id || index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                      className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Size: {item.size || 'N/A'} | Color: {item.color || 'N/A'}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          ${item.price} each
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                      <span className="text-gray-900 dark:text-white">
                        ${(orderData.total * 0.9).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                      <span className="text-gray-900 dark:text-white">
                        ${(orderData.total * 0.1).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-200 dark:border-gray-600">
                      <span className="text-gray-900 dark:text-white">Total</span>
                      <span className="text-green-600 dark:text-green-400">
                        ${orderData.total?.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Order Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              {/* Payment Info */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Informasi Pembayaran
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Metode Pembayaran</span>
                    <span className="font-medium text-gray-900 dark:text-white capitalize">
                      {orderData.paymentMethod}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Status</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(orderData.status)}`}>
                      {orderData.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Alamat Pengiriman
                </h3>
                <div className="space-y-2 text-sm">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {orderData.shipping?.name || 'John Doe'}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {orderData.shipping?.address || 'Jl. Sudirman No. 123'}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {orderData.shipping?.city || 'Jakarta'}, {orderData.shipping?.postalCode || '12345'}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {orderData.shipping?.phone || '+62 812-3456-7890'}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Actions
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={() => navigate('/support')}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Hubungi Support
                  </button>
                  <button
                    onClick={() => navigate('/track')}
                    className="w-full bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Track Order
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Continue Shopping Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-8"
          >
            <button
              onClick={handleContinueShopping}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Lanjut Belanja
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderDetails;
