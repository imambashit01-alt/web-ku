import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { shippingSchema, formatPhoneNumber, formatZipCode } from '../utils/validation';
import { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';

const ShippingStep = ({ onNext, formData, setFormData }) => {
  const [currentSubStep, setCurrentSubStep] = useState(0);
  const [deliveryMethod, setDeliveryMethod] = useState('standard');

  const subSteps = [
    { id: 'personal', title: 'Personal Info', icon: '👤' },
    { id: 'address', title: 'Address', icon: '📍' },
    { id: 'delivery', title: 'Delivery', icon: '🚚' }
  ];

  const deliveryOptions = [
    {
      id: 'standard',
      name: 'Standard Shipping',
      time: '3-5 business days',
      price: 0,
      icon: '📦'
    },
    {
      id: 'express',
      name: 'Express Shipping',
      time: '1-2 business days',
      price: 9.99,
      icon: '⚡'
    },
    {
      id: 'overnight',
      name: 'Overnight',
      time: 'Next business day',
      price: 19.99,
      icon: '🚀'
    }
  ];

  const countries = [
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'AU', name: 'Australia', flag: '🇦🇺' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪' },
    { code: 'FR', name: 'France', flag: '🇫🇷' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵' },
    { code: 'ID', name: 'Indonesia', flag: '🇮🇩' }
  ];

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    trigger
  } = useForm({
    resolver: yupResolver(shippingSchema),
    defaultValues: formData,
    mode: 'onChange'
  });

  const watchedValues = watch();

  // Auto-save to localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('mamz-shipping-data', JSON.stringify(watchedValues));
    }, 1000);

    return () => clearTimeout(timer);
  }, [watchedValues]);

  // Load saved data
  useEffect(() => {
    const saved = localStorage.getItem('mamz-shipping-data');
    if (saved) {
      const parsed = JSON.parse(saved);
      Object.keys(parsed).forEach(key => {
        if (parsed[key]) setValue(key, parsed[key]);
      });
    }
  }, [setValue]);

  const handleNextSubStep = async () => {
    let fieldsToValidate = [];

    switch (currentSubStep) {
      case 0: // Personal Info
        fieldsToValidate = ['fullName', 'email', 'phone'];
        break;
      case 1: // Address
        fieldsToValidate = ['address', 'city', 'zipCode', 'country'];
        break;
      case 2: // Delivery
        onNext({ ...watchedValues, deliveryMethod });
        return;
    }

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setCurrentSubStep(prev => Math.min(prev + 1, subSteps.length - 1));
    }
  };

  const handlePrevSubStep = () => {
    setCurrentSubStep(prev => Math.max(prev - 1, 0));
  };

  const renderPersonalInfo = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Full Name *
          </label>
          <motion.input
            {...register('fullName')}
            type="text"
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
              errors.fullName
                ? 'border-red-300 bg-red-50 dark:bg-red-900/20'
                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-blue-500'
            } text-gray-900 dark:text-white placeholder-gray-500`}
            placeholder="John Doe"
            whileFocus={{ scale: 1.02 }}
          />
          {errors.fullName && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-1"
            >
              {errors.fullName.message}
            </motion.p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Email Address *
          </label>
          <motion.input
            {...register('email')}
            type="email"
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
              errors.email
                ? 'border-red-300 bg-red-50 dark:bg-red-900/20'
                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-blue-500'
            } text-gray-900 dark:text-white placeholder-gray-500`}
            placeholder="john@example.com"
            whileFocus={{ scale: 1.02 }}
          />
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-1"
            >
              {errors.email.message}
            </motion.p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Phone Number *
        </label>
        <InputMask
          mask="(999) 999-9999"
          value={watchedValues.phone || ''}
          onChange={(e) => setValue('phone', e.target.value)}
        >
          {(inputProps) => (
            <motion.input
              {...inputProps}
              {...register('phone')}
              type="tel"
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                errors.phone
                  ? 'border-red-300 bg-red-50 dark:bg-red-900/20'
                  : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-blue-500'
              } text-gray-900 dark:text-white placeholder-gray-500`}
              placeholder="(555) 123-4567"
              whileFocus={{ scale: 1.02 }}
            />
          )}
        </InputMask>
        {errors.phone && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm mt-1"
          >
            {errors.phone.message}
          </motion.p>
        )}
      </div>
    </motion.div>
  );

  const renderAddress = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Street Address *
        </label>
        <motion.input
          {...register('address')}
          type="text"
          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
            errors.address
              ? 'border-red-300 bg-red-50 dark:bg-red-900/20'
              : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-blue-500'
          } text-gray-900 dark:text-white placeholder-gray-500`}
          placeholder="123 Main Street, Apt 4B"
          whileFocus={{ scale: 1.02 }}
        />
        {errors.address && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm mt-1"
          >
            {errors.address.message}
          </motion.p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            City *
          </label>
          <motion.input
            {...register('city')}
            type="text"
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
              errors.city
                ? 'border-red-300 bg-red-50 dark:bg-red-900/20'
                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-blue-500'
            } text-gray-900 dark:text-white placeholder-gray-500`}
            placeholder="New York"
            whileFocus={{ scale: 1.02 }}
          />
          {errors.city && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-1"
            >
              {errors.city.message}
            </motion.p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            ZIP Code *
          </label>
          <InputMask
            mask="99999-9999"
            value={watchedValues.zipCode || ''}
            onChange={(e) => setValue('zipCode', e.target.value)}
          >
            {(inputProps) => (
              <motion.input
                {...inputProps}
                {...register('zipCode')}
                type="text"
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                  errors.zipCode
                    ? 'border-red-300 bg-red-50 dark:bg-red-900/20'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-blue-500'
                } text-gray-900 dark:text-white placeholder-gray-500`}
                placeholder="10001"
                whileFocus={{ scale: 1.02 }}
              />
            )}
          </InputMask>
          {errors.zipCode && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-1"
            >
              {errors.zipCode.message}
            </motion.p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Country *
        </label>
        <motion.select
          {...register('country')}
          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
            errors.country
              ? 'border-red-300 bg-red-50 dark:bg-red-900/20'
              : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-blue-500'
          } text-gray-900 dark:text-white`}
          whileFocus={{ scale: 1.02 }}
        >
          <option value="">Select Country</option>
          {countries.map(country => (
            <option key={country.code} value={country.code}>
              {country.flag} {country.name}
            </option>
          ))}
        </motion.select>
        {errors.country && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm mt-1"
          >
            {errors.country.message}
          </motion.p>
        )}
      </div>
    </motion.div>
  );

  const renderDelivery = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Choose Delivery Method
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Select how you want to receive your order
        </p>
      </div>

      <div className="space-y-4">
        {deliveryOptions.map((option) => (
          <motion.div
            key={option.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setDeliveryMethod(option.id)}
            className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
              deliveryMethod === option.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg'
                : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{option.icon}</div>
                <div>
                  <h4 className={`font-semibold ${
                    deliveryMethod === option.id
                      ? 'text-blue-900 dark:text-blue-100'
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {option.name}
                  </h4>
                  <p className={`text-sm ${
                    deliveryMethod === option.id
                      ? 'text-blue-700 dark:text-blue-200'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {option.time}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className={`font-bold ${
                  deliveryMethod === option.id
                    ? 'text-blue-900 dark:text-blue-100'
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {option.price === 0 ? 'FREE' : `$${option.price}`}
                </div>
              </div>
            </div>

            {deliveryMethod === option.id && (
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
    </motion.div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      {/* Sub-step Progress */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          {subSteps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  index <= currentSubStep
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {index < currentSubStep ? '✓' : step.icon}
              </motion.div>
              {index < subSteps.length - 1 && (
                <div className={`w-12 h-0.5 mx-2 transition-colors duration-300 ${
                  index < currentSubStep ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Sub-step Content */}
      <motion.div
        key={currentSubStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700"
      >
        <div className="text-center mb-6">
          <div className="text-3xl mb-2">{subSteps[currentSubStep].icon}</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {subSteps[currentSubStep].title}
          </h2>
        </div>

        {currentSubStep === 0 && renderPersonalInfo()}
        {currentSubStep === 1 && renderAddress()}
        {currentSubStep === 2 && renderDelivery()}
      </motion.div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrevSubStep}
          disabled={currentSubStep === 0}
          className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
            currentSubStep === 0
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white shadow-lg'
          }`}
        >
          ← Back
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNextSubStep}
          className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
            isValid || currentSubStep === 2
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg'
              : 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
          }`}
        >
          {currentSubStep === subSteps.length - 1 ? 'Continue to Payment' : 'Next →'}
        </motion.button>
      </div>
    </div>
  );
};

export default ShippingStep;
