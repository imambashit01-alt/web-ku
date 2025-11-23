import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const LoginModal = ({ isOpen, onClose }) => {
  const { user, loginWithEmail, registerWithEmail, loginWithGoogle, resetPassword, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('signin'); // 'signin', 'signup', 'reset'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setMessage('');
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await loginWithEmail(formData.email, formData.password);
    setLoading(false);

    if (result.success) {
      setMessage('✓ Successfully signed in!');
      setTimeout(() => {
        onClose();
        setFormData({ email: '', password: '', confirmPassword: '' });
        setMessage('');
      }, 1500);
    } else {
      setError(result.error);
    }
  };

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    const result = await registerWithEmail(formData.email, formData.password);
    setLoading(false);

    if (result.success) {
      setMessage('✓ Account created successfully! You can now sign in.');
      setTimeout(() => {
        setMode('signin');
        setFormData({ email: '', password: '', confirmPassword: '' });
        setMessage('');
      }, 2000);
    } else {
      setError(result.error);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');

    const result = await loginWithGoogle();
    setLoading(false);

    if (result.success) {
      setMessage('✓ Successfully signed in with Google!');
      setTimeout(() => {
        onClose();
        setMessage('');
      }, 1500);
    } else {
      setError(result.error);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    const result = await resetPassword(formData.email);
    setLoading(false);

    if (result.success) {
      setMessage('✓ Password reset email sent! Check your inbox.');
      setTimeout(() => {
        setMode('signin');
        setFormData({ email: '', password: '', confirmPassword: '' });
        setMessage('');
      }, 3000);
    } else {
      setError(result.error);
    }
  };

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      onClose();
      setMessage('✓ Logged out successfully');
      setTimeout(() => setMessage(''), 2000);
    } else {
      setError(result.error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="modal-overlay"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-mamz-black dark:text-mamz-white">
                {user ? 'My Profile' : 'Login to MAMZ'}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-500 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>

            {user ? (
              // User Profile View
              <div className="user-profile">
                <div className="flex items-center space-x-4 mb-4">
                  {user.photoURL && (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-16 h-16 rounded-full"
                    />
                  )}
                  <div>
                    <h3 className="text-xl font-bold">{user.displayName || user.email}</h3>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="font-medium">Name:</span>
                    <strong>{user.displayName || 'N/A'}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Email:</span>
                    <strong>{user.email}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Email Verified:</span>
                    <strong>{user.emailVerified ? 'Yes' : 'No'}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Provider:</span>
                    <strong>{user.providerData[0]?.providerId || 'Email'}</strong>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              // Login/Register Forms
              <div className="space-y-6">
                {/* Google Sign In */}
                <button
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <img
                    src="https://developers.google.com/identity/images/g-logo.png"
                    alt="Google"
                    className="w-5 h-5 mr-3"
                  />
                  {loading ? 'Signing in...' : 'Continue with Google'}
                </button>

                {/* Divider */}
                <div className="flex items-center">
                  <div className="flex-1 border-t border-gray-300"></div>
                  <span className="px-3 text-gray-500 text-sm">OR</span>
                  <div className="flex-1 border-t border-gray-300"></div>
                </div>

                {/* Mode Tabs */}
                <div className="flex border-b border-gray-200">
                  <button
                    onClick={() => setMode('signin')}
                    className={`flex-1 py-2 px-4 text-center font-medium ${
                      mode === 'signin'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setMode('signup')}
                    className={`flex-1 py-2 px-4 text-center font-medium ${
                      mode === 'signup'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Sign Up
                  </button>
                </div>

                {/* Error/Message Display */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}
                {message && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                    {message}
                  </div>
                )}

                {/* Sign In Form */}
                {mode === 'signin' && (
                  <form onSubmit={handleEmailSignIn} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your password"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode('reset')}
                      className="w-full text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Forgot password?
                    </button>
                  </form>
                )}

                {/* Sign Up Form */}
                {mode === 'signup' && (
                  <form onSubmit={handleEmailSignUp} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        minLength={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Create a password"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Confirm your password"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                  </form>
                )}

                {/* Reset Password Form */}
                {mode === 'reset' && (
                  <form onSubmit={handleResetPassword} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your email"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      {loading ? 'Sending...' : 'Send Reset Email'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode('signin')}
                      className="w-full text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Back to Sign In
                    </button>
                  </form>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
