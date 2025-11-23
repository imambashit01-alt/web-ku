import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Package, Truck, CheckCircle, Clock } from 'lucide-react';

const TrackOrderModal = ({ isOpen, onClose }) => {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [trackingResult, setTrackingResult] = useState(null);

  // Mock tracking data - in real app this would come from API
  const mockTrackingData = {
    orderNumber: 'MAMZ-123456',
    status: 'in_transit',
    estimatedDelivery: 'December 15, 2024',
    trackingSteps: [
      {
        status: 'ordered',
        title: 'Order Placed',
        description: 'Your order has been received',
        date: 'Dec 10, 2024',
        time: '2:30 PM',
        completed: true
      },
      {
        status: 'processing',
        title: 'Processing',
        description: 'Your order is being prepared',
        date: 'Dec 11, 2024',
        time: '9:15 AM',
        completed: true
      },
      {
        status: 'shipped',
        title: 'Shipped',
        description: 'Your order has been shipped',
        date: 'Dec 12, 2024',
        time: '11:45 AM',
        completed: true
      },
      {
        status: 'in_transit',
        title: 'In Transit',
        description: 'Your package is on the way',
        date: 'Dec 13, 2024',
        time: '8:20 AM',
        completed: true
      },
      {
        status: 'delivered',
        title: 'Delivered',
        description: 'Package delivered successfully',
        date: null,
        time: null,
        completed: false
      }
    ]
  };

  const handleTrackOrder = async (e) => {
    e.preventDefault();
    setIsTracking(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsTracking(false);
    setTrackingResult(mockTrackingData);
  };

  const getStatusIcon = (status, completed) => {
    if (!completed) return <Clock className="text-gray-400" size={20} />;

    switch (status) {
      case 'ordered':
        return <Package className="text-blue-500" size={20} />;
      case 'processing':
        return <Clock className="text-orange-500" size={20} />;
      case 'shipped':
        return <Truck className="text-purple-500" size={20} />;
      case 'in_transit':
        return <Truck className="text-green-500" size={20} />;
      case 'delivered':
        return <CheckCircle className="text-green-500" size={20} />;
      default:
        return <Package className="text-gray-500" size={20} />;
    }
  };

  const getStatusColor = (status, completed) => {
    if (!completed) return 'text-gray-400';

    switch (status) {
      case 'ordered':
        return 'text-blue-600';
      case 'processing':
        return 'text-orange-600';
      case 'shipped':
        return 'text-purple-600';
      case 'in_transit':
        return 'text-green-600';
      case 'delivered':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <Package className="text-red-500" size={24} />
                  <h2 className="text-2xl font-bold text-gray-900">Track Your Order</h2>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {!trackingResult ? (
                <form onSubmit={handleTrackOrder} className="space-y-4">
                  <div>
                    <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Order Number *
                    </label>
                    <input
                      type="text"
                      id="orderNumber"
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      placeholder="e.g. MAMZ-123456"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isTracking}
                    className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-md transition-colors flex items-center justify-center gap-2"
                  >
                    {isTracking ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Tracking...
                      </>
                    ) : (
                      <>
                        <Search size={18} />
                        Track Order
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="space-y-6">
                  {/* Order Summary */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-900">Order #{trackingResult.orderNumber}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        trackingResult.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        trackingResult.status === 'in_transit' ? 'bg-blue-100 text-blue-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {trackingResult.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Estimated Delivery: {trackingResult.estimatedDelivery}
                    </p>
                  </div>

                  {/* Tracking Timeline */}
                  <div className="space-y-4">
                    {trackingResult.trackingSteps.map((step, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0 mt-1">
                          {getStatusIcon(step.status, step.completed)}
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className={`font-medium ${getStatusColor(step.status, step.completed)}`}>
                              {step.title}
                            </h4>
                            {step.completed && <CheckCircle className="text-green-500" size={14} />}
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{step.description}</p>
                          {step.date && (
                            <p className="text-xs text-gray-500">
                              {step.date} at {step.time}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => setTrackingResult(null)}
                      className="flex-1 border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-md transition-colors"
                    >
                      Track Another Order
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        // Could navigate to contact support
                      }}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-colors"
                    >
                      Need Help?
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TrackOrderModal;
