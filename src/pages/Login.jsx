import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaGoogle, FaGithub, FaPhone } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import {
  pageVariants,
  pageTransition,
  containerVariants,
  itemVariants,
  inputVariants,
  buttonVariants,
  socialButtonVariants,
  loadingSpinnerVariants,
  floatingLabelVariants
} from '../utils/animations';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loginWithEmail, loginWithGoogle, loginWithGitHub, loginWithPhone, verifyPhoneCode } = useAuth();

  const [mode, setMode] = useState('email'); // 'email', 'phone'
  const [phoneStep, setPhoneStep] = useState('number'); // 'number', 'code'
  const [confirmationResult, setConfirmationResult] = useState(null);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: '',
    code: '',
    rememberMe: false
  });

  const [loading, setLoading] = useState({
    email: false,
    google: false,
    github: false,
    phone: false
  });

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(prev => ({ ...prev, email: true }));

    const result = await loginWithEmail(formData.email, formData.password, formData.rememberMe);
    setLoading(prev => ({ ...prev, email: false }));

    if (result.success) {
      setTimeout(() => {
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      }, 1000);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(prev => ({ ...prev, google: true }));

    const result = await loginWithGoogle();
    setLoading(prev => ({ ...prev, google: false }));

    if (result.success) {
      setTimeout(() => {
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      }, 1000);
    }
  };

  const handleGitHubLogin = async () => {
    setLoading(prev => ({ ...prev, github: true }));

    const result = await loginWithGitHub();
    setLoading(prev => ({ ...prev, github: false }));

    if (result.success) {
      setTimeout(() => {
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      }, 1000);
    }
  };

  const handlePhoneLogin = async (e) => {
    e.preventDefault();
    setLoading(prev => ({ ...prev, phone: true }));

    const result = await loginWithPhone(formData.phone);
    setLoading(prev => ({ ...prev, phone: false }));

    if (result.success) {
      setConfirmationResult(result.confirmationResult);
      setPhoneStep('code');
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoading(prev => ({ ...prev, phone: true }));

    const result = await verifyPhoneCode(confirmationResult, formData.code);
    setLoading(prev => ({ ...prev, phone: false }));

    if (result.success) {
      setTimeout(() => {
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      }, 1000);
    }
  };

  const resetPhoneLogin = () => {
    setPhoneStep('number');
    setConfirmationResult(null);
    setFormData({ ...formData, phone: '', code: '' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="max-w-md w-full space-y-8"
      >
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={itemVariants}>
            <motion.h2
              variants={itemVariants}
              className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white"
            >
              Sign in to your account
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400"
            >
              Or{' '}
              <Link
                to="/register"
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 transition-colors"
              >
                create a new account
              </Link>
            </motion.p>
          </motion.div>

          {/* Mode Toggle */}
          <motion.div
            variants={itemVariants}
            className="flex rounded-lg bg-gray-100 dark:bg-gray-800 p-1"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setMode('email')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
                mode === 'email'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Email
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setMode('phone')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
                mode === 'phone'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Phone
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Email Login Form */}
        {mode === 'email' && (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-8 space-y-6"
            onSubmit={handleEmailLogin}
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-all duration-200"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-all duration-200"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded transition-colors"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 transition-colors"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading.email}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {loading.email ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  'Sign in'
                )}
              </motion.button>
            </div>
          </motion.form>
        )}

        {/* Phone Login Form */}
        {mode === 'phone' && (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-8 space-y-6"
            onSubmit={phoneStep === 'number' ? handlePhoneLogin : handleVerifyCode}
          >
            {phoneStep === 'number' ? (
              <div>
                <label htmlFor="phone" className="sr-only">
                  Phone number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-all duration-200"
                  placeholder="+1 (555) 123-4567"
                />
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Enter your phone number with country code
                </p>
              </div>
            ) : (
              <div>
                <label htmlFor="code" className="sr-only">
                  Verification code
                </label>
                <input
                  id="code"
                  name="code"
                  type="text"
                  autoComplete="one-time-code"
                  required
                  value={formData.code}
                  onChange={handleInputChange}
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-all duration-200"
                  placeholder="Enter 6-digit code"
                  maxLength="6"
                />
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Enter the 6-digit code sent to your phone
                </p>
                <button
                  type="button"
                  onClick={resetPhoneLogin}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 transition-colors"
                >
                  Change phone number
                </button>
              </div>
            )}

            <div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading.phone}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {loading.phone ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : phoneStep === 'number' ? (
                  'Send verification code'
                ) : (
                  'Verify code'
                )}
              </motion.button>
            </div>
          </motion.form>
        )}

        {/* Social Login Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-6"
        >
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGoogleLogin}
              disabled={loading.google}
              className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading.google ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500 mr-2"></div>
              ) : (
                <FaGoogle className="text-red-500 mr-2" />
              )}
              <span>Google</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGitHubLogin}
              disabled={loading.github}
              className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading.github ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500 mr-2"></div>
              ) : (
                <FaGithub className="text-gray-900 dark:text-gray-100 mr-2" />
              )}
              <span>GitHub</span>
            </motion.button>
          </div>
        </motion.div>

        {/* reCAPTCHA container for phone auth */}
        <div id="recaptcha-container"></div>
      </motion.div>
    </div>
  );
};

export default Login;
