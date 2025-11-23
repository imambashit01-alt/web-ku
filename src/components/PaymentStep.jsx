import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { paymentSchema, formatCardNumber, formatExpiry, getCardType } from '../utils/validation';
import { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import CardPreview from './CardPreview';
import PaymentPopup from './payments/PaymentPopup';
import toast from 'react-hot-toast';

const PaymentStep = ({ onNext, formData, setFormData }) => {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [cardPreviewData, setCardPreviewData] = useState({});
  const [paymentStatus, setPaymentStatus] = useState(null); // 'success', 'error', or null
  const [paymentMessage, setPaymentMessage] = useState('');
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: '💳',
      description: 'Visa, Mastercard, American Express',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'gopay',
      name: 'GoPay',
      icon: '🟢',
      description: 'Indonesian e-wallet',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'ovo',
      name: 'OVO',
      icon: '🟣',
      description: 'Indonesian digital wallet',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'dana',
      name: 'DANA',
      icon: '🟡',
      description: 'Indonesian payment app',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      icon: '💵',
      description: 'Pay when you receive',
      color: 'from-gray-500 to-gray-600'
    }
  ];

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    trigger
  } = useForm({
    resolver: yupResolver(paymentSchema),
    defaultValues: formData,
    mode: 'onChange'
  });

  const watchedValues = watch();

  // Update card preview data
  useEffect(() => {
    setCardPreviewData({
      cardNumber: watchedValues.cardNumber,
      cardholderName: watchedValues.cardholderName,
      expiryDate: watchedValues.expiryDate,
      cvv: watchedValues.cvv
    });
  }, [watchedValues]);

  // Auto-save to localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('mamz-payment-data', JSON.stringify({ ...watchedValues, selectedMethod }));
    }, 1000);

    return () => clearTimeout(timer);
  }, [watchedValues, selectedMethod]);

  // Load saved data
  useEffect(() => {
    const saved = localStorage.getItem('mamz-payment-data');
    if (saved) {
      const parsed = JSON.parse(saved);
      Object.keys(parsed).forEach(key => {
        if (key !== 'selectedMethod' && parsed[key]) setValue(key, parsed[key]);
      });
      if (parsed.selectedMethod) setSelectedMethod(parsed.selectedMethod);
    }
  }, [setValue]);

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setValue('cardNumber', formatted);
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiry(e.target.value);
    setValue('expiryDate', formatted);
  };

  const handleCvvFocus = () => {
    setIsCardFlipped(true);
  };

  const handleCvvBlur = () => {
    setIsCardFlipped(false);
  };

  const handlePaymentSuccess = (paymentResult) => {
    setPaymentStatus('success');
    setPaymentMessage('Payment completed successfully!');
    toast.success('Payment completed successfully!');
    setIsProcessing(false);

    // Auto proceed to next step after success
    setTimeout(() => {
      onNext({ ...formData, paymentResult, paymentMethod: selectedMethod });
    }, 2000);
  };

  const handlePaymentError = (errorMessage) => {
    setPaymentStatus('error');
    setPaymentMessage(errorMessage || 'Payment failed. Please try again.');
    toast.error(errorMessage || 'Payment failed. Please try again.');
    setIsProcessing(false);
  };

  const onSubmit = (data) => {
    if (selectedMethod === 'card') {
      // For card payments, open the payment popup
      setShowPaymentPopup(true);
      setIsProcessing(true);
    } else {
      // For other payment methods, simulate success
      setIsProcessing(true);
      setTimeout(() => {
        handlePaymentSuccess({
          id: `payment_${Date.now()}`,
          status: 'succeeded',
          amount: formData?.total || 0,
          paymentMethod: selectedMethod,
        });
      }, 2000);
    }
  };

  const renderCardForm = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Card Preview */}
      <CardPreview cardData={cardPreviewData} isFlipped={isCardFlipped} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card Number */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Card Number *
          </label>
          <InputMask
            mask="9999 9999 9999 9999"
            value={watchedValues.cardNumber || ''}
            onChange={handleCardNumberChange}
          >
            {(inputProps) => (
              <motion.input
                {...inputProps}
                {...register('cardNumber')}
                type="text"
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                  errors.cardNumber
                    ? 'border-red-300 bg-red-50 dark:bg-red-900/20'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-blue-500'
                } text-gray-900 dark:text-white placeholder-gray-500 font-mono`}
                placeholder="1234 5678 9012 3456"
                whileFocus={{ scale: 1.02 }}
              />
            )}
          </InputMask>
          {errors.cardNumber && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-1"
            >
              {errors.cardNumber.message}
            </motion.p>
          )}
          {watchedValues.cardNumber && (
            <div className="flex items-center mt-2">
              <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">
                Card Type:
              </span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {getCardType(watchedValues.cardNumber).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Expiry Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Expiry Date *
          </label>
          <InputMask
            mask="99/99"
            value={watchedValues.expiryDate || ''}
            onChange={handleExpiryChange}
          >
            {(inputProps) => (
              <motion.input
                {...inputProps}
                {...register('expiryDate')}
                type="text"
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                  errors.expiryDate
                    ? 'border-red-300 bg-red-50 dark:bg-red-900/20'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-blue-500'
                } text-gray-900 dark:text-white placeholder-gray-500 font-mono`}
                placeholder="MM/YY"
                whileFocus={{ scale: 1.02 }}
              />
            )}
          </InputMask>
          {errors.expiryDate && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-1"
            >
              {errors.expiryDate.message}
            </motion.p>
          )}
        </div>

        {/* CVV */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            CVV *
          </label>
          <motion.input
            {...register('cvv')}
            type="password"
            maxLength="4"
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
              errors.cvv
                ? 'border-red-300 bg-red-50 dark:bg-red-900/20'
                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-blue-500'
            } text-gray-900 dark:text-white placeholder-gray-500 font-mono`}
            placeholder="123"
            onFocus={handleCvvFocus}
            onBlur={handleCvvBlur}
            whileFocus={{ scale: 1.02 }}
          />
          {errors.cvv && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-1"
            >
              {errors.cvv.message}
            </motion.p>
          )}
        </div>

        {/* Cardholder Name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Cardholder Name *
          </label>
          <motion.input
            {...register('cardholderName')}
            type="text"
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
              errors.cardholderName
                ? 'border-red-300 bg-red-50 dark:bg-red-900/20'
                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-blue-500'
            } text-gray-900 dark:text-white placeholder-gray-500`}
            placeholder="John Doe"
            whileFocus={{ scale: 1.02 }}
          />
          {errors.cardholderName && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-1"
            >
              {errors.cardholderName.message}
            </motion.p>
          )}
        </div>
      </div>

      {/* Security Notice */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4"
      >
        <div className="flex items-center space-x-3">
          <div className="text-green-600 dark:text-green-400 text-xl">🔒</div>
          <div>
            <h4 className="font-semibold text-green-800 dark:text-green-200">
              Secure Payment
            </h4>
            <p className="text-sm text-green-700 dark:text-green-300">
              Your payment information is encrypted and secure. We never store your full card details.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  const renderEWalletForm = (method) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12"
    >
      <div className="text-6xl mb-4">{method.icon}</div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        Pay with {method.name}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        {method.description}
      </p>
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          You'll be redirected to {method.name} to complete your payment securely.
        </p>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onSubmit({ paymentMethod: selectedMethod })}
        disabled={isProcessing}
        className={`px-8 py-3 bg-gradient-to-r ${method.color} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {isProcessing ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Processing...</span>
          </div>
        ) : (
          `Continue with ${method.name}`
        )}
      </motion.button>
    </motion.div>
  );

  const renderCODForm = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12"
    >
      <div className="text-6xl mb-4">💵</div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        Cash on Delivery
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Pay when your order arrives at your doorstep
      </p>
      <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4 mb-6">
        <p className="text-sm text-orange-800 dark:text-orange-200">
          Additional fee of $2.99 applies. Available for orders under $100.
        </p>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onSubmit({ paymentMethod: selectedMethod })}
        disabled={isProcessing}
        className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Processing...</span>
          </div>
        ) : (
          'Confirm Cash on Delivery'
        )}
      </motion.button>
    </motion.div>
  );

  // Payment Status Display
  const renderPaymentStatus = () => {
    if (!paymentStatus) return null;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm`}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`max-w-md w-full p-8 rounded-2xl shadow-2xl ${
            paymentStatus === 'success'
              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
              : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
          }`}
        >
          <div className="text-center">
            <div className={`text-6xl mb-4 ${
              paymentStatus === 'success' ? 'text-green-500' : 'text-red-500'
            }`}>
              {paymentStatus === 'success' ? '✅' : '❌'}
            </div>
            <h3 className={`text-xl font-bold mb-2 ${
              paymentStatus === 'success'
                ? 'text-green-800 dark:text-green-200'
                : 'text-red-800 dark:text-red-200'
            }`}>
              {paymentStatus === 'success' ? 'Payment Successful!' : 'Payment Failed'}
            </h3>
            <p className={`text-sm ${
              paymentStatus === 'success'
                ? 'text-green-700 dark:text-green-300'
                : 'text-red-700 dark:text-red-300'
            }`}>
              {paymentMessage}
            </p>
            {paymentStatus === 'success' && (
              <div className="mt-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500 mx-auto"></div>
                <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                  Redirecting to order confirmation...
                </p>
              </div>
            )}
            {paymentStatus === 'error' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setPaymentStatus(null);
                  setPaymentMessage('');
                  setIsProcessing(false);
                }}
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </motion.button>
            )}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <>
      <div className="max-w-4xl mx-auto">
        {/* Payment Methods Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Choose Payment Method
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {paymentMethods.map((method) => (
              <motion.div
                key={method.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedMethod(method.id)}
                className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                  selectedMethod === method.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg'
                    : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">{method.icon}</div>
                  <h3 className={`font-semibold mb-1 ${
                    selectedMethod === method.id
                      ? 'text-blue-900 dark:text-blue-100'
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {method.name}
                  </h3>
                  <p className={`text-sm ${
                    selectedMethod === method.id
                      ? 'text-blue-700 dark:text-blue-200'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {method.description}
                  </p>
                </div>

                {selectedMethod === method.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                  >
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Payment Form */}
        <motion.div
          key={selectedMethod}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700"
        >
          {selectedMethod === 'card' && renderCardForm()}
          {['gopay', 'ovo', 'dana'].includes(selectedMethod) &&
            renderEWalletForm(paymentMethods.find(m => m.id === selectedMethod))}
          {selectedMethod === 'cod' && renderCODForm()}
        </motion.div>

        {/* Navigation */}
        {selectedMethod === 'card' && (
          <div className="flex justify-center mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit(onSubmit)}
              disabled={!isValid || isProcessing}
              className={`px-12 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                isValid && !isProcessing
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isProcessing ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing Payment...</span>
                </div>
              ) : (
                'Pay Now'
              )}
            </motion.button>
          </div>
        )}
      </div>

      {/* Payment Status Modal */}
      {renderPaymentStatus()}

      {/* Payment Popup for Card Payments */}
      <PaymentPopup
        isOpen={showPaymentPopup}
        onClose={() => {
          setShowPaymentPopup(false);
          setIsProcessing(false);
        }}
        amount={formData?.total || 0}
        onPaymentSuccess={handlePaymentSuccess}
        onPaymentError={handlePaymentError}
      />
    </>
  );
};

export default PaymentStep;
